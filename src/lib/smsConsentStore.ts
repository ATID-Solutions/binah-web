import { mkdir, open } from "node:fs/promises";
import path from "node:path";

export interface SmsConsentEvidence {
  recordVersion: 1;
  id: string;
  phoneNumber: string;
  name: string | null;
  consentStatus: "opted_in";
  consentTimestampUtc: string;
  consentText: string;
  consentTextVersion: string;
  consentTextSha256: string;
  privacyPolicyVersion: string;
  smsTermsVersion: string;
  sourceUrl: string;
  ipAddress: string | null;
  userAgent: string | null;
  brand: "Binah";
  legalEntity: "Soluciones ALCO S.A.S.";
  useCase: "marketing/promotional";
  withdrawalStatus: "not_withdrawn";
  withdrawalTimestampUtc: null;
  outboundSmsStatus: "disabled_pending_toll_free_verification";
}

export class ConsentStorageUnavailableError extends Error {
  constructor() {
    super("Durable SMS consent storage is not configured.");
    this.name = "ConsentStorageUnavailableError";
  }
}

const getStoragePath = () => {
  if (process.env.SMS_CONSENT_STORAGE_PATH) {
    return path.resolve(process.env.SMS_CONSENT_STORAGE_PATH);
  }

  if (process.env.RAILWAY_VOLUME_MOUNT_PATH) {
    return path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, "binah-sms-consents.jsonl");
  }

  if (process.env.NODE_ENV !== "production") {
    return path.resolve(".data", "sms-consents.jsonl");
  }

  return null;
};

const persistToFile = async (record: SmsConsentEvidence) => {
  const storagePath = getStoragePath();
  if (!storagePath) {
    throw new ConsentStorageUnavailableError();
  }

  await mkdir(path.dirname(storagePath), { recursive: true, mode: 0o700 });
  const handle = await open(storagePath, "a", 0o600);

  try {
    await handle.appendFile(`${JSON.stringify(record)}\n`, { encoding: "utf8" });
    await handle.sync();
  } finally {
    await handle.close();
  }
};

const persistToWebhook = async (record: SmsConsentEvidence, webhookUrl: string) => {
  const endpoint = new URL(webhookUrl);
  const isLocal = endpoint.hostname === "localhost" || endpoint.hostname === "127.0.0.1";

  if (endpoint.protocol !== "https:" && !(process.env.NODE_ENV !== "production" && isLocal)) {
    throw new ConsentStorageUnavailableError();
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        ...(process.env.SMS_CONSENT_WEBHOOK_TOKEN
          ? { authorization: `Bearer ${process.env.SMS_CONSENT_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(record),
      redirect: "error",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Consent storage returned HTTP ${response.status}.`);
    }
  } finally {
    clearTimeout(timeout);
  }
};

export const persistSmsConsent = async (record: SmsConsentEvidence) => {
  if (process.env.SMS_CONSENT_WEBHOOK_URL) {
    await persistToWebhook(record, process.env.SMS_CONSENT_WEBHOOK_URL);
    return;
  }

  await persistToFile(record);
};
