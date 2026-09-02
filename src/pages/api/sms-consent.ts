import type { APIRoute } from "astro";
import { createHash, randomUUID } from "node:crypto";
import {
  PRIVACY_POLICY_VERSION,
  SMS_BRAND,
  SMS_CONSENT_TEXT,
  SMS_CONSENT_TEXT_SHA256,
  SMS_CONSENT_TEXT_VERSION,
  SMS_LEGAL_ENTITY,
  SMS_TERMS_VERSION,
  normalizeUsPhone,
} from "../../lib/smsProgram";
import {
  ConsentStorageUnavailableError,
  persistSmsConsent,
  type SmsConsentEvidence,
} from "../../lib/smsConsentStore";

export const prerender = false;

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimits = new Map<string, number[]>();

const json = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });

const getClientIp = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    forwarded ||
    request.headers.get("x-real-ip")?.trim() ||
    null
  );
};

const getPublicOrigin = (request: Request) => {
  const requestUrl = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const protocol = forwardedProto === "https" || forwardedProto === "http"
    ? `${forwardedProto}:`
    : requestUrl.protocol;
  const host = forwardedHost || request.headers.get("host")?.trim() || requestUrl.host;

  return new URL(`${protocol}//${host}`).origin;
};

const isRateLimited = (ipAddress: string | null) => {
  const key = createHash("sha256").update(ipAddress ?? "unknown").digest("hex");
  const now = Date.now();
  const recent = (rateLimits.get(key) ?? []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimits.set(key, recent);
    return true;
  }

  recent.push(now);
  rateLimits.set(key, recent);
  return false;
};

const getSourceUrl = (request: Request) => {
  const publicOrigin = getPublicOrigin(request);
  const fallback = new URL("/sms", publicOrigin);
  const referer = request.headers.get("referer");

  if (!referer) return fallback.toString();

  try {
    const parsed = new URL(referer);
    if (parsed.origin !== publicOrigin || !["/sms", "/en/sms"].includes(parsed.pathname)) {
      return fallback.toString();
    }

    parsed.search = "";
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return fallback.toString();
  }
};

const hasValidOrigin = (request: Request) => {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";

  try {
    return new URL(origin).origin === getPublicOrigin(request);
  } catch {
    return false;
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!hasValidOrigin(request)) {
    return json({ ok: false, error: "invalid_origin" }, 403);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 16_384) {
    return json({ ok: false, error: "payload_too_large" }, 413);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_request" }, 400);
  }

  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return json({ ok: true }, 200);
  }

  const startedAt = typeof payload.formStartedAt === "number" ? payload.formStartedAt : 0;
  const elapsed = Date.now() - startedAt;
  if (elapsed < 1_500 || elapsed > 2 * 60 * 60 * 1000) {
    return json({ ok: false, error: "invalid_form_session" }, 422);
  }

  if (payload.consent !== true || payload.consentTextVersion !== SMS_CONSENT_TEXT_VERSION) {
    return json({ ok: false, error: "explicit_consent_required" }, 422);
  }

  const phoneNumber = typeof payload.phone === "string" ? normalizeUsPhone(payload.phone) : null;
  if (!phoneNumber) {
    return json({ ok: false, error: "invalid_phone" }, 422);
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  if (name.length > 100) {
    return json({ ok: false, error: "invalid_name" }, 422);
  }

  const ipAddress = getClientIp(request);
  if (isRateLimited(ipAddress)) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const evidence: SmsConsentEvidence = {
    recordVersion: 1,
    id: randomUUID(),
    phoneNumber,
    name: name || null,
    consentStatus: "opted_in",
    consentTimestampUtc: new Date().toISOString(),
    consentText: SMS_CONSENT_TEXT,
    consentTextVersion: SMS_CONSENT_TEXT_VERSION,
    consentTextSha256: SMS_CONSENT_TEXT_SHA256,
    privacyPolicyVersion: PRIVACY_POLICY_VERSION,
    smsTermsVersion: SMS_TERMS_VERSION,
    sourceUrl: getSourceUrl(request),
    ipAddress,
    userAgent: request.headers.get("user-agent"),
    brand: SMS_BRAND,
    legalEntity: SMS_LEGAL_ENTITY,
    useCase: "marketing/promotional",
    withdrawalStatus: "not_withdrawn",
    withdrawalTimestampUtc: null,
    outboundSmsStatus: "disabled_pending_toll_free_verification",
  };

  try {
    await persistSmsConsent(evidence);
  } catch (error) {
    if (error instanceof ConsentStorageUnavailableError) {
      return json({ ok: false, error: "storage_unavailable" }, 503);
    }

    return json({ ok: false, error: "temporary_error" }, 503);
  }

  return json({ ok: true, consentId: evidence.id }, 201);
};

export const ALL: APIRoute = () => json({ ok: false, error: "method_not_allowed" }, 405);
