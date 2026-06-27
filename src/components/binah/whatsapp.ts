// Single source of truth for the Binah WhatsApp contact.
export const WA_NUMBER = "573147040528";

export function waUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Pre-written prompts for each CTA surface — keep them short and
// conversational so the prospect can edit before sending.
export const WA_MESSAGES = {
  demo: "Hola, me gustaría agendar una demo de Binah.",
  modules: "Hola, quiero conocer los módulos de Binah.",
  pricingStarter: "Hola, me interesa el plan Starter de $299K de Binah.",
  pricingPro: "Hola, me interesa el plan Pro de $699K de Binah.",
  pricingBusiness: "Hola, me interesa el plan Business de $2.09M de Binah.",
  pricingScale: "Hola, queremos un plan a la medida para nuestro equipo.",
  pricingFacturacion:
    "Hola, tengo dudas sobre los paquetes de Facturación Electrónica de Binah.",
  moduleCrm: "Hola, me interesa el módulo de CRM & Agentes de Binah.",
  moduleRetail: "Hola, me interesa el módulo de Retail de Binah.",
  careers: "Hola, me interesa trabajar en Binah.",
  general: "Hola, quisiera más información sobre Binah.",
} as const;
