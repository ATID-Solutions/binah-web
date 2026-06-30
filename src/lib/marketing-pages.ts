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
  soporte: "/modulo-soporte",
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
    crm: "Unificar WhatsApp, Instagram, email, llamadas y agentes IA para equipos comerciales colombianos.",
    soporte: "Gestionar tickets, responsables, prioridades, SLA e historial completo de atención al cliente.",
    retail: "Centralizar ventas, pedidos, inventario, despachos y tracking en canales digitales y físicos.",
    facturacion: "Emitir documentos electrónicos DIAN conectados con ventas, pagos e inventario.",
    contabilidad: "Controlar proveedores, compras, costos, cartera y conciliaciones desde los datos reales del negocio.",
    chat: "Mover la comunicación interna al mismo lugar donde viven pedidos, clientes y tareas.",
    operaciones: "Coordinar agenda, recursos, servicios, checklists y recordatorios para negocios de servicios.",
    tareas: "Convertir ventas, pedidos y soporte en tareas visibles para cada equipo.",
    invoice: "Cobrar por WhatsApp, PSE, tarjeta o Nequi y reconciliar pagos con facturas y pedidos.",
    reportes: "Ver ventas, conversión, despachos, pagos, soporte y operación en tableros accionables.",
  };

  const moduleSearch: Record<ModuleId, string> = {
    crm: "crm whatsapp colombia, crm instagram, remarketing whatsapp, llamadas desde crm, agentes ia ventas",
    soporte: "software tickets soporte clientes colombia, mesa ayuda ecommerce, soporte postventa whatsapp",
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
    soporte: "Cada solicitud tiene ticket, dueño, prioridad, historial y cierre medible.",
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
      "Organiza códigos EAN, GTIN, SKU y códigos de barras por producto y variante para vender en marketplaces, tienda física y POS en Colombia.",
    eyebrow: "Solución SEO / EAN + GTIN",
    h1: "Códigos EAN listos para operar tu catálogo.",
    lead:
      "Binah te ayuda a conservar el código correcto por producto, variante y empaque para que puedas generar el código de barras y vender con menos fricción.",
    moduleId: "retail",
    moduleName: "Ventas",
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
      "Conexión con ventas, despachos, reportes y páginas de producto.",
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
      { label: "Módulo Ventas", href: "/modulo-retail" },
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
      { label: "Venta", detail: "El pedido nace desde CRM, ventas, POS o tienda online." },
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
      "Conexión con pagos, ventas, facturación y reportes.",
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
    moduleName: "Ventas",
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
    faqs: commonFaqs("despachos con transportadoras colombianas", "Ventas"),
    related: [
      { label: "Módulo Ventas", href: "/modulo-retail" },
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
    moduleName: "Ventas",
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
      { label: "Módulo Ventas", href: "/modulo-retail" },
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
    moduleName: "Ventas",
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
    moduleName: "Ventas",
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
      { label: "Módulo Ventas", href: "/modulo-retail" },
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
    title: "Campañas y remarketing por WhatsApp en Colombia — Binah",
    description:
      "Segmenta clientes antiguos, envía campañas de WhatsApp y convierte remarketing en ventas medibles desde el CRM de Binah.",
    h1: "Remarketing por WhatsApp sin listas sueltas.",
    lead: "Reactiva clientes antiguos, lanza promociones y mide qué conversaciones vuelven a convertirse en venta.",
    moduleId: "crm",
    moduleName: "CRM & Agentes",
    searchIntent: "remarketing whatsapp colombia, campañas whatsapp colombia, mensajes masivos whatsapp clientes",
    colombiaUseCase:
      "Tiendas y servicios que quieren volver a venderle a clientes antiguos sin depender de Excel, pantallazos ni memoria del asesor.",
    proof: "La campaña se conecta al historial del cliente, al segmento correcto y al resultado comercial.",
    situations: ["Promociones de temporada.", "Clientes antiguos sin recompra.", "Recordatorios y confirmaciones."],
    workflow: [
      { label: "Segmento", detail: "Filtras clientes por comportamiento, compra o estado." },
      { label: "Mensaje", detail: "Preparas comunicación alineada al canal." },
      { label: "Conversación", detail: "Las respuestas entran al CRM." },
      { label: "Medición", detail: "Ventas y respuestas quedan en reportes." },
    ],
    capabilities: [
      "Segmentación por historial.",
      "Reactivación de clientes antiguos.",
      "Seguimiento comercial.",
      "Reportes de campaña y recompra.",
    ],
    related: [
      { label: "Remarketing clientes antiguos", href: "/remarketing-clientes-antiguos-whatsapp-colombia" },
      { label: "CRM WhatsApp", href: "/crm-whatsapp-instagram-colombia" },
      { label: "Precios", href: "/precios" },
    ],
  },
  {
    priority: "P1",
    slug: "remarketing-clientes-antiguos-whatsapp-colombia",
    title: "Remarketing para clientes antiguos por WhatsApp — Binah",
    description:
      "Fideliza clientes antiguos, reactiva compradores inactivos y mide recompra con campañas conectadas al CRM, ventas y reportes de Binah.",
    h1: "¿Qué pasa con tus clientes antiguos?",
    lead:
      "Binah siempre los tiene en cuenta: compra, conversación, pedido, soporte y próxima campaña viven en el mismo lugar.",
    moduleId: "crm",
    moduleName: "CRM & Agentes",
    searchIntent: "remarketing whatsapp colombia, fidelizar clientes colombia, clientes antiguos crm",
    colombiaUseCase:
      "Marcas colombianas que ya vendieron por WhatsApp, Instagram o tienda online y necesitan que esos clientes vuelvan a comprar.",
    heroMetric: "CRM",
    heroMetricLabel: "remarketing conectado",
    proof:
      "La plataforma colombiana que también piensa en el remarketing: no sólo atiende el lead nuevo, también cuida el cliente que ya compró.",
    situations: [
      "Clientes que compraron una vez y nunca volvieron.",
      "Bases históricas sin segmento, fecha de recompra ni seguimiento.",
      "Promociones enviadas a todos sin saber quién tiene intención real.",
    ],
    workflow: [
      { label: "Historial", detail: "Binah conserva compras, conversaciones, pedidos y soporte del cliente." },
      { label: "Segmento", detail: "Separas clientes antiguos por producto, fecha, estado o comportamiento." },
      { label: "Campaña", detail: "Envías remarketing por WhatsApp con contexto y oferta relevante." },
      { label: "Recompra", detail: "La respuesta vuelve al CRM y se mide contra ventas, asesor y reporte." },
    ],
    capabilities: [
      "Remarketing por WhatsApp.",
      "Fidelización de clientes antiguos.",
      "Segmentos por historial de compra.",
      "Campañas conectadas a CRM, ventas y reportes.",
      "Seguimiento de recompra y respuesta.",
    ],
    faqs: [
      {
        question: "¿Binah sirve para fidelizar clientes?",
        answer:
          "Sí. Binah cruza historial, compras, conversaciones y campañas para que puedas volver a contactar clientes antiguos con contexto.",
      },
      {
        question: "¿Qué pasa con los clientes antiguos?",
        answer:
          "No quedan perdidos en una lista. Puedes segmentarlos, activar campañas, medir respuesta y continuar la conversación desde el CRM.",
      },
      {
        question: "¿El remarketing depende de Excel?",
        answer:
          "No. La idea es que el segmento salga de los datos reales de Binah: cliente, pedido, canal, asesor, compra y estado.",
      },
      {
        question: "¿Cómo sé si una campaña generó recompra?",
        answer:
          "La campaña queda conectada al CRM y a reportes, para ver conversaciones, oportunidades y ventas asociadas.",
      },
    ],
    related: [
      { label: "Campañas WhatsApp", href: "/campanas-whatsapp-clientes-colombia" },
      { label: "CRM WhatsApp", href: "/crm-whatsapp-instagram-colombia" },
      { label: "Reportes", href: "/modulo-reportes" },
    ],
  },
  {
    priority: "P1",
    slug: "llamadas-celulares-colombia-crm",
    title: "Llamadas a celulares desde CRM en Colombia — Binah",
    description:
      "Haz llamadas a celulares colombianos desde el CRM de Binah con historial, contexto del cliente, número activo y minutos controlados por plan.",
    h1: "Llamadas desde el CRM, con contexto del cliente.",
    lead:
      "Tu equipo puede llamar a celulares colombianos desde Binah y dejar la conversación conectada al cliente, al negocio y al seguimiento comercial.",
    moduleId: "crm",
    moduleName: "CRM & Agentes",
    searchIntent: "crm llamadas celulares colombia, llamadas desde crm, call center crm colombia",
    colombiaUseCase:
      "Equipos comerciales y de soporte que venden por WhatsApp, Instagram o email pero necesitan cerrar, confirmar o resolver por llamada a celular.",
    heroMetric: "120/240 min",
    heroMetricLabel: "incluidos con número activo",
    proof:
      "El consumo queda claro: Starter y Pro incluyen 2 horas por periodo de 28 días, Business incluye 4 horas por periodo, activación del número por $90K COP, mantenimiento de $40K COP por periodo y minuto adicional a $100 COP.",
    disclaimer:
      "Las llamadas consumen minutos facturables. Starter y Pro incluyen 120 minutos por periodo de 28 días a celulares colombianos desde el CRM; Business incluye 240 minutos por periodo. Para activar llamadas necesitas un número, con activación de $90K COP y mantenimiento de $40K COP por periodo. Cada minuto adicional cuesta $100 COP.",
    situations: [
      "Leads que responden mejor cuando el asesor llama después del chat.",
      "Clientes que necesitan confirmar datos, pagos, agenda o dirección por voz.",
      "Gerentes que quieren trazabilidad de llamadas sin depender de celulares personales.",
    ],
    workflow: [
      { label: "Cliente", detail: "El asesor abre el contacto o conversación dentro del CRM." },
      { label: "Llamada", detail: "Marca a un celular colombiano desde el número activo en Binah." },
      { label: "Registro", detail: "La interacción queda asociada al cliente y al contexto comercial." },
      { label: "Seguimiento", detail: "El equipo continúa por WhatsApp, tarea, venta, soporte o reporte." },
    ],
    capabilities: [
      "Llamadas salientes a celulares colombianos desde CRM.",
      "Número para llamadas activable por $90K COP.",
      "Mantenimiento del número por $40K COP por periodo.",
      "120 minutos por periodo incluidos en Starter y Pro con número activo.",
      "240 minutos por periodo incluidos en Business con número activo.",
      "Minuto adicional a $100 COP.",
      "Historial conectado con cliente, asesor y seguimiento.",
    ],
    faqs: [
      {
        question: "¿Todos los planes incluyen llamadas desde el CRM?",
        answer:
          "Sí. Starter y Pro incluyen 120 minutos por periodo de 28 días a celulares colombianos. Business incluye 240 minutos por periodo. Para usarlos debes activar un número.",
      },
      {
        question: "¿Cuánto cuesta el minuto adicional?",
        answer:
          "Cada minuto adicional cuesta $100 COP. Las llamadas consumen minutos facturables, por eso el consumo se comunica separado del precio base del plan.",
      },
      {
        question: "¿El número para llamar se cobra aparte?",
        answer:
          "Sí. Activar el número cuesta $90K COP y mantenerlo activo cuesta $40K COP por periodo de 28 días. El consumo por encima de los minutos incluidos se cobra a $100 COP por minuto.",
      },
      {
        question: "¿Las llamadas reemplazan WhatsApp o Instagram?",
        answer:
          "No. Funcionan como un canal más dentro del CRM para cerrar, confirmar o resolver casos cuando la voz ayuda más que el chat.",
      },
    ],
    related: [
      { label: "CRM WhatsApp", href: "/crm-whatsapp-instagram-colombia" },
      { label: "Módulo CRM", href: "/modulo-crm" },
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
      { label: "Módulo Ventas", href: "/modulo-retail" },
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
    title: "Notas crédito y devoluciones conectadas a ventas — Binah",
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
      { label: "Módulo Ventas", href: "/modulo-retail" },
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
    moduleName: "Ventas",
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
      { label: "Módulo Ventas", href: "/modulo-retail" },
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
    moduleName: "Ventas",
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
      { label: "Módulo Ventas", href: "/modulo-retail" },
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
    colombiaUseCase: "Moda, alimentos, cosmética y manufactura ligera con costos cambiantes.",
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
    proof: "La data viene de CRM, ventas, pagos, facturación y operación en la misma base.",
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
    moduleName: "Ventas",
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
    priority: "P1",
    slug: "calculadora-ahorro-operativo-ecommerce",
    title: "Calculadora de ahorro operativo para e-commerce — Binah",
    description:
      "Estima horas liberadas al conectar pedidos, despachos, facturación, WhatsApp e inventario en una operación e-commerce.",
    h1: "Calcula cuánto tiempo pierde tu operación manual.",
    lead:
      "Ajusta pedidos por día y minutos manuales. Binah calcula el ahorro usando ~2 minutos por pedido/despacho y ~10 segundos por factura.",
    moduleId: "reportes",
    moduleName: "Reportes",
    searchIntent: "ahorro operativo ecommerce, automatizar pedidos ecommerce, calcular tiempo pedidos",
    colombiaUseCase:
      "Marcas colombianas que ya despachan todos los días y quieren saber cuánto tiempo se va en Excel, guías, rótulos, facturación y WhatsApp.",
    heroMetric: "28 días",
    heroMetricLabel: "periodo operativo Binah",
    proof:
      "Con 100 pedidos diarios, una diferencia de minutos por pedido se convierte en cientos de horas por periodo de 28 días.",
    situations: [
      "El equipo copia pedidos desde Shopify, WhatsApp o Excel.",
      "Bodega genera guías y rótulos manualmente.",
      "Contabilidad factura y concilia después de que la operación ya pasó.",
    ],
    workflow: [
      { label: "Volumen", detail: "Ingresas pedidos diarios y periodo operativo." },
      { label: "Tiempo actual", detail: "Ingresas cuánto tarda hoy el equipo en pedido, guía, rótulo y aviso al cliente." },
      { label: "Binah", detail: "El cálculo usa ~2 minutos por pedido/despacho y ~10 segundos por factura." },
      { label: "Ahorro", detail: "Ves horas y jornadas que pueden liberarse cada periodo." },
    ],
    capabilities: [
      "Cálculo por pedidos diarios.",
      "Estimación por periodo de 28 días.",
      "Supuesto fijo de Binah: ~2 minutos por pedido/despacho y ~10 segundos por factura.",
      "Base para comparar costo operativo contra automatización.",
    ],
    faqs: [
      {
        question: "¿El cálculo es exacto?",
        answer:
          "No. Es una estimación operativa para dimensionar el problema. El ahorro real depende del flujo actual, datos disponibles, integraciones y reglas de cada empresa.",
      },
      {
        question: "¿Incluye atención al cliente?",
        answer:
          "La calculadora se enfoca en pedidos y facturación. La atención con IA puede liberar tiempo adicional porque recopila datos, responde preguntas repetidas y escala casos al equipo humano.",
      },
      {
        question: "¿Por qué se calcula en 28 días?",
        answer:
          "Binah trabaja con periodos de facturación de 28 días, por eso el cálculo usa ese periodo para comparar volumen, horas y jornadas.",
      },
    ],
    related: [
      { label: "Shopify Colombia", href: "/software-shopify-colombia-crm-inventario" },
      { label: "Coordinadora", href: "/integracion-coordinadora-ecommerce-colombia" },
      { label: "SIIGO", href: "/integracion-siigo-facturacion-automatica" },
    ],
  },
  {
    priority: "P1",
    slug: "integracion-coordinadora-ecommerce-colombia",
    title: "Integración con Coordinadora para e-commerce en Colombia — Binah",
    description:
      "Conecta pedidos, guías, rótulos, novedades, tracking y notificaciones de Coordinadora con CRM, inventario y WhatsApp.",
    h1: "Coordinadora conectada al pedido, no a una tarea manual.",
    lead:
      "Guías, rótulos, estados, novedades y tracking deben salir del flujo operativo, no de copiar datos entre pantallas.",
    moduleId: "retail",
    moduleName: "Ventas",
    searchIntent: "integracion coordinadora ecommerce, generar guias coordinadora, tracking coordinadora whatsapp",
    colombiaUseCase:
      "Tiendas online colombianas que despachan con Coordinadora y necesitan menos digitación, menos novedades y más visibilidad del pedido.",
    heroMetric: "Guía + tracking",
    heroMetricLabel: "desde el flujo de pedido",
    proof:
      "El estado logístico queda conectado con cliente, pedido, bodega, asesor, soporte y notificaciones por WhatsApp.",
    situations: [
      "Bodega genera guías una por una.",
      "El cliente pide tracking por WhatsApp porque no recibió actualización.",
      "El equipo no sabe cuántas novedades logísticas tiene por periodo.",
    ],
    workflow: [
      { label: "Pedido", detail: "La venta llega con cliente, dirección, producto, bodega y estado." },
      { label: "Guía", detail: "El equipo prepara guías y rótulos desde datos limpios." },
      { label: "Tracking", detail: "Los estados y novedades alimentan soporte y notificaciones." },
      { label: "Reporte", detail: "La operación ve pendientes, entregas, novedades y tiempos." },
    ],
    capabilities: [
      "Creación masiva de guías.",
      "Generación masiva de rótulos.",
      "Tracking y novedades conectadas al pedido.",
      "Notificaciones por WhatsApp según estado.",
    ],
    related: [
      { label: "Despachos", href: "/software-despachos-transportadoras-colombia" },
      { label: "Tracking WhatsApp", href: "/tracking-pedidos-whatsapp-colombia" },
      { label: "Módulo Ventas", href: "/modulo-retail" },
    ],
  },
  {
    priority: "P1",
    slug: "integracion-siigo-facturacion-automatica",
    title: "Integración SIIGO para facturación automática — Binah",
    description:
      "Conecta pedidos, clientes, productos, facturas, anulaciones, recibos de caja y conciliación operativa con SIIGO.",
    h1: "SIIGO sin volver a digitar la venta.",
    lead:
      "La venta ya tiene cliente, producto, valor, pago y pedido. Binah organiza esos datos para que facturación no trabaje desde cero.",
    moduleId: "facturacion",
    moduleName: "Facturación Electrónica",
    searchIntent: "integracion siigo ecommerce, facturacion automatica siigo, conciliar facturas siigo",
    colombiaUseCase:
      "Equipos contables que facturan pedidos de e-commerce y luego deben conciliar, anular, revisar pagos o generar recibos de caja.",
    heroMetric: "Factura + pago",
    heroMetricLabel: "conectados al pedido",
    proof:
      "El panel de conciliación permite revisar facturas, pagos, anulaciones y recibos sin perseguir comprobantes por chat.",
    disclaimer:
      "El alcance de la integración con SIIGO depende de accesos, permisos, configuración actual y reglas contables de cada empresa.",
    situations: [
      "Un auxiliar tarda varios minutos generando cada factura.",
      "Las anulaciones y recibos se revisan fuera del pedido.",
      "Contabilidad espera reportes manuales para conciliar.",
    ],
    workflow: [
      { label: "Pedido", detail: "Binah conserva cliente, productos, valores, impuestos y pago." },
      { label: "Mapeo", detail: "Se configuran campos, reglas y datos necesarios para facturar." },
      { label: "Factura", detail: "La generación del documento usa la información operativa correcta." },
      { label: "Conciliación", detail: "Facturas, pagos, anulaciones y recibos quedan en revisión." },
    ],
    capabilities: [
      "Configuración y mapeo de datos para SIIGO.",
      "Generación de facturas desde pedidos.",
      "Panel para conciliación de facturas y pagos.",
      "Revisión de anulaciones y recibos de caja.",
    ],
    related: [
      { label: "Facturación DIAN", href: "/facturacion-electronica-dian" },
      { label: "Conciliación de pagos", href: "/conciliacion-pagos-facturas-colombia" },
      { label: "Shopify Colombia", href: "/software-shopify-colombia-crm-inventario" },
    ],
  },
  {
    priority: "P2",
    slug: "reportes-ecommerce-ventas-asesores-bodegas",
    title: "Reportes de ventas, asesores y bodegas para e-commerce — Binah",
    description:
      "Mide tiempos de respuesta, pedidos cerrados por asesor, ventas por bodega, rendimiento de productos y atención al cliente.",
    h1: "Reportes que responden preguntas reales.",
    lead:
      "El problema no es hacer otro dashboard. Es saber qué está pasando sin pedirle a alguien que arme un Excel.",
    moduleId: "reportes",
    moduleName: "Reportes",
    searchIntent: "reportes ecommerce ventas asesores bodegas, dashboard ventas whatsapp",
    colombiaUseCase:
      "Marcas con asesores, bodegas y canales digitales que necesitan ver rendimiento sin esperar cortes manuales.",
    heroMetric: "Ventas + atención",
    heroMetricLabel: "en una vista operativa",
    proof:
      "Cada pedido, conversación, producto y movimiento alimenta reportes disponibles para dirección, ventas, soporte y bodega.",
    situations: [
      "No sabes cuánto tarda cada asesor en responder WhatsApp.",
      "No sabes cuántos pedidos cierra cada asesor.",
      "Los reportes de productos o bodegas se arman manualmente.",
    ],
    workflow: [
      { label: "Dato", detail: "Pedidos, chats, productos, bodegas y usuarios generan eventos." },
      { label: "Cruce", detail: "Binah conecta cliente, asesor, producto, canal y estado." },
      { label: "Vista", detail: "El equipo filtra ventas, atención, inventario y operación." },
      { label: "Decisión", detail: "Gerencia actúa sin esperar un reporte manual." },
    ],
    capabilities: [
      "Tiempos de respuesta por asesor.",
      "Pedidos cerrados por asesor y canal.",
      "Ventas por bodega y producto.",
      "Reportes de atención al cliente y operación.",
    ],
    related: [
      { label: "Módulo Reportes", href: "/modulo-reportes" },
      { label: "CRM WhatsApp", href: "/crm-whatsapp-instagram-colombia" },
      { label: "Ahorro operativo", href: "/calculadora-ahorro-operativo-ecommerce" },
    ],
  },
  {
    priority: "P2",
    slug: "trazabilidad-operativa-pedidos-ecommerce",
    title: "Trazabilidad operativa de pedidos para e-commerce — Binah",
    description:
      "Registra acciones de usuarios y sistema para entender qué pasó con cada cliente, pedido, factura, despacho y conversación.",
    h1: "Cada acción deja rastro.",
    lead:
      "Cuando una operación crece, el control no puede depender de memoria, pantallazos o buscar responsables en chats.",
    moduleId: "retail",
    moduleName: "Ventas",
    searchIntent: "trazabilidad pedidos ecommerce, auditoria pedidos crm, historial acciones usuarios",
    colombiaUseCase:
      "Equipos de ventas, soporte, bodega y administración que necesitan saber quién hizo qué y cuándo en cada pedido.",
    heroMetric: "Historial",
    heroMetricLabel: "por pedido, cliente y usuario",
    proof:
      "Lo que hace el usuario y lo que hace el sistema queda registrado para revisar errores, entrenar equipos y mejorar procesos.",
    situations: [
      "Un pedido cambió de estado y nadie sabe por qué.",
      "Un cliente recibió información distinta entre asesores.",
      "La gerencia necesita auditar acciones sin revisar chats manualmente.",
    ],
    workflow: [
      { label: "Acción", detail: "Usuario, IA o sistema ejecuta un cambio." },
      { label: "Registro", detail: "Binah conserva evento, responsable, fecha y contexto." },
      { label: "Consulta", detail: "El equipo revisa historial por pedido, cliente o flujo." },
      { label: "Mejora", detail: "La operación identifica fallas y ajusta reglas." },
    ],
    capabilities: [
      "Historial completo por pedido.",
      "Registro de acciones de usuarios.",
      "Eventos automáticos del sistema.",
      "Base para auditoría operativa y mejora de procesos.",
    ],
    related: [
      { label: "Reportes e-commerce", href: "/reportes-ecommerce-ventas-asesores-bodegas" },
      { label: "Tracking pedidos", href: "/tracking-pedidos-whatsapp-colombia" },
      { label: "Módulo Ventas", href: "/modulo-retail" },
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
    moduleName: "Ventas",
    searchIntent: "software shopify colombia crm inventario",
    colombiaUseCase: "Tiendas Shopify colombianas que venden por web, WhatsApp e Instagram y necesitan backoffice local.",
    proof: "La tienda online se conecta con lo que ocurre en bodega, soporte, pagos y facturación.",
    situations: [
      "Pedidos de Shopify y WhatsApp separados.",
      "Inventario distinto entre tienda online, bodega y asesores.",
      "Facturación, despacho y notificaciones hechas por fuera del flujo.",
    ],
    workflow: [
      { label: "Tienda", detail: "Shopify recibe pedidos, productos y datos del cliente." },
      { label: "Operación", detail: "Binah cruza inventario, bodega, asesor, pago y despacho." },
      { label: "Cliente", detail: "WhatsApp ve estado, tracking, factura y contexto de soporte." },
      { label: "Reporte", detail: "Ventas web, canales conversacionales y productos se consolidan." },
    ],
    capabilities: [
      "Pedidos, clientes y productos desde Shopify.",
      "Inventario conectado con bodegas y canales de venta.",
      "Despachos, guías, rótulos y tracking.",
      "Facturación, conciliación y reportes operativos.",
    ],
    related: [
      { label: "Inventario conectado", href: "/inventario-conectado-ventas-whatsapp-tienda-online" },
      { label: "Despachos", href: "/software-despachos-transportadoras-colombia" },
      { label: "Coordinadora", href: "/integracion-coordinadora-ecommerce-colombia" },
    ],
  },
  {
    priority: "P1",
    slug: "operacion-ecommerce-colombia",
    title: "Operación e-commerce en Colombia — Binah",
    description:
      "Conecta Shopify, Coordinadora, SIIGO y WhatsApp para operar pedidos, inventario, despachos, facturación y soporte en Colombia.",
    h1: "Shopify vende. Binah opera lo que pasa después.",
    lead:
      "La venta online funciona mejor cuando bodega, transportadora, factura, cliente y reportes avanzan en el mismo flujo.",
    moduleId: "retail",
    moduleName: "Ventas",
    searchIntent: "operacion ecommerce colombia shopify coordinadora siigo whatsapp",
    colombiaUseCase:
      "Marcas colombianas que venden por Shopify, WhatsApp e Instagram y necesitan operar pedidos sin copiar información entre plataformas.",
    heroMetric: "4",
    heroMetricLabel: "piezas críticas conectadas",
    proof:
      "Shopify, Coordinadora, SIIGO y WhatsApp dejan de ser pasos separados y se convierten en una operación conectada de punta a punta.",
    situations: [
      "La tienda vende, pero bodega y facturación reciben la información tarde.",
      "El equipo genera guías, rótulos, facturas y mensajes al cliente en herramientas separadas.",
      "La gerencia no ve ventas, despachos, novedades, inventario y soporte en el mismo lugar.",
    ],
    workflow: [
      { label: "Venta", detail: "Shopify, WhatsApp o Instagram generan el pedido con cliente, productos y canal." },
      { label: "Operación", detail: "Binah cruza inventario, bodega, asesor, factura, pago y despacho." },
      { label: "Cliente", detail: "WhatsApp recibe tracking, novedades, soporte y contexto del pedido." },
      { label: "Control", detail: "Reportes y trazabilidad muestran qué pasó y quién lo gestionó." },
    ],
    capabilities: [
      "Pedidos, productos, clientes e inventario conectados desde Shopify.",
      "Creación masiva de guías, generación masiva de rótulos y tracking con Coordinadora.",
      "Configuración y mapeo de SIIGO para facturación, anulaciones, recibos y conciliación.",
      "Notificaciones, atención y remarketing por WhatsApp con datos del pedido.",
    ],
    faqs: [
      {
        question: "¿Esta página reemplaza el módulo Ventas?",
        answer:
          "No. Es una explicación del flujo e-commerce completo dentro de Ventas: tienda online, bodega, transportadora, facturación, WhatsApp y reportes.",
      },
      {
        question: "¿Binah se conecta con Shopify, Coordinadora y SIIGO al mismo tiempo?",
        answer:
          "Sí. El alcance depende de accesos, reglas actuales y permisos de cada plataforma, pero el objetivo es que esas piezas trabajen como un solo flujo.",
      },
      {
        question: "¿El cliente recibe información automática del pedido?",
        answer:
          "Sí. Binah puede usar eventos del pedido, estados logísticos y reglas internas para enviar notificaciones por WhatsApp y reducir preguntas repetidas.",
      },
    ],
    related: [
      { label: "Módulo Ventas", href: "/modulo-retail" },
      { label: "Shopify + Binah", href: "/software-shopify-colombia-crm-inventario" },
      { label: "Coordinadora", href: "/integracion-coordinadora-ecommerce-colombia" },
      { label: "SIIGO", href: "/integracion-siigo-facturacion-automatica" },
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
    moduleName: "Ventas",
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
      { label: "Módulo Ventas", href: "/modulo-retail" },
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
