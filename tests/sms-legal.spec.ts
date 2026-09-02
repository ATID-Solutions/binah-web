import { expect, test } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFile, rm } from "node:fs/promises";
import { consentEvidencePath } from "../playwright.config";
import {
  PRIVACY_POLICY_VERSION,
  SMS_CONSENT_TEXT,
  SMS_CONSENT_TEXT_SHA256,
  SMS_CONSENT_TEXT_VERSION,
  SMS_TERMS_VERSION,
  normalizeUsPhone,
} from "../src/lib/smsProgram";

const origin = "http://127.0.0.1:4321";

test.beforeAll(async () => {
  await rm(consentEvidencePath, { force: true });
});

test("normalizes valid US numbers and rejects invalid numbers", () => {
  expect(normalizeUsPhone("(415) 555-0136")).toBe("+14155550136");
  expect(normalizeUsPhone("+1 415 555 0136")).toBe("+14155550136");
  expect(normalizeUsPhone("12345")).toBeNull();
  expect(normalizeUsPhone("+57 300 555 1212")).toBeNull();
});

test("the recorded consent hash matches the exact disclosure", () => {
  expect(createHash("sha256").update(SMS_CONSENT_TEXT).digest("hex")).toBe(SMS_CONSENT_TEXT_SHA256);
});

test("privacy, terms, and SMS routes return 200 on direct load and refresh", async ({ page }) => {
  for (const path of ["/privacidad", "/terminos", "/sms"]) {
    const response = await page.goto(path, { waitUntil: "domcontentloaded" });
    expect(response?.status(), path).toBe(200);
    const refreshed = await page.reload({ waitUntil: "domcontentloaded" });
    expect(refreshed?.status(), `${path} refresh`).toBe(200);
  }
});

test("permanent English aliases resolve to their canonical pages", async ({ request }) => {
  const privacy = await request.get("/privacy", { maxRedirects: 0 });
  expect(privacy.status()).toBe(301);
  expect(privacy.headers().location).toBe("/privacidad");

  const terms = await request.get("/terms", { maxRedirects: 0 });
  expect(terms.status()).toBe(301);
  expect(terms.headers().location).toBe("/terminos");
});

test("the SMS checkbox starts unchecked and submission is unavailable", async ({ page }) => {
  await page.goto("/sms");
  const checkbox = page.getByRole("checkbox", { name: /I agree to receive recurring/i });
  const submit = page.getByRole("button", { name: /Opt in/i });

  await expect(checkbox).not.toBeChecked();
  await expect(submit).toBeDisabled();

  await page.getByLabel(/US mobile number/i).fill("4155550136");
  await expect(submit).toBeDisabled();
});

test("the API rejects a submission without explicit consent", async ({ request }) => {
  const response = await request.post("/api/sms-consent", {
    headers: { origin },
    data: {
      phone: "4155550136",
      consent: false,
      consentTextVersion: SMS_CONSENT_TEXT_VERSION,
      formStartedAt: Date.now() - 3_000,
      website: "",
    },
  });

  expect(response.status()).toBe(422);
  await expect(response.json()).resolves.toMatchObject({
    ok: false,
    error: "explicit_consent_required",
  });
});

test("a valid submission records complete, versioned consent evidence", async ({ request }) => {
  const response = await request.post("/api/sms-consent", {
    headers: {
      origin,
      referer: `${origin}/sms`,
      "user-agent": "Binah consent evidence test",
      "x-forwarded-for": "203.0.113.42",
    },
    data: {
      name: "Consent Test",
      phone: "(415) 555-0136",
      consent: true,
      consentTextVersion: SMS_CONSENT_TEXT_VERSION,
      formStartedAt: Date.now() - 3_000,
      website: "",
    },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body).toMatchObject({ ok: true });

  const records = (await readFile(consentEvidencePath, "utf8"))
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  const record = records.find((entry) => entry.id === body.consentId);

  expect(record).toMatchObject({
    phoneNumber: "+14155550136",
    name: "Consent Test",
    consentStatus: "opted_in",
    consentText: SMS_CONSENT_TEXT,
    consentTextVersion: SMS_CONSENT_TEXT_VERSION,
    consentTextSha256: SMS_CONSENT_TEXT_SHA256,
    privacyPolicyVersion: PRIVACY_POLICY_VERSION,
    smsTermsVersion: SMS_TERMS_VERSION,
    sourceUrl: `${origin}/sms`,
    ipAddress: "203.0.113.42",
    userAgent: "Binah consent evidence test",
    brand: "Binah",
    legalEntity: "Soluciones ALCO S.A.S.",
    useCase: "marketing/promotional",
    withdrawalStatus: "not_withdrawn",
    withdrawalTimestampUtc: null,
    outboundSmsStatus: "disabled_pending_toll_free_verification",
  });
  expect(new Date(record.consentTimestampUtc).toISOString()).toBe(record.consentTimestampUtc);
});

test("privacy and terms links resolve from the disclosure", async ({ page }) => {
  await page.goto("/sms");

  const terms = page.locator(".sms-consent-row a[href='/terminos']");
  const privacy = page.locator(".sms-consent-row a[href='/privacidad']");
  await expect(terms).toHaveText("Terms");
  await expect(privacy).toHaveText("Privacy Policy");
  expect((await page.request.get(await terms.getAttribute("href") as string)).status()).toBe(200);
  expect((await page.request.get(await privacy.getAttribute("href") as string)).status()).toBe(200);
});

test("the form succeeds without putting a phone number in a URL or analytics payload", async ({ page }) => {
  const requestedUrls: string[] = [];
  page.on("request", (request) => requestedUrls.push(request.url()));

  await page.goto("/sms");
  await page.getByLabel(/US mobile number/i).fill("2025550147");
  await page.getByRole("checkbox", { name: /I agree to receive recurring/i }).check();
  await page.waitForTimeout(1_600);
  await page.getByRole("button", { name: /Opt in/i }).click();

  await expect(page.locator("[data-success]")).toBeVisible();
  expect(page.url()).toBe(`${origin}/sms`);
  expect(requestedUrls.some((url) => url.includes("2025550147") || url.includes("202%20555%200147"))).toBe(false);
});

test("the mobile layout has no horizontal overflow and supports keyboard consent", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/sms");

  const name = page.getByLabel(/Name/i);
  const phone = page.getByLabel(/US mobile number/i);
  const consent = page.getByRole("checkbox", { name: /I agree to receive recurring/i });
  const submit = page.getByRole("button", { name: /Opt in/i });

  await expect(consent).not.toBeChecked();
  await page.screenshot({ path: "test-results/sms-opt-in-full-page.png", fullPage: true });

  await name.focus();
  await page.keyboard.press("Tab");
  await expect(phone).toBeFocused();
  await phone.fill("2025550147");
  await page.keyboard.press("Tab");
  await expect(consent).toBeFocused();
  await page.keyboard.press("Space");
  await expect(consent).toBeChecked();
  await expect(submit).toBeEnabled();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
