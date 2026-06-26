import { BINAH_MODULES, type ModuleId } from "../components/binah/modules";

export type MarketingPageKind = "module" | "solution";
export type MarketingPagePriority = "P0" | "P1" | "P2";

export interface MarketingPageStep {
  label: string;
  detail: string;
}

export interface MarketingPageFaq {
  question: string;
  answer: string;
}

export interface MarketingPageLink {
  label: string;
  href: string;
}

export interface MarketingPageDetail {
  kind: MarketingPageKind;
  priority: MarketingPagePriority;
  slug: string;
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  moduleId: ModuleId;
  moduleName: string;
  searchIntent: string;
  colombiaUseCase: string;
  heroMetric: string;
  heroMetricLabel: string;
  proof: string;
  situations: string[];
  workflow: MarketingPageStep[];
  capabilities: string[];
  faqs: MarketingPageFaq[];
  related: MarketingPageLink[];
  sources?: MarketingPageLink[];
  disclaimer?: string;
  sitemapPriority: string;
  changefreq: "weekly" | "monthly";
}

const modulePathById: Record<ModuleId, string> = {
  crm: "/modulo-crm",
  retail: "/modulo-retail",
  facturacion: "/modulo-facturacion-electronica",
  contabilidad: "/modulo-contabilidad",
  chat: "/modulo-chat-interno",
  operaciones: "/modulo-operaciones",
  tareas: "/modulo-tareas",
  invoice: "/modulo-pagos",
  reportes: "/modulo-reportes",
};

const moduleById = Object.fromEntries(BINAH_MODULES.map((module) => [module.id, module])) as Record<
  ModuleId,
  (typeof BINAH_MODULES)[number]
>;

const moduleRelated = (moduleId: ModuleId): MarketingPageLink[] => {
  const module = moduleById[moduleId];
  return [
    { label: "Ver todos los módulos", href: "/modulos" },
    { label: "Precios", href: "/precios" },
    { label: module.name, href: modulePathById[moduleId] },
  ];
};

const commonFaqs = (feature: string, moduleName: string): MarketingPageFaq[] => [
  {
    question: "¿Binah cubre este flujo completo?",
    answer: `Sí. Binah conecta ${feature} con ${moduleName}, CRM, pagos, facturación, reportes y operación para que el flujo no quede aislado en otra herramienta.`,
  },
  {
    question: "¿Se puede activar sin cambiar todo el negocio de una vez?",
    answer:
      "Sí. Puedes empezar por el flujo puntual que necesitas y luego conectar más módulos cuando la operación lo pida.",
  },
  {
    question: "¿El equipo de Binah ayuda con la migración?",
    answer:
      "Sí. Revisamos clientes, productos, conversaciones, facturas y reglas operativas para dejar el flujo listo con tus datos reales.",
  },
];

export const MODULE_PAGE_DETAILS: MarketingPageDetail[] = BINAH_MODULES.map((module) => {
  const moduleCases: Record<ModuleId, string> = {
    crm: "Unificar WhatsApp, Instagram, email y agentes IA para equipos comerciales colombianos.",
    retail: "Operar pedidos, inventario, despachos y tracking en tiendas que venden por canales digitales y físicos.",
    facturacion: "Emitir documentos electrónicos DIAN conectados con ventas, pagos e inventario.",
    contabilidad: "Controlar proveedores, compras, costos, cartera y conciliaciones desde los datos reales del negocio.",
    chat: "Mover la comunicación interna al mismo lugar donde viven pedidos, clientes y tareas.",
    operaciones: "Coordinar agenda, recursos, servicios, checklists y recordatorios para negocios de servicios.",
    tareas: "Convertir ventas, pedidos y soporte en tareas visibles para cada equipo.",
    invoice: "Cobrar por WhatsApp, PSE, tarjeta o Nequi y reconciliar pagos con facturas y pedidos.",
    reportes: "Ver ventas, conversión, despachos, pagos, soporte y operación en tableros accionables.",
  };

  const moduleSearch: Record<ModuleId, string> = {
    crm: "crm whatsapp colombia, crm instagram, agentes ia ventas",
    retail: "software retail colombia, inventario y despachos, ecommerce colombia",
    facturacion: "facturación electrónica dian, documento soporte, notas crédito",
    contabilidad: "software contabilidad pymes colombia, proveedores, costos",
    chat: "chat interno empresa, comunicación equipo, canales internos",
    operaciones: "software agenda servicios, gestión operaciones, reservas whatsapp",
    tareas: "software tareas equipo, kanban empresas, gestión proyectos",
    invoice: "links de pago whatsapp colombia, conciliación pagos, cobros recurrentes",
    reportes: "reportes negocio colombia, dashboards ventas, analítica pymes",
  };

  const moduleProof: Record<ModuleId, string> = {
    crm: "El inbox deja de ser una lista de chats y se convierte en pipeline, contexto y seguimiento.",
    retail: "La venta, el inventario, la guía y el mensaje al cliente avanzan en el mismo flujo.",
    facturacion: "Cada documento nace desde la operación que lo origina, no desde una digitación posterior.",
    contabilidad: "Compras, proveedores y costos dejan de vivir en hojas sueltas.",
    chat: "La conversación interna queda conectada al pedido, cliente, factura o tarea correcta.",
    operaciones: "Agenda y recursos dejan de depender de llamadas, notas y confirmaciones manuales.",
    tareas: "Cada pendiente tiene dueño, estado, prioridad y contexto operativo.",
    invoice: "El pago no queda separado de la conversación, la factura ni el reporte financiero.",
    reportes: "La dirección ve el negocio completo sin pedir cortes manuales a cada área.",
  };

  return {
    kind: "module",
    priority: module.id === "crm" || module.id === "retail" ? "P0" : "P1",
    slug: modulePathById[module.id].replace("/", ""),
    path: modulePathById[module.id],
    title: `${module.name} — Binah`,
    description: module.description,
    eyebrow: `Módulo ${module.num} / ${module.name}`,
    h1: module.tagline,
    lead: module.description,
    moduleId: module.id,
    moduleName: module.name,
    searchIntent: moduleSearch[module.id],
    colombiaUseCase: moduleCases[module.id],
    heroMetric: module.num,
    heroMetricLabel: "módulo Binah",
    proof: moduleProof[module.id],
    situations: module.features,
    workflow: [
      { label: "Captura", detail: "El dato entra desde el canal, venta, pedido, pago o tarea que ya usa tu equipo." },
      { label: "Contexto", detail: "Binah lo cruza con clientes, productos, inventario, documentos y responsables." },
      { label: "Acción", detail: "El módulo ejecuta el siguiente paso sin que otro equipo tenga que pedirlo por chat." },
      { label: "Reporte", detail: "Cada movimiento queda disponible en tableros, historial y trazabilidad." },
    ],
    capabilities: module.features,
    faqs: commonFaqs(module.name.toLowerCase(), module.name),
    related: moduleRelated(module.id),
    sitemapPriority: module.id === "crm" || module.id === "retail" ? "0.8" : "0.74",
    changefreq: "weekly",
  };
});

export const SEO_FEATURE_PAGES: MarketingPageDetail[] = [
  {
    kind: "solution",
    priority: "P0",
    slug: "codigos-ean-productos-colombia",
    path: "/codigos-ean-productos-colombia",
    title: "Códigos EAN y GTIN para productos en Colombia — Binah",
    description:
      "Organiza códigos EAN, GTIN, SKU y códigos de barras por producto y variante para vender en retail, marketplaces y POS en Colombia.",
    eyebrow: "Solución SEO / EAN + GTIN",
    h1: "Códigos EAN listos para operar tu catálogo.",
    lead:
      "Binah te ayuda a conservar el código correcto por producto, variante y empaque para que puedas generar el código de barras y vender con menos fricción.",
    moduleId: "retail",
    moduleName: "Retail",
    searchIntent: "codigo ean colombia, gtin productos colombia, codigo de barras productos",
    colombiaUseCase:
      "Preparar productos para canales como Falabella, Éxito, Carulla, Olímpica, Mercado Libre, Rappi y puntos de venta propios.",
    heroMetric: "GTIN",
    heroMetricLabel: "por producto, variante y empaque",
    proof:
      "El catálogo queda con SKU interno, GTIN/EAN oficial cuando aplique, descripción, variante, inventario y datos listos para empaque, POS y marketplaces.",
    disclaimer:
      "Binah no reemplaza a GS1. Si necesitas GTIN válidos para grandes superficies o marketplaces, esos códigos deben venir de GS1 Colombia o del prefijo GS1 de tu empresa. Binah los organiza y los usa dentro de tu operación.",
    situations: [
      "Una marca de alimentos que quiere entrar a grandes superficies y necesita GTIN por referencia.",
      "Una tienda de moda con tallas y colores que no puede repetir códigos entre variantes.",
      "Un e-commerce que quiere alinear SKU, EAN, inventario, factura y etiqueta de despacho.",
    ],
    workflow: [
      { label: "Producto", detail: "Creas la referencia con nombre, categoría, impuestos, costo y precio." },
      { label: "Variante", detail: "Separaras talla, color, presentación o empaque cuando cada versión necesita código propio." },
      { label: "Código", detail: "Asocias SKU interno y GTIN/EAN oficial cuando el canal lo requiere." },
      { label: "Operación", detail: "El mismo dato alimenta inventario, POS, factura, etiqueta, despacho y reportes." },
    ],
    capabilities: [
      "Catálogo con SKU, EAN/GTIN, variantes y empaques.",
      "Datos consistentes para inventario, POS y facturación.",
      "Exportación de catálogo para equipos comerciales y bodegas.",
      "Conexión con retail, despachos, reportes y páginas de producto.",
    ],
    faqs: [
      {
        question: "¿Binah genera códigos GTIN oficiales?",
        answer:
          "No prometemos reemplazar a GS1. Binah gestiona y conserva los códigos de tu catálogo; si el canal exige GTIN oficial, debes obtenerlo con GS1 Colombia o usar tu prefijo GS1.",
      },
      {
        question: "¿Puedo usar códigos internos para mi POS?",
        answer:
          "Sí, para operación interna puedes manejar códigos propios. Cuando vendas en grandes superficies o marketplaces, el canal puede exigir GTIN válido.",
      },
      {
        question: "¿Cada variante necesita código distinto?",
        answer:
          "Cuando cambia una unidad vendible, como talla, color, presentación o empaque, normalmente conviene manejar un código separado para evitar errores de inventario y despacho.",
      },
      {
        question: "¿Binah genera el código de barras visual?",
        answer:
          "Binah conserva el número y los datos del producto. Con ese número tu equipo puede generar e imprimir el código de barras con la herramienta o proveedor que use para empaque.",
      },
    ],
    related: [
      { label: "Módulo Retail", href: "/modulo-retail" },
      { label: "Catálogo con variantes", href: "/catalogo-productos-variantes-sku-ean" },
      { label: "POS y documento equivalente", href: "/pos-documento-equivalente-electronico-dian" },
    ],
    sources: [
      { label: "GS1 Colombia", href: "https://gs1co.org/" },
      {
        label: "Código EAN/UPC",
        href: "https://gs1co.org/soluciones/captura-de-informacion/codigo-ean-upc",
      },
      {
        label: "Qué es GTIN",
        href: "https://gs1co.org/soluciones/identificacion/numeros-globales-de-identificacion-de-productos-gtin",
      },
    ],
    sitemapPriority: "0.86",
    changefreq: "weekly",
  },
  {
    kind: "solution",
    priority: "P0",
    slug: "facturacion-electronica-dian",
    path: "/facturacion-electronica-dian",
    title: "Facturación electrónica DIAN automática — Binah",
    description:
      "Factura electrónica, notas crédito, notas débito y documentos conectados con ventas, pagos, inventario y clientes en Colombia.",
    eyebrow: "Solución SEO / DIAN",
    h1: "Facturación DIAN conectada a la venta real.",
    lead:
      "Cada pedido, cobro o ajuste puede terminar en el documento correcto sin que tu equipo vuelva a digitar lo mismo.",
    moduleId: "facturacion",
    moduleName: "Facturación Electrónica",
    searchIntent: "software facturacion electronica dian, factura electronica colombia",
    colombiaUseCase:
      "Ventas por WhatsApp, tienda online o punto físico que necesitan factura, nota crédito y trazabilidad del documento.",
    heroMetric: "DIAN",
    heroMetricLabel: "documentos desde operación",
    proof:
      "La factura queda conectada con cliente, pedido, producto, pago, devolución y reporte financiero.",
    situations: [
      "Una tienda factura ventas que llegan por WhatsApp, Shopify o mostrador.",
      "Un equipo de soporte necesita emitir nota crédito por cambio o devolución.",
      "La gerencia necesita ver ventas facturadas sin esperar un cierre manual.",
    ],
    workflow: [
      { label: "Venta", detail: "El pedido nace desde CRM, retail, POS o tienda online." },
      { label: "Datos", detail: "Binah trae cliente, productos, impuestos, envío y medio de pago." },
      { label: "Documento", detail: "Se emite la factura o ajuste que corresponda al flujo." },
      { label: "Trazabilidad", detail: "El documento queda asociado al pedido, al cliente y a los reportes." },
    ],
    capabilities: [
      "Factura electrónica conectada al pedido.",
      "Notas crédito y débito para ajustes.",
      "Documento soporte y flujos de compras.",
      "Reportes por cliente, vendedor, canal y estado.",
    ],
    faqs: [
      {
        question: "¿Binah reemplaza mi operación de facturación actual?",
        answer:
          "Binah puede centralizar el flujo operativo de facturación y conectarlo con ventas, pagos e inventario. La configuración depende de tu operación y de los requisitos tributarios aplicables.",
      },
      {
        question: "¿Puedo facturar ventas que entran por WhatsApp?",
        answer:
          "Sí. El objetivo es que una venta cerrada en CRM pueda usar los datos del cliente y del pedido para emitir el documento sin doble digitación.",
      },
      {
        question: "¿Las devoluciones quedan conectadas?",
        answer:
          "Sí. Las notas crédito y ajustes pueden quedar asociados al pedido, al inventario y al historial del cliente.",
      },
    ],
    related: [
      { label: "Módulo Facturación", href: "/modulo-facturacion-electronica" },
      { label: "Notas crédito y devoluciones", href: "/notas-credito-devoluciones-dian-retail" },
      { label: "Conciliación de pagos", href: "/conciliacion-pagos-facturas-colombia" },
    ],
    sources: [
      {
        label: "DIAN - Sistema de Factura Electrónica",
        href: "https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/",
      },
    ],
    sitemapPriority: "0.86",
    changefreq: "weekly",
  },
  {
    kind: "solution",
    priority: "P0",
    slug: "crm-whatsapp-instagram-colombia",
    path: "/crm-whatsapp-instagram-colombia",
    title: "CRM para WhatsApp, Instagram y email en Colombia — Binah",
    description:
      "Unifica WhatsApp, Instagram y correo en un CRM para equipos comerciales colombianos con trazabilidad, asignación y agentes IA.",
    eyebrow: "Solución SEO / CRM multicanal",
    h1: "Un CRM para los canales donde sí te escriben.",
    lead:
      "WhatsApp, Instagram y email dejan de vivir en teléfonos sueltos y entran a un inbox con dueños, contexto y seguimiento.",
    moduleId: "crm",
    moduleName: "CRM & Agentes",
    searchIntent: "crm whatsapp colombia, crm instagram whatsapp, inbox omnicanal",
    colombiaUseCase:
      "Equipos de ventas en Bogotá, Medellín, Cali, Barranquilla o cualquier ciudad que atienden clientes por WhatsApp e Instagram todos los días.",
    heroMetric: "1",
    heroMetricLabel: "inbox para ventas y soporte",
    proof:
      "Cada conversación queda conectada al cliente, al pedido, al pago, al agente y al historial comercial.",
    situations: [
      "Asesores que comparten clientes en varios WhatsApp.",
      "Mensajes de Instagram que se pierden después de una campaña.",
      "Gerentes que no saben qué conversaciones terminan en venta.",
    ],
    workflow: [
      { label: "Entrada", detail: "El cliente escribe por WhatsApp, Instagram o email." },
      { label: "Asignación", detail: "Binah asigna dueño, estado, prioridad y contexto." },
      { label: "Cierre", detail: "El asesor o agente IA responde, cotiza, cobra o escala." },
      { label: "Seguimiento", detail: "La conversación queda en reportes y próximos pasos." },
    ],
    capabilities: [
      "Inbox multicanal.",
      "Asignación por agente, equipo o estado.",
      "Historial de cliente y conversaciones.",
      "Conexión con pagos, retail, facturación y reportes.",
    ],
    faqs: commonFaqs("CRM para WhatsApp e Instagram", "CRM & Agentes"),
    related: [
      { label: "Módulo CRM", href: "/modulo-crm" },
      { label: "Agente IA de ventas", href: "/agente-ia-ventas-whatsapp" },
      { label: "Campañas WhatsApp", href: "/campanas-whatsapp-clientes-colombia" },
    ],
    sitemapPriority: "0.86",
    changefreq: "weekly",
  },
  {
    kind: "solution",
    priority: "P0",
    slug: "agente-ia-ventas-whatsapp",
    path: "/agente-ia-ventas-whatsapp",
    title: "Agente IA de ventas por WhatsApp — Binah",
    description:
      "Agente IA para responder, calificar, recomendar productos, cotizar y enviar links de pago por WhatsApp en negocios colombianos.",
    eyebrow: "Solución SEO / IA comercial",
    h1: "Un agente de ventas que responde cuando el lead está caliente.",
    lead:
      "Entrena un agente con tu catálogo, tono y reglas comerciales para atender oportunidades sin dejar esperando al cliente.",
    moduleId: "crm",
    moduleName: "CRM & Agentes",
    searchIntent: "chatbot whatsapp ventas, agente ia whatsapp colombia",
    colombiaUseCase:
      "Marcas que reciben leads por pauta, Instagram o referidos y necesitan responder, calificar y cobrar rápido.",
    heroMetric: "24/7",
    heroMetricLabel: "respuesta comercial",
    proof:
      "El agente no trabaja aislado: consulta catálogo, contexto del cliente, disponibilidad, pagos y estado del pedido.",
    situations: [
      "Leads de pauta que escriben de noche y se enfrían al otro día.",
      "Clientes que preguntan precios, disponibilidad y métodos de pago.",
      "Asesores que necesitan que la IA filtre y escale solo lo importante.",
    ],
    workflow: [
      { label: "Pregunta", detail: "El lead escribe por WhatsApp o Instagram." },
      { label: "Calificación", detail: "La IA entiende intención, presupuesto, producto y urgencia." },
      { label: "Oferta", detail: "Responde con recomendación, cotización o link de pago." },
      { label: "Escala", detail: "Pasa a humano cuando hay negociación, excepción o alta intención." },
    ],
    capabilities: [
      "Respuestas entrenadas con catálogo y políticas.",
      "Escalamiento a asesor humano.",
      "Links de pago desde la conversación.",
      "Reporte de conversión y oportunidades.",
    ],
    faqs: commonFaqs("agente IA de ventas por WhatsApp", "CRM & Agentes"),
    related: [
      { label: "CRM WhatsApp", href: "/crm-whatsapp-instagram-colombia" },
      { label: "Links de pago", href: "/links-de-pago-whatsapp-colombia" },
      { label: "Base de conocimiento IA", href: "/base-conocimiento-agente-ia-soporte" },
    ],
    sitemapPriority: "0.86",
    changefreq: "weekly",
  },
  {
    kind: "solution",
    priority: "P0",
    slug: "software-despachos-transportadoras-colombia",
    path: "/software-despachos-transportadoras-colombia",
    title: "Software de despachos con transportadoras en Colombia — Binah",
    description:
      "Gestiona pedidos, guías, etiquetas, tracking y notificaciones con transportadoras colombianas desde Binah.",
    eyebrow: "Solución SEO / Despachos",
    h1: "Del pedido a la guía sin perseguir datos.",
    lead:
      "Cuando la venta se confirma, bodega recibe contexto, se prepara el paquete y el cliente queda notificado.",
    moduleId: "retail",
    moduleName: "Retail",
    searchIntent: "software despachos colombia, generar guias servientrega coordinadora",
    colombiaUseCase:
      "Operaciones que despachan con Servientrega, Coordinadora, Interrapidísimo u otras transportadoras y necesitan trazabilidad.",
    heroMetric: "1",
    heroMetricLabel: "flujo para pedido, guía y tracking",
    proof:
      "El despacho queda conectado al pedido, inventario, cliente, factura y conversación de soporte.",
    situations: [
      "Bodega copia datos de Excel a portales de transportadora.",
      "Clientes preguntan por WhatsApp dónde está el pedido.",
      "El equipo no sabe qué pedidos están empacados, en ruta o entregados.",
    ],
    workflow: [
      { label: "Pedido", detail: "La venta entra desde CRM, tienda online o carga manual." },
      { label: "Picking", detail: "Binah reserva inventario y prepara la lista de empaque." },
      { label: "Guía", detail: "Se genera la información necesaria para etiqueta y transportadora." },
      { label: "Tracking", detail: "El estado queda visible para el equipo y para mensajes al cliente." },
    ],
    capabilities: [
      "Estados de pedido y despacho.",
      "Datos listos para guías y etiquetas.",
      "Notificaciones por WhatsApp.",
      "Reportes de tiempos, entregas y pendientes.",
    ],
    faqs: commonFaqs("despachos con transportadoras colombianas", "Retail"),
    related: [
      { label: "Módulo Retail", href: "/modulo-retail" },
      { label: "Tracking por WhatsApp", href: "/tracking-pedidos-whatsapp-colombia" },
      { label: "Picking y packing", href: "/picking-packing-ecommerce-colombia" },
    ],
    sitemapPriority: "0.86",
    changefreq: "weekly",
  },
  {
    kind: "solution",
    priority: "P0",
    slug: "links-de-pago-whatsapp-colombia",
    path: "/links-de-pago-whatsapp-colombia",
    title: "Links de pago por WhatsApp en Colombia — Binah",
    description:
      "Cobra por WhatsApp con links de pago, PSE, tarjetas, Nequi y conciliación conectada a clientes, facturas y pedidos.",
    eyebrow: "Solución SEO / Pagos",
    h1: "Cobra en el mismo chat donde vendes.",
    lead:
      "Envía links de pago desde la conversación y deja el cobro conectado al cliente, pedido, factura y reporte.",
    moduleId: "invoice",
    moduleName: "Pagos",
    searchIntent: "link de pago whatsapp, cobrar por whatsapp colombia",
    colombiaUseCase:
      "Asesores que cierran por WhatsApp y necesitan cobrar por PSE, tarjeta, Nequi o pasarela sin perder trazabilidad.",
    heroMetric: "$",
    heroMetricLabel: "cobro conectado",
    proof:
      "El pago no queda como pantallazo: queda asociado a pedido, cliente, canal, vendedor y documento.",
    situations: [
      "Clientes listos para comprar que piden link de pago por WhatsApp.",
      "Equipos que validan pagos manualmente con comprobantes.",
      "Ventas que necesitan factura y conciliación después del cobro.",
    ],
    workflow: [
      { label: "Cotización", detail: "El asesor o agente confirma producto, valor y datos del cliente." },
      { label: "Link", detail: "Se envía un enlace de pago por el mismo canal." },
      { label: "Confirmación", detail: "El estado del pago vuelve a la operación." },
      { label: "Conciliación", detail: "El cobro se cruza con pedido, factura y reporte." },
    ],
    capabilities: [
      "Links de pago desde CRM.",
      "Conciliación con pedido y factura.",
      "Estados de cobro visibles para el equipo.",
      "Reportes por canal, vendedor y método de pago.",
    ],
    faqs: commonFaqs("links de pago por WhatsApp", "Pagos"),
    related: [
      { label: "Módulo Pagos", href: "/modulo-pagos" },
      { label: "Agente IA de ventas", href: "/agente-ia-ventas-whatsapp" },
      { label: "Conciliación de pagos", href: "/conciliacion-pagos-facturas-colombia" },
    ],
    sitemapPriority: "0.86",
    changefreq: "weekly",
  },
];

const additionalSolutions: Array<
  Omit<
    MarketingPageDetail,
    | "kind"
    | "priority"
    | "path"
    | "title"
    | "description"
    | "eyebrow"
    | "heroMetric"
    | "heroMetricLabel"
    | "faqs"
    | "sitemapPriority"
    | "changefreq"
  > & {
    priority: MarketingPagePriority;
    title: string;
    description: string;
    heroMetric?: string;
    heroMetricLabel?: string;
    faqs?: MarketingPageFaq[];
  }
> = [
  {
    priority: "P1",
    slug: "catalogo-productos-variantes-sku-ean",
    title: "Catálogo de productos con SKU, variantes y EAN — Binah",
    description: "Organiza productos, variantes, SKU, EAN/GTIN, precios, costos e inventario en un catálogo conectado.",
    h1: "Un catálogo que entiende tallas, colores y empaques.",
    lead: "Cada variante tiene su identidad: SKU interno, código de barras, precio, costo, inventario y reglas de venta.",
    moduleId: "retail",
    moduleName: "Retail",
    searchIntent: "sku vs ean, catalogo productos variantes, inventario por variantes",
    colombiaUseCase: "Tiendas de ropa, alimentos, cosmética o accesorios que venden la misma referencia en varias presentaciones.",
    proof: "El catálogo alimenta ventas, POS, inventario, etiquetas, facturación, reportes y marketplaces.",
    situations: ["Tallas y colores mezclados en un solo producto.", "Presentaciones por unidad, pack y caja.", "Equipos que no saben qué variante se vendió."],
    workflow: [
      { label: "Referencia", detail: "Defines producto base, categoría, impuestos y unidad." },
      { label: "Variantes", detail: "Separaras talla, color, presentación o empaque." },
      { label: "Códigos", detail: "Asignas SKU interno y EAN/GTIN cuando aplica." },
      { label: "Venta", detail: "Cada canal consume el mismo dato confiable." },
    ],
    capabilities: ["SKU por variante.", "EAN/GTIN por producto.", "Precios, costos y stock.", "Exportes y reportes de catálogo."],
    related: [
      { label: "Códigos EAN", href: "/codigos-ean-productos-colombia" },
      { label: "Inventario conectado", href: "/inventario-conectado-ventas-whatsapp-tienda-online" },
      { label: "Módulo Retail", href: "/modulo-retail" },
    ],
  },
  {
    priority: "P1",
    slug: "inventario-conectado-ventas-whatsapp-tienda-online",
    title: "Inventario conectado a WhatsApp y tienda online — Binah",
    description: "Evita sobreventas conectando inventario con pedidos por WhatsApp, Shopify, WooCommerce, asesores y bodega.",
    h1: "Inventario que se mueve al ritmo de tus ventas.",
    lead: "Cada pedido reserva stock, actualiza bodega y deja trazabilidad para ventas, despacho y soporte.",
    moduleId: "retail",
    moduleName: "Retail",
    searchIntent: "inventario tienda online whatsapp, control inventario ventas",
    colombiaUseCase: "Tiendas que venden por WhatsApp, Instagram, Shopify, WooCommerce y mostrador al mismo tiempo.",
    proof: "El equipo comercial vende con disponibilidad real y bodega ve qué debe separar.",
    situations: ["Sobreventas en temporadas de promo.", "Inventario distinto entre tienda online y WhatsApp.", "Bodega recibe pedidos incompletos."],
    workflow: [
      { label: "Pedido", detail: "Entra desde canal digital, asesor o tienda." },
      { label: "Reserva", detail: "Binah descuenta o aparta unidades disponibles." },
      { label: "Bodega", detail: "El equipo ve picking, prioridad y estado." },
      { label: "Reporte", detail: "Ventas y stock quedan sincronizados." },
    ],
    capabilities: ["Stock por producto y variante.", "Reserva por pedido.", "Alertas operativas.", "Conexión con despacho y factura."],
    related: [
      { label: "Catálogo SKU/EAN", href: "/catalogo-productos-variantes-sku-ean" },
      { label: "Despachos", href: "/software-despachos-transportadoras-colombia" },
      { label: "Shopify Colombia", href: "/software-shopify-colombia-crm-inventario" },
    ],
  },
  {
    priority: "P1",
    slug: "tracking-pedidos-whatsapp-colombia",
    title: "Tracking de pedidos por WhatsApp en Colombia — Binah",
    description: "Notifica estados de pedido por WhatsApp y reduce preguntas repetidas de seguimiento y entrega.",
    h1: "El cliente pregunta menos cuando el pedido habla solo.",
    lead: "Recibido, empacado, en ruta y entregado quedan disponibles para soporte y mensajes al cliente.",
    moduleId: "retail",
    moduleName: "Retail",
    searchIntent: "notificaciones whatsapp pedidos, tracking pedidos whatsapp colombia",
    colombiaUseCase: "E-commerce y marcas D2C que reciben la misma pregunta: ¿dónde está mi pedido?",
    proof: "Soporte ve el estado antes de responder y el cliente recibe actualizaciones claras.",
    situations: ["Clientes pidiendo guía por WhatsApp.", "Pedidos sin estado visible para ventas.", "Soporte copiando información de varias plataformas."],
    workflow: [
      { label: "Estado", detail: "Cada pedido avanza por etapas operativas." },
      { label: "Mensaje", detail: "El cliente recibe o solicita actualización por WhatsApp." },
      { label: "Soporte", detail: "El agente humano o IA consulta el estado real." },
      { label: "Cierre", detail: "La entrega queda registrada en el historial." },
    ],
    capabilities: ["Estados configurables.", "Historial por cliente.", "Consulta desde CRM.", "Reportes de entregas y pendientes."],
    related: [
      { label: "Despachos", href: "/software-despachos-transportadoras-colombia" },
      { label: "Agente IA de soporte", href: "/agente-ia-soporte-clientes-whatsapp" },
      { label: "Módulo Retail", href: "/modulo-retail" },
    ],
  },
  {
    priority: "P1",
    slug: "agente-ia-soporte-clientes-whatsapp",
    title: "Agente IA de soporte por WhatsApp — Binah",
    description: "Automatiza respuestas de soporte, estado de pedidos, cambios, devoluciones y preguntas frecuentes por WhatsApp.",
    h1: "Soporte que entiende el pedido antes de responder.",
    lead: "La IA consulta contexto real: cliente, compra, tracking, políticas y conversaciones previas.",
    moduleId: "crm",
    moduleName: "CRM & Agentes",
    searchIntent: "chatbot soporte whatsapp, ia soporte clientes colombia",
    colombiaUseCase: "Marcas que reciben preguntas repetidas sobre envíos, cambios, garantías, tallas y medios de pago.",
    proof: "El agente responde con información de Binah y escala casos sensibles al equipo humano.",
    situations: ["¿Dónde está mi pedido?", "Quiero cambiar la talla.", "¿Cuál es la política de garantía?"],
    workflow: [
      { label: "Consulta", detail: "El cliente escribe por WhatsApp o Instagram." },
      { label: "Contexto", detail: "La IA consulta pedido, tracking, políticas y datos del cliente." },
      { label: "Respuesta", detail: "Resuelve o pide datos faltantes con tono de marca." },
      { label: "Escala", detail: "Deriva al equipo cuando hay excepción." },
    ],
    capabilities: ["Base de conocimiento.", "Consulta de pedidos.", "Escalamiento humano.", "Reportes de motivos de contacto."],
    related: [
      { label: "Base de conocimiento IA", href: "/base-conocimiento-agente-ia-soporte" },
      { label: "Tracking pedidos", href: "/tracking-pedidos-whatsapp-colombia" },
      { label: "Módulo CRM", href: "/modulo-crm" },
    ],
  },
  {
    priority: "P1",
    slug: "agente-ia-reservas-citas-whatsapp",
    title: "Agente IA para reservas y citas por WhatsApp — Binah",
    description: "Agenda citas, confirma horarios, envía recordatorios y reduce no-shows para negocios de servicios.",
    h1: "Reservas por WhatsApp sin perseguir horarios.",
    lead: "El agente propone disponibilidad, confirma la cita y deja el servicio conectado a operaciones.",
    moduleId: "operaciones",
    moduleName: "Operaciones",
    searchIntent: "chatbot reservas whatsapp, agenda citas whatsapp colombia",
    colombiaUseCase: "Peluquerías, centros estéticos, consultorios, talleres, academias y servicios profesionales.",
    proof: "Agenda, cliente, recurso, recordatorio y seguimiento quedan en el mismo flujo.",
    situations: ["Clientes piden disponibilidad por WhatsApp.", "El equipo olvida confirmar citas.", "Hay huecos por no-shows o reagendamientos."],
    workflow: [
      { label: "Solicitud", detail: "El cliente pide cita por chat." },
      { label: "Disponibilidad", detail: "El agente consulta agenda y recursos." },
      { label: "Confirmación", detail: "Reserva horario y envía recordatorio." },
      { label: "Servicio", detail: "Operaciones ve agenda, responsable y estado." },
    ],
    capabilities: ["Agenda multi-recurso.", "Recordatorios.", "Reagendamiento.", "Historial por cliente."],
    related: [
      { label: "Módulo Operaciones", href: "/modulo-operaciones" },
      { label: "CRM servicios", href: "/crm-negocios-servicios-agenda-whatsapp" },
      { label: "Módulo CRM", href: "/modulo-crm" },
    ],
  },
  {
    priority: "P1",
    slug: "campanas-whatsapp-clientes-colombia",
    title: "Campañas de WhatsApp para clientes en Colombia — Binah",
    description: "Segmenta clientes y envía campañas de WhatsApp conectadas al CRM, ventas y reportes.",
    h1: "Campañas de WhatsApp sin listas sueltas.",
    lead: "Reactiva clientes, lanza promociones y mide qué conversaciones terminan en venta.",
    moduleId: "crm",
    moduleName: "CRM & Agentes",
    searchIntent: "campañas whatsapp colombia, mensajes masivos whatsapp clientes",
    colombiaUseCase: "Tiendas y servicios que quieren activar bases de clientes sin depender de Excel y pantallazos.",
    proof: "La campaña se conecta al historial del cliente y al resultado comercial.",
    situations: ["Promociones de temporada.", "Clientes inactivos.", "Recordatorios y confirmaciones."],
    workflow: [
      { label: "Segmento", detail: "Filtras clientes por comportamiento, compra o estado." },
      { label: "Mensaje", detail: "Preparas comunicación alineada al canal." },
      { label: "Conversación", detail: "Las respuestas entran al CRM." },
      { label: "Medición", detail: "Ventas y respuestas quedan en reportes." },
    ],
    capabilities: ["Segmentación.", "Historial por cliente.", "Seguimiento comercial.", "Reportes de campaña."],
    related: [
      { label: "CRM WhatsApp", href: "/crm-whatsapp-instagram-colombia" },
      { label: "Agente IA ventas", href: "/agente-ia-ventas-whatsapp" },
      { label: "Precios", href: "/precios" },
    ],
  },
  {
    priority: "P1",
    slug: "pos-documento-equivalente-electronico-dian",
    title: "POS y documento equivalente electrónico DIAN — Binah",
    description: "Prepara productos, códigos, ventas y documentos para operación POS conectada con inventario y facturación.",
    h1: "El POS también necesita catálogo limpio.",
    lead: "Cuando el producto, código, impuesto y venta están bien identificados, el documento y el inventario fluyen mejor.",
    moduleId: "facturacion",
    moduleName: "Facturación Electrónica",
    searchIntent: "pos electrónico dian, documento equivalente electrónico colombia",
    colombiaUseCase: "Comercios con venta de mostrador que necesitan identificar bienes, servicios y códigos en el punto de venta.",
    proof: "Producto, venta, documento, inventario y reporte quedan unidos desde el mostrador.",
    situations: ["Productos sin código interno.", "Ventas POS que no descuentan inventario.", "Documentos que no cruzan con reportes."],
    workflow: [
      { label: "Catálogo", detail: "Productos con código, descripción, unidad e impuestos." },
      { label: "Venta", detail: "El POS identifica lo vendido." },
      { label: "Documento", detail: "El flujo alimenta el documento correspondiente." },
      { label: "Control", detail: "Inventario y reportes se actualizan." },
    ],
    capabilities: ["Códigos internos o EAN.", "Catálogo POS.", "Conexión con inventario.", "Trazabilidad de documento."],
    related: [
      { label: "Códigos EAN", href: "/codigos-ean-productos-colombia" },
      { label: "Facturación DIAN", href: "/facturacion-electronica-dian" },
      { label: "Módulo Retail", href: "/modulo-retail" },
    ],
    sources: [
      {
        label: "DIAN - Documento Equivalente Electrónico",
        href: "https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/documento-equivalente-electronico/",
      },
    ],
  },
  {
    priority: "P1",
    slug: "notas-credito-devoluciones-dian-retail",
    title: "Notas crédito y devoluciones conectadas a retail — Binah",
    description: "Gestiona devoluciones, cambios, notas crédito e inventario en un solo flujo conectado con DIAN y soporte.",
    h1: "Cada devolución debe ajustar algo más que una factura.",
    lead: "Cuando hay cambio de talla, garantía o reembolso, Binah conecta soporte, inventario, documento y reporte.",
    moduleId: "facturacion",
    moduleName: "Facturación Electrónica",
    searchIntent: "nota credito dian devolucion, devoluciones factura electronica",
    colombiaUseCase: "Tiendas de ropa, belleza, tecnología y e-commerce que hacen cambios y devoluciones frecuentes.",
    proof: "El ajuste queda asociado al pedido original, al cliente y al producto que vuelve o sale de inventario.",
    situations: ["Cambio de talla.", "Producto defectuoso.", "Reembolso parcial o total."],
    workflow: [
      { label: "Caso", detail: "Soporte registra el motivo de devolución." },
      { label: "Producto", detail: "Inventario define si vuelve a stock, revisión o baja." },
      { label: "Documento", detail: "Se genera el ajuste requerido." },
      { label: "Reporte", detail: "Queda visible por causa, producto y canal." },
    ],
    capabilities: ["Motivos de devolución.", "Ajustes de inventario.", "Notas crédito.", "Reportes por producto y canal."],
    related: [
      { label: "Facturación DIAN", href: "/facturacion-electronica-dian" },
      { label: "Agente IA soporte", href: "/agente-ia-soporte-clientes-whatsapp" },
      { label: "Módulo Retail", href: "/modulo-retail" },
    ],
  },
  {
    priority: "P1",
    slug: "conciliacion-pagos-facturas-colombia",
    title: "Conciliación de pagos y facturas en Colombia — Binah",
    description: "Cruza pagos, pedidos, facturas y clientes para reducir revisión manual y errores de cartera.",
    h1: "Pagos, facturas y pedidos hablando el mismo idioma.",
    lead: "Cada cobro puede quedar asociado al pedido, cliente, factura y canal que lo generó.",
    moduleId: "invoice",
    moduleName: "Pagos",
    searchIntent: "conciliar pagos facturas, conciliacion wompi epayco nequi",
    colombiaUseCase: "Equipos que reciben pagos por PSE, tarjeta, Nequi, transferencias o pasarelas y luego deben cuadrar todo.",
    proof: "Finanzas deja de buscar comprobantes en chats y hojas de cálculo.",
    situations: ["Pagos sin identificar.", "Facturas pendientes aunque el cliente pagó.", "Reportes de ventas descuadrados."],
    workflow: [
      { label: "Cobro", detail: "El pago nace desde chat, link, tienda o factura." },
      { label: "Cruce", detail: "Binah lo relaciona con cliente, pedido y documento." },
      { label: "Estado", detail: "El equipo ve pagado, pendiente o en revisión." },
      { label: "Cierre", detail: "Los reportes financieros reflejan la realidad." },
    ],
    capabilities: ["Estados de pago.", "Cruce con facturas.", "Reporte de cartera.", "Historial por cliente."],
    related: [
      { label: "Links de pago", href: "/links-de-pago-whatsapp-colombia" },
      { label: "Facturación DIAN", href: "/facturacion-electronica-dian" },
      { label: "Módulo Pagos", href: "/modulo-pagos" },
    ],
  },
  {
    priority: "P1",
    slug: "migrar-clientes-productos-facturas-binah",
    title: "Migrar clientes, productos y facturas a Binah",
    description: "Importa clientes, productos, facturas, conversaciones e inventario desde Excel, Shopify, WooCommerce u otros sistemas.",
    h1: "Migrar no debería frenar la operación.",
    lead: "Ordenamos tus datos actuales para que Binah arranque con clientes, productos, historial y reglas reales.",
    moduleId: "reportes",
    moduleName: "Plataforma",
    searchIntent: "migrar datos crm, importar productos facturacion, migrar inventario",
    colombiaUseCase: "Empresas que crecieron con Excel, WhatsApp, tiendas online y software separados.",
    proof: "El onboarding se enfoca en dejar datos útiles, no solo en subir archivos.",
    situations: ["Clientes duplicados.", "Productos con nombres inconsistentes.", "Facturas y pedidos en sistemas separados."],
    workflow: [
      { label: "Diagnóstico", detail: "Revisamos fuentes y calidad de datos." },
      { label: "Limpieza", detail: "Normalizamos columnas, duplicados y estructuras." },
      { label: "Carga", detail: "Importamos clientes, productos y operación." },
      { label: "Validación", detail: "El equipo prueba flujos antes de operar." },
    ],
    capabilities: ["Importación desde Excel.", "Clientes y productos.", "Historial operativo.", "Acompañamiento de onboarding."],
    related: [
      { label: "Módulos", href: "/modulos" },
      { label: "Precios", href: "/precios" },
      { label: "CRM WhatsApp", href: "/crm-whatsapp-instagram-colombia" },
    ],
  },
  {
    priority: "P2",
    slug: "generar-guias-etiquetas-envio-colombia",
    title: "Generar guías y etiquetas de envío en Colombia — Binah",
    description: "Prepara datos de guías, etiquetas y despacho para pedidos de e-commerce y ventas por WhatsApp.",
    h1: "Etiquetas listas desde el pedido, no desde el caos.",
    lead: "Nombre, dirección, ciudad, producto, peso y estado salen del flujo operativo correcto.",
    moduleId: "retail",
    moduleName: "Retail",
    searchIntent: "generar guias etiquetas envio colombia",
    colombiaUseCase: "Bodegas que preparan pedidos para transportadoras colombianas y necesitan menos digitación manual.",
    proof: "La información de envío queda conectada al pedido y al cliente.",
    situations: ["Errores de dirección.", "Guías repetidas.", "Equipo copiando datos a mano."],
    workflow: [
      { label: "Datos", detail: "Pedido y cliente alimentan la guía." },
      { label: "Empaque", detail: "Bodega confirma productos y cantidades." },
      { label: "Etiqueta", detail: "El equipo usa datos limpios para imprimir o generar." },
      { label: "Estado", detail: "El pedido avanza a despacho." },
    ],
    capabilities: ["Datos de envío.", "Listas de empaque.", "Estados de guía.", "Tracking conectado."],
    related: [
      { label: "Despachos", href: "/software-despachos-transportadoras-colombia" },
      { label: "Picking y packing", href: "/picking-packing-ecommerce-colombia" },
      { label: "Módulo Retail", href: "/modulo-retail" },
    ],
  },
  {
    priority: "P2",
    slug: "picking-packing-ecommerce-colombia",
    title: "Picking y packing para e-commerce en Colombia — Binah",
    description: "Ordena separación, empaque, validación y despacho de pedidos para tiendas online colombianas.",
    h1: "Bodega sin adivinar qué debe empacar.",
    lead: "Cada pedido se transforma en una tarea clara de picking, empaque y despacho.",
    moduleId: "retail",
    moduleName: "Retail",
    searchIntent: "picking packing ecommerce colombia, bodega ecommerce",
    colombiaUseCase: "Marcas D2C y tiendas online que pasan de pocos pedidos diarios a operación constante.",
    proof: "Bodega ve prioridades, productos, cantidades, cliente y canal en una sola vista.",
    situations: ["Productos equivocados en el paquete.", "Pedidos represados.", "Falta visibilidad de bodega."],
    workflow: [
      { label: "Cola", detail: "Pedidos listos para separar." },
      { label: "Picking", detail: "Productos y cantidades por pedido." },
      { label: "Packing", detail: "Validación y empaque." },
      { label: "Salida", detail: "Despacho y tracking." },
    ],
    capabilities: ["Listas de picking.", "Estados de empaque.", "Control por pedido.", "Reportes de bodega."],
    related: [
      { label: "Despachos", href: "/software-despachos-transportadoras-colombia" },
      { label: "Inventario conectado", href: "/inventario-conectado-ventas-whatsapp-tienda-online" },
      { label: "Módulo Retail", href: "/modulo-retail" },
    ],
  },
  {
    priority: "P2",
    slug: "ordenes-compra-proveedores-colombia",
    title: "Órdenes de compra y proveedores en Colombia — Binah",
    description: "Gestiona proveedores, órdenes de compra, costos y recepción de mercancía conectados al inventario.",
    h1: "Compras conectadas con lo que sí se vende.",
    lead: "Proveedores, órdenes, costos y recepción dejan de estar separados de inventario y ventas.",
    moduleId: "contabilidad",
    moduleName: "Contabilidad",
    searchIntent: "ordenes compra proveedores colombia, gestion proveedores pymes",
    colombiaUseCase: "Empresas que compran insumos, empaques, producto terminado o servicios recurrentes.",
    proof: "Cada compra puede impactar costos, stock, cuentas por pagar y reportes.",
    situations: ["Proveedores sin historial.", "Compras sin aprobación.", "Costos que no llegan al producto."],
    workflow: [
      { label: "Solicitud", detail: "El equipo solicita compra o reposición." },
      { label: "Proveedor", detail: "Se registra precio, condiciones y contacto." },
      { label: "Orden", detail: "Se aprueba y se hace seguimiento." },
      { label: "Recepción", detail: "Mercancía y costos se reflejan en inventario." },
    ],
    capabilities: ["Proveedores.", "Órdenes de compra.", "Recepción.", "Costeo conectado."],
    related: [
      { label: "Módulo Contabilidad", href: "/modulo-contabilidad" },
      { label: "Costeo por producto", href: "/costeo-productos-inventario-colombia" },
      { label: "Inventario", href: "/inventario-conectado-ventas-whatsapp-tienda-online" },
    ],
  },
  {
    priority: "P2",
    slug: "costeo-productos-inventario-colombia",
    title: "Costeo por producto e inventario en Colombia — Binah",
    description: "Controla costos por producto, margen, proveedores, compras e inventario para tomar mejores decisiones.",
    h1: "Vender sin saber el margen es operar a ciegas.",
    lead: "Binah conecta costo, precio, proveedor, inventario y venta para entender rentabilidad real.",
    moduleId: "contabilidad",
    moduleName: "Contabilidad",
    searchIntent: "costeo productos inventario colombia, margen producto pyme",
    colombiaUseCase: "Moda, alimentos, cosmética, manufactura ligera y retail con costos cambiantes.",
    proof: "El margen deja de ser estimación y empieza a salir del flujo de compras y ventas.",
    situations: ["Costos de proveedor cambian.", "Promociones sin margen claro.", "Inventario valorizado a ojo."],
    workflow: [
      { label: "Compra", detail: "Registras costo y proveedor." },
      { label: "Producto", detail: "El costo queda en la referencia o variante." },
      { label: "Venta", detail: "Binah cruza precio, descuento y costo." },
      { label: "Margen", detail: "Reportes muestran rentabilidad." },
    ],
    capabilities: ["Costo por producto.", "Margen por venta.", "Compras conectadas.", "Reportes financieros."],
    related: [
      { label: "Órdenes de compra", href: "/ordenes-compra-proveedores-colombia" },
      { label: "Módulo Contabilidad", href: "/modulo-contabilidad" },
      { label: "Reportes", href: "/modulo-reportes" },
    ],
  },
  {
    priority: "P2",
    slug: "reportes-excel-pdf-negocio-colombia",
    title: "Reportes en Excel y PDF para negocios en Colombia — Binah",
    description: "Exporta reportes de ventas, inventario, pagos, facturación, cartera y operación a Excel o PDF.",
    h1: "Reportes que salen del sistema, no de favores.",
    lead: "Gerencia, contabilidad y operación acceden a cortes claros sin pedir archivos manuales a cada área.",
    moduleId: "reportes",
    moduleName: "Reportes",
    searchIntent: "reportes excel pdf negocio colombia, dashboards pymes",
    colombiaUseCase: "Dueños, contadores y equipos comerciales que necesitan cortes semanales o mensuales confiables.",
    proof: "La data viene de CRM, retail, pagos, facturación y operación en la misma base.",
    situations: ["Cierre mensual manual.", "Ventas por canal sin consolidar.", "Contador pidiendo soportes."],
    workflow: [
      { label: "Dato", detail: "Cada módulo alimenta reportes." },
      { label: "Filtro", detail: "Cruzas periodo, canal, vendedor o estado." },
      { label: "Exporta", detail: "Descargas Excel o PDF." },
      { label: "Decide", detail: "Gerencia actúa con números consistentes." },
    ],
    capabilities: ["Dashboards.", "Exportes Excel/PDF.", "Reportes programados.", "Filtros por módulo."],
    related: [
      { label: "Módulo Reportes", href: "/modulo-reportes" },
      { label: "Conciliación", href: "/conciliacion-pagos-facturas-colombia" },
      { label: "Inventario", href: "/inventario-conectado-ventas-whatsapp-tienda-online" },
    ],
  },
  {
    priority: "P2",
    slug: "crm-negocios-servicios-agenda-whatsapp",
    title: "CRM para negocios de servicios con agenda y WhatsApp — Binah",
    description: "Gestiona clientes, conversaciones, agenda, reservas, recordatorios y seguimiento para negocios de servicios.",
    h1: "Servicios con agenda, CRM y WhatsApp en el mismo lugar.",
    lead: "Cada conversación puede terminar en reserva, tarea, servicio prestado y seguimiento postventa.",
    moduleId: "operaciones",
    moduleName: "Operaciones",
    searchIntent: "crm negocios servicios agenda whatsapp",
    colombiaUseCase: "Belleza, salud, educación, consultoría, talleres, mantenimiento y servicios profesionales.",
    proof: "Cliente, agenda, servicio, responsable y recordatorio quedan conectados.",
    situations: ["Citas en chats personales.", "No-shows.", "Clientes sin seguimiento."],
    workflow: [
      { label: "Lead", detail: "Cliente escribe por WhatsApp o Instagram." },
      { label: "Reserva", detail: "Se agenda servicio y recurso." },
      { label: "Recordatorio", detail: "Se confirma asistencia." },
      { label: "Postventa", detail: "Queda historial y próxima acción." },
    ],
    capabilities: ["CRM.", "Agenda.", "Recordatorios.", "Historial de servicio."],
    related: [
      { label: "Agente reservas", href: "/agente-ia-reservas-citas-whatsapp" },
      { label: "Módulo Operaciones", href: "/modulo-operaciones" },
      { label: "Módulo CRM", href: "/modulo-crm" },
    ],
  },
  {
    priority: "P2",
    slug: "crm-inventario-tienda-ropa-colombia",
    title: "CRM e inventario para tiendas de ropa en Colombia — Binah",
    description: "Controla conversaciones, tallas, colores, cambios, inventario, pedidos y despachos para tiendas de ropa.",
    h1: "Moda sin perder tallas entre chats.",
    lead: "Ventas por WhatsApp, inventario por variante, cambios de talla y despachos quedan en un solo flujo.",
    moduleId: "retail",
    moduleName: "Retail",
    searchIntent: "crm inventario tienda ropa colombia, software tienda ropa whatsapp",
    colombiaUseCase: "Tiendas de ropa, marcas D2C, boutiques y emprendimientos que venden por Instagram y WhatsApp.",
    proof: "Cada talla y color tiene stock, código, pedido y conversación asociada.",
    situations: ["Cliente pregunta por talla disponible.", "Cambio de talla después de comprar.", "Inventario de Instagram distinto al real."],
    workflow: [
      { label: "Pregunta", detail: "Cliente llega por WhatsApp o Instagram." },
      { label: "Disponibilidad", detail: "Asesor ve talla, color y stock." },
      { label: "Venta", detail: "Se cobra y reserva inventario." },
      { label: "Cambio", detail: "Soporte gestiona devolución o cambio." },
    ],
    capabilities: ["Variantes.", "CRM multicanal.", "Cambios y devoluciones.", "Despachos."],
    related: [
      { label: "Catálogo SKU/EAN", href: "/catalogo-productos-variantes-sku-ean" },
      { label: "CRM WhatsApp", href: "/crm-whatsapp-instagram-colombia" },
      { label: "Notas crédito", href: "/notas-credito-devoluciones-dian-retail" },
    ],
  },
  {
    priority: "P2",
    slug: "software-shopify-colombia-crm-inventario",
    title: "Software para Shopify en Colombia con CRM e inventario — Binah",
    description: "Conecta Shopify con CRM, inventario, despachos, pagos, facturación y reportes para operar en Colombia.",
    h1: "Shopify vende. Binah opera lo que pasa después.",
    lead: "Pedidos, clientes, inventario, despacho, soporte y factura necesitan una operación local conectada.",
    moduleId: "retail",
    moduleName: "Retail",
    searchIntent: "software shopify colombia crm inventario",
    colombiaUseCase: "Tiendas Shopify colombianas que venden por web, WhatsApp e Instagram y necesitan backoffice local.",
    proof: "La tienda online se conecta con lo que ocurre en bodega, soporte, pagos y facturación.",
    situations: ["Pedidos de Shopify y WhatsApp separados.", "Inventario desactualizado.", "Facturación y despacho manual."],
    workflow: [
      { label: "Pedido", detail: "La tienda recibe compra." },
      { label: "Operación", detail: "Binah gestiona cliente, inventario y despacho." },
      { label: "Soporte", detail: "WhatsApp ve estado y contexto." },
      { label: "Reporte", detail: "Ventas web y otros canales se consolidan." },
    ],
    capabilities: ["CRM.", "Inventario.", "Despachos.", "Facturación y reportes."],
    related: [
      { label: "Inventario conectado", href: "/inventario-conectado-ventas-whatsapp-tienda-online" },
      { label: "Despachos", href: "/software-despachos-transportadoras-colombia" },
      { label: "Módulo Retail", href: "/modulo-retail" },
    ],
  },
  {
    priority: "P2",
    slug: "software-woocommerce-colombia-crm-facturacion",
    title: "Software para WooCommerce en Colombia con CRM y facturación — Binah",
    description: "Conecta WooCommerce con CRM, inventario, facturación DIAN, despachos, pagos y soporte por WhatsApp.",
    h1: "WooCommerce conectado al negocio real.",
    lead: "Tu tienda WordPress puede vender, pero Binah ayuda a coordinar pedidos, clientes, factura y despacho.",
    moduleId: "retail",
    moduleName: "Retail",
    searchIntent: "software woocommerce colombia crm facturacion",
    colombiaUseCase: "Pymes colombianas con WooCommerce que necesitan operación, soporte y cumplimiento local.",
    proof: "La venta online queda conectada con CRM, inventario, facturación y reportes.",
    situations: ["Pedidos web sin seguimiento comercial.", "Inventario duplicado.", "Facturas hechas por fuera del flujo."],
    workflow: [
      { label: "Compra", detail: "El cliente compra en WooCommerce." },
      { label: "Cliente", detail: "Binah centraliza historial y conversación." },
      { label: "Operación", detail: "Se activa inventario, despacho y factura." },
      { label: "Soporte", detail: "El equipo responde con contexto." },
    ],
    capabilities: ["CRM.", "Inventario.", "Facturación.", "Soporte y reportes."],
    related: [
      { label: "Facturación DIAN", href: "/facturacion-electronica-dian" },
      { label: "CRM WhatsApp", href: "/crm-whatsapp-instagram-colombia" },
      { label: "Módulo Retail", href: "/modulo-retail" },
    ],
  },
  {
    priority: "P2",
    slug: "base-conocimiento-agente-ia-soporte",
    title: "Base de conocimiento para agente IA de soporte — Binah",
    description: "Entrena agentes IA con políticas, preguntas frecuentes, catálogo, procesos y tono de marca.",
    h1: "La IA responde mejor cuando conoce tu negocio.",
    lead: "Centraliza reglas, políticas, preguntas frecuentes y datos operativos para respuestas consistentes.",
    moduleId: "crm",
    moduleName: "CRM & Agentes",
    searchIntent: "base conocimiento agente ia soporte, entrenar chatbot empresa",
    colombiaUseCase: "Equipos que quieren automatizar soporte sin respuestas improvisadas ni pérdida de tono.",
    proof: "El agente consulta conocimiento aprobado y escala cuando la respuesta requiere criterio humano.",
    situations: ["Políticas de cambios dispersas.", "Asesores responden distinto.", "IA sin contexto de catálogo."],
    workflow: [
      { label: "Contenido", detail: "Reunimos políticas, FAQ, productos y procesos." },
      { label: "Entrenamiento", detail: "Se estructura para el agente." },
      { label: "Respuesta", detail: "La IA usa conocimiento aprobado." },
      { label: "Mejora", detail: "Las dudas frecuentes alimentan nuevas reglas." },
    ],
    capabilities: ["FAQ centralizado.", "Políticas de soporte.", "Tono de marca.", "Escalamiento humano."],
    related: [
      { label: "Agente IA soporte", href: "/agente-ia-soporte-clientes-whatsapp" },
      { label: "Agente IA ventas", href: "/agente-ia-ventas-whatsapp" },
      { label: "Módulo CRM", href: "/modulo-crm" },
    ],
  },
];

export const ADDITIONAL_SEO_FEATURE_PAGES: MarketingPageDetail[] = additionalSolutions.map((page) => ({
  kind: "solution",
  priority: page.priority,
  slug: page.slug,
  path: `/${page.slug}`,
  title: page.title,
  description: page.description,
  eyebrow: `Solución SEO / ${page.moduleName}`,
  h1: page.h1,
  lead: page.lead,
  moduleId: page.moduleId,
  moduleName: page.moduleName,
  searchIntent: page.searchIntent,
  colombiaUseCase: page.colombiaUseCase,
  heroMetric: page.heroMetric ?? page.priority,
  heroMetricLabel: page.heroMetricLabel ?? "flujo Binah",
  proof: page.proof,
  situations: page.situations,
  workflow: page.workflow,
  capabilities: page.capabilities,
  faqs: page.faqs ?? commonFaqs(page.title.replace(" — Binah", "").toLowerCase(), page.moduleName),
  related: page.related,
  sources: page.sources,
  disclaimer: page.disclaimer,
  sitemapPriority: page.priority === "P1" ? "0.8" : "0.68",
  changefreq: "weekly",
}));

export const ALL_SEO_FEATURE_PAGES = [...SEO_FEATURE_PAGES, ...ADDITIONAL_SEO_FEATURE_PAGES];
export const ALL_MARKETING_PAGE_DETAILS = [...MODULE_PAGE_DETAILS, ...ALL_SEO_FEATURE_PAGES];

export const FEATURED_SOLUTIONS = ALL_SEO_FEATURE_PAGES.filter((page) => page.priority === "P0");

export function getMarketingPageBySlug(slug: string): MarketingPageDetail | undefined {
  return ALL_MARKETING_PAGE_DETAILS.find((page) => page.slug === slug);
}

export function getRelatedPages(page: MarketingPageDetail): MarketingPageLink[] {
  const seen = new Set<string>();
  return page.related.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}
