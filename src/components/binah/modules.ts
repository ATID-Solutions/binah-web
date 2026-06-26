export type ModuleId =
  | "crm"
  | "retail"
  | "facturacion"
  | "contabilidad"
  | "chat"
  | "operaciones"
  | "tareas"
  | "invoice"
  | "reportes";

export interface BinahModule {
  id: ModuleId;
  num: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  features: string[];
  href: string;
}

export const BINAH_MODULES: BinahModule[] = [
  {
    id: "crm",
    num: "01",
    name: "CRM & Agentes",
    short: "Inbox unificado + agentes IA",
    tagline: "Un solo inbox. Tres agentes entrenados. Cero conversaciones perdidas.",
    description:
      "WhatsApp, Instagram y correo convergen en un inbox único. Tus agentes de IA — ventas, soporte y reservas — responden, califican y cierran 24/7.",
    features: [
      "Inbox unificado multicanal",
      "Agente de ventas que convierte prospectos",
      "Agente de soporte entrenado con tu knowledge base",
      "Agente de reservas que cuadra citas solo",
    ],
    href: "/modulo-crm",
  },
  {
    id: "retail",
    num: "02",
    name: "Retail",
    short: "Despacho y trazabilidad",
    tagline: "Del pedido a la puerta en segundos, no en llamadas.",
    description:
      "Despacha, rastrea y vincula pedidos con clientes en segundos. Visibilidad total de inventario, transportadoras y entregas.",
    features: [
      "Despacho con un clic a transportadoras",
      "Trazabilidad en tiempo real",
      "Vinculación automática con el CRM",
      "Etiquetas y guías generadas al instante",
    ],
    href: "/modulo-retail",
  },
  {
    id: "facturacion",
    num: "03",
    name: "Facturación Electrónica",
    short: "DIAN, automática",
    tagline: "Cada factura, crédito y nota — emitida a la DIAN sin que levantes un dedo.",
    description:
      "Cumplimiento total con la regulación colombiana. Genera, firma y envía cada documento electrónico requerido automáticamente.",
    features: [
      "Factura electrónica DIAN",
      "Notas crédito y débito",
      "Documento soporte equivalente",
      "Firma digital incluida",
    ],
    href: "/modulo-facturacion-electronica",
  },
  {
    id: "contabilidad",
    num: "04",
    name: "Contabilidad",
    short: "Costos, compras, proveedores",
    tagline: "Tu contador te va a pedir un aumento (de cariño).",
    description:
      "Seguimiento de costos, órdenes de compra, proveedores y conciliaciones — todo conectado con ventas y facturación.",
    features: [
      "Órdenes de compra",
      "Gestión de proveedores",
      "Costeo por producto y servicio",
      "Reportes financieros en vivo",
    ],
    href: "/modulo-contabilidad",
  },
  {
    id: "chat",
    num: "05",
    name: "Chat Interno",
    short: "Comunicación del equipo",
    tagline: "Adiós a los grupos de WhatsApp caóticos.",
    description:
      "Canales, mensajes directos e hilos dentro de la misma plataforma donde tu equipo ya trabaja.",
    features: [
      "Canales por proyecto o área",
      "Hilos y menciones",
      "Archivos compartidos",
      "Huddles de voz",
    ],
    href: "/modulo-chat-interno",
  },
  {
    id: "operaciones",
    num: "06",
    name: "Operaciones",
    short: "Agenda & servicios",
    tagline: "Para negocios de servicio que viven de la agenda.",
    description:
      "Centraliza agenda, asignación de personal, seguimiento de servicios y soporte postventa en un único panel.",
    features: [
      "Agenda multi-recurso",
      "Asignación automática",
      "Seguimiento de servicios",
      "Checklists operativas",
    ],
    href: "/modulo-operaciones",
  },
  {
    id: "tareas",
    num: "07",
    name: "Tareas",
    short: "Proyectos del equipo",
    tagline: "Todo lo tuyo, hecho. En la misma plataforma.",
    description:
      "Tableros, listas y cronogramas para que los equipos avancen sin saltar entre cinco apps.",
    features: [
      "Tableros Kanban",
      "Vistas de lista y cronograma",
      "Asignación y prioridades",
      "Integrado con cada módulo",
    ],
    href: "/modulo-tareas",
  },
  {
    id: "invoice",
    num: "08",
    name: "Pagos",
    short: "Cobros y links",
    tagline: "Cobra en cinco segundos por cualquier canal.",
    description:
      "Links de pago, cobros recurrentes y conciliación automática con tu facturación electrónica.",
    features: [
      "Links de pago por WhatsApp",
      "Cobros recurrentes",
      "Conciliación automática",
      "Integra PSE, tarjetas, Nequi",
    ],
    href: "/modulo-pagos",
  },
  {
    id: "reportes",
    num: "09",
    name: "Reportes",
    short: "Analítica de todo",
    tagline: "La foto completa. En una sola pantalla.",
    description:
      "Dashboards que combinan ventas, operaciones, finanzas y soporte — porque todo vive en la misma base de datos.",
    features: [
      "Dashboards personalizables",
      "Exportes a Excel / PDF",
      "Reportes programados",
      "Data en tiempo real",
    ],
    href: "/modulo-reportes",
  },
];

export const MODULE_LOGOS: Partial<Record<ModuleId, string[]>> = {
  crm: ["whatsapp", "instagram", "email"],
  retail: ["shopify", "woocommerce", "coordinadora"],
  facturacion: ["dian"],
  invoice: ["wompi", "epayco", "nequi"],
};
