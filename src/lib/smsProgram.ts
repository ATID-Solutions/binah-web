export const SMS_PROGRAM_NAME = "Binah SMS Marketing Program";
export const SMS_BRAND = "Binah";
export const SMS_LEGAL_ENTITY = "Soluciones ALCO S.A.S.";
export const SMS_SUPPORT_EMAIL = "soporte@binah.co";
export const SMS_SUPPORT_NUMBER = "+1 844 603 1375";

export const PRIVACY_POLICY_VERSION = "binah-privacy-v1";
export const SMS_TERMS_VERSION = "binah-sms-terms-v1";
export const SMS_CONSENT_TEXT_VERSION = "binah-sms-marketing-consent-v1";

export const SMS_CONSENT_TEXT =
  "I agree to receive recurring marketing and promotional text messages from Binah, operated by Soluciones ALCO S.A.S., at the number provided. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. See our Terms and Privacy Policy.";

export const SMS_CONSENT_TEXT_SHA256 =
  "a14b2e0ddfef40e389ac4e6c594db5cd3c676d3be24e0a20e706f588df947c46";

export const SMS_USE_CASE =
  "Soluciones ALCO S.A.S., doing business as Binah, sends recurring marketing and promotional SMS messages to existing and prospective customers who have expressly opted in directly with Binah. Messages may include Binah product news, feature announcements, educational content, invitations to product demonstrations, and special offers related to the Binah business software platform. Recipients opt in through a Binah-branded web form using a separate, unchecked SMS marketing consent checkbox. SMS consent is optional and is not a condition of purchasing or using Binah. Binah does not use purchased or third-party lead lists. Message frequency varies. Recipients can reply STOP to opt out or HELP for assistance.";

export const SMS_WELCOME_MESSAGE =
  "Binah: Welcome! You are subscribed to marketing and product updates. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out or HELP for help.";

export const SMS_HELP_MESSAGE =
  "Binah: Marketing and product updates. Help: soporte@binah.co. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out.";

export function normalizeUsPhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  const nationalNumber = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(nationalNumber)) {
    return null;
  }

  return `+1${nationalNumber}`;
}
