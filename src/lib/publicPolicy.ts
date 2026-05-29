export interface PolicyPayload {
  orgId: string;
  organizationName: string;
  legalName: string;
  policyVersion: string;
  policyPublicUrl?: string;
  policyText: string;
  policyComplete?: boolean;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
}

export type PageState =
  | {
      kind: "success";
      status: 200;
      data: PolicyPayload;
    }
  | {
      kind: "error";
      status: 400 | 404 | 500 | 502;
      eyebrow: string;
      heading: string;
      body: string;
    };

export const invalidLinkState: PageState = {
  kind: "error",
  status: 400,
  eyebrow: "Enlace inválido",
  heading: "No pudimos procesar este enlace.",
  body: "Verifica que el código de la política o el enlace público sean válidos.",
};

const notFoundState: PageState = {
  kind: "error",
  status: 404,
  eyebrow: "Política no disponible",
  heading: "No encontramos una política pública activa para esta organización.",
  body: "El enlace puede corresponder a una versión antigua o a una organización que todavía no completó la información pública requerida.",
};

const temporaryErrorState = (status: 500 | 502): PageState => ({
  kind: "error",
  status,
  eyebrow: "Error temporal",
  heading: "No fue posible cargar la política en este momento.",
  body: "Intenta nuevamente en unos minutos.",
});

interface BuildPublicPolicyPageStateInput {
  actionsBaseUrl?: string;
  code?: string;
  orgId?: string;
  version?: string;
}

export const buildPublicPolicyPageState = async ({
  actionsBaseUrl,
  code,
  orgId,
  version,
}: BuildPublicPolicyPageStateInput): Promise<PageState> => {
  const hasCode = Boolean(code);
  const hasLegacyPolicyReference = Boolean(orgId && version);

  if (!hasCode && !hasLegacyPolicyReference) {
    return invalidLinkState;
  }

  if (!actionsBaseUrl) {
    return temporaryErrorState(500);
  }

  let upstreamResponse: Response;

  try {
    const endpoint = new URL("/public/data-treatment-policy", actionsBaseUrl);

    if (code) {
      endpoint.searchParams.set("code", code);
    } else {
      endpoint.searchParams.set("orgId", orgId as string);
      endpoint.searchParams.set("v", version as string);
    }

    upstreamResponse = await fetch(endpoint, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
  } catch {
    return temporaryErrorState(502);
  }

  if (upstreamResponse.status === 400) {
    return invalidLinkState;
  }

  if (upstreamResponse.status === 404) {
    return notFoundState;
  }

  if (!upstreamResponse.ok) {
    return temporaryErrorState(upstreamResponse.status >= 500 ? 502 : 500);
  }

  let payload: PolicyPayload;

  try {
    payload = await upstreamResponse.json();
  } catch {
    return temporaryErrorState(502);
  }

  if (
    typeof payload.organizationName !== "string" ||
    typeof payload.legalName !== "string" ||
    typeof payload.policyVersion !== "string" ||
    typeof payload.policyText !== "string"
  ) {
    return temporaryErrorState(502);
  }

  return {
    kind: "success",
    status: 200,
    data: payload,
  };
};

export const getPublicPolicyPageTitle = (pageState: PageState) =>
  pageState.kind === "success"
    ? `Política de Tratamiento de Datos | ${pageState.data.organizationName}`
    : "Política de Tratamiento de Datos | Binah";

export const isValidExternalUrl = (value?: string) => {
  if (!value) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};
