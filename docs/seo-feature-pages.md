# Backlog SEO por feature de Binah

Objetivo: crear una pagina publica por problema concreto que una empresa colombiana puede estar buscando resolver. La pagina debe vender la capacidad de Binah sin sonar generica: cada una debe aterrizar el dolor en canales, entidades y flujos conocidos en Colombia.

## Criterio editorial

- Cada pagina debe tener un slug enfocado en busqueda, no en nombre interno del modulo.
- Cada pagina debe enlazar al modulo padre, a precios, a demo por WhatsApp y a 2 o 3 paginas relacionadas.
- Cada pagina debe incluir FAQ corto con schema `FAQPage` y, cuando aplique, `SoftwareApplication` o `Product`.
- No afirmar integraciones o alianzas que no existan. Usar frases como "para operar canales como..." cuando solo sea caso de uso.
- Para EAN/GTIN, separar con precision: Binah puede gestionar/asignar codigos a productos, pero los GTIN oficiales para retail y marketplaces deben venir de GS1 Colombia o del prefijo GS1 del cliente.

## Paginas prioritarias

| Prioridad | Feature / pagina | Slug sugerido | Intencion de busqueda | Caso colombiano | Modulo padre | Enlaces internos |
| --- | --- | --- | --- | --- | --- | --- |
| P0 | Codigos EAN / GTIN para productos | `/codigos-ean-productos-colombia` | "codigo ean colombia", "gtin productos colombia", "codigo de barras para vender en retail" | Preparar productos para Falabella, Exito, Carulla, Olimpica, Mercado Libre, Rappi y grandes superficies. Explicar que Binah ayuda a organizar el catalogo y entregar el codigo correcto para generar el codigo de barras. | Retail + Catalogo | Retail, Facturacion, Reportes, Precios |
| P0 | Facturacion electronica DIAN automatica | `/facturacion-electronica-dian` | "software facturacion electronica dian", "factura electronica colombia" | Venta por WhatsApp o tienda online que genera factura, nota credito y trazabilidad DIAN sin cambiar de sistema. | Facturacion | CRM, Retail, Pagos, Precios |
| P0 | CRM para WhatsApp, Instagram y email | `/crm-whatsapp-instagram-colombia` | "crm whatsapp colombia", "crm instagram whatsapp" | Equipos de ventas en Colombia que atienden por WhatsApp e Instagram y pierden conversaciones entre asesores. | CRM | Agente ventas, Campanas WhatsApp, Precios |
| P0 | Agente IA de ventas por WhatsApp | `/agente-ia-ventas-whatsapp` | "chatbot whatsapp ventas", "agente ia whatsapp colombia" | Negocios que venden por WhatsApp, califican leads y envian link de pago sin esperar a un asesor. | CRM + Pagos | CRM, Links de pago, Reportes |
| P0 | Despachos con transportadoras colombianas | `/software-despachos-transportadoras-colombia` | "software despachos colombia", "generar guias servientrega coordinadora" | Bodega que genera guias para Servientrega, Coordinadora, Interrapidisimo y notifica al cliente por WhatsApp. | Retail | Retail, Tracking, Inventario |
| P0 | Links de pago por WhatsApp | `/links-de-pago-whatsapp-colombia` | "link de pago whatsapp", "cobrar por whatsapp colombia" | Enviar cobros por WhatsApp con PSE, tarjeta, Nequi, Wompi/ePayco y conciliarlos con factura. | Pagos | CRM, Facturacion, Reportes |

## Paginas long-tail de alto valor

| Prioridad | Feature / pagina | Slug sugerido | Intencion de busqueda | Caso colombiano | Modulo padre | Enlaces internos |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | Catalogo de productos con variantes | `/catalogo-productos-variantes-sku-ean` | "sku vs ean", "catalogo productos variantes" | Camiseta negra talla M, pack x6, caja x12: cada variante con SKU, EAN/GTIN y stock claro. | Retail | EAN, Inventario, Shopify/Woo |
| P1 | Inventario conectado a ventas | `/inventario-conectado-ventas-whatsapp-tienda-online` | "inventario tienda online whatsapp", "control inventario ventas" | Evitar sobreventa cuando entran pedidos por WhatsApp, Shopify, WooCommerce y asesores. | Retail | CRM, Despachos, Reportes |
| P1 | Tracking y notificaciones por WhatsApp | `/tracking-pedidos-whatsapp-colombia` | "notificaciones whatsapp pedidos", "tracking pedidos whatsapp" | Cliente recibe estado de pedido: recibido, empacado, en ruta, entregado. | Retail + CRM | Despachos, CRM, Soporte |
| P1 | Agente IA de soporte | `/agente-ia-soporte-clientes-whatsapp` | "chatbot soporte whatsapp", "ia soporte clientes colombia" | Resolver "donde esta mi pedido", cambios, devoluciones y preguntas frecuentes sin saturar asesores. | CRM | Tracking, Retail, Knowledge base |
| P1 | Agente IA de reservas y citas | `/agente-ia-reservas-citas-whatsapp` | "chatbot reservas whatsapp", "agenda citas whatsapp" | Peluquerias, clinicas esteticas, consultorios, talleres y servicios que agendan por WhatsApp. | CRM + Operaciones | Agenda, Operaciones, Precios |
| P1 | Campanas masivas de WhatsApp | `/campanas-whatsapp-clientes-colombia` | "campanas whatsapp colombia", "mensajes masivos whatsapp clientes" | Reactivar clientes, lanzar promos, confirmar asistencia y segmentar listas sin Excel. | CRM | CRM, Reportes, Precios |
| P1 | POS y documento equivalente electronico | `/pos-documento-equivalente-electronico-dian` | "pos electronico dian", "documento equivalente electronico colombia" | Comercios que venden en mostrador y necesitan identificar productos, ventas y requisitos del POS electronico. | Facturacion + Retail | Facturacion, EAN, Inventario |
| P1 | Notas credito y devoluciones | `/notas-credito-devoluciones-dian-retail` | "nota credito dian devolucion", "devoluciones factura electronica" | Cambios de talla, devoluciones de e-commerce y ajustes que impactan inventario y DIAN. | Facturacion + Retail | Facturacion, Retail, Soporte |
| P1 | Conciliacion de pagos y facturas | `/conciliacion-pagos-facturas-colombia` | "conciliar pagos facturas", "conciliacion wompi epayco nequi" | Cruce automatico entre pagos por PSE/Nequi/tarjeta, factura electronica y pedido. | Pagos + Contabilidad | Links de pago, Facturacion, Reportes |
| P1 | Importacion de datos desde otras herramientas | `/migrar-clientes-productos-facturas-binah` | "migrar datos crm", "importar productos facturacion" | Pasar clientes, productos, facturas y conversaciones desde Excel, Shopify, WooCommerce u otro CRM. | Plataforma | Modulos, Precios, CRM |

## Paginas generales por modulo

Estas ya existen parcialmente o estan definidas en `src/components/binah/modules.ts`; conviene completarlas para que cada modulo tenga pagina propia antes de escalar el blog SEO.

| Prioridad | Pagina | Slug sugerido | Estado actual | Enfoque |
| --- | --- | --- | --- | --- |
| P0 | CRM & Agentes | `/modulo-crm` | Existe | Fortalecer enlaces a paginas long-tail: agente ventas, soporte, reservas, campanas, CRM WhatsApp. |
| P0 | Retail | `/modulo-retail` | Existe | Fortalecer enlaces a EAN, inventario, despachos, tracking, Shopify/WooCommerce. |
| P1 | Facturacion electronica | `/modulo-facturacion-electronica` | Falta pagina | DIAN, factura, nota credito/debito, documento soporte, documento equivalente. |
| P1 | Pagos | `/modulo-pagos` | Falta pagina | Links de pago, cobros recurrentes, PSE, tarjetas, Nequi, conciliacion. |
| P1 | Operaciones y agenda | `/modulo-operaciones` | Falta pagina | Agenda multi-recurso, asignacion, servicios, recordatorios, checklists. |
| P2 | Contabilidad | `/modulo-contabilidad` | Falta pagina | Ordenes de compra, proveedores, costos, conciliaciones. |
| P2 | Reportes | `/modulo-reportes` | Falta pagina | Ventas, conversion, despachos, cartera, exportes Excel/PDF. |
| P2 | Tareas | `/modulo-tareas` | Falta pagina | Kanban, prioridades, tareas disparadas por ventas, bodega y soporte. |
| P2 | Chat interno | `/modulo-chat-interno` | Falta pagina | Canales por area, hilos, archivos, trabajo del equipo dentro de Binah. |

## Paginas nicho adicionales

| Prioridad | Feature / pagina | Slug sugerido | Por que puede atraer trafico |
| --- | --- | --- | --- |
| P2 | Generador de guias y etiquetas de envio | `/generar-guias-etiquetas-envio-colombia` | Busqueda operacional de bodegas pequenas que ya venden online. |
| P2 | Picking y packing para e-commerce | `/picking-packing-ecommerce-colombia` | Pain claro en tiendas Shopify/WooCommerce que crecen y se desordenan. |
| P2 | Gestion de proveedores y ordenes de compra | `/ordenes-compra-proveedores-colombia` | Long-tail B2B para pymes con compras recurrentes. |
| P2 | Costeo por producto | `/costeo-productos-inventario-colombia` | Alto valor para retail, manufactura ligera, alimentos, cosmetica y moda. |
| P2 | Exportes Excel/PDF de reportes | `/reportes-excel-pdf-negocio-colombia` | Busqueda practica de dueños y contadores que necesitan informacion fuera del sistema. |
| P2 | CRM para negocios de servicios | `/crm-negocios-servicios-agenda-whatsapp` | Une CRM, reservas, agenda y recordatorios para salud, belleza, educacion y consultoria. |
| P2 | CRM para tiendas de ropa | `/crm-inventario-tienda-ropa-colombia` | Caso colombiano tangible: tallas, colores, cambios, inventario y WhatsApp. |
| P2 | Software para tiendas Shopify en Colombia | `/software-shopify-colombia-crm-inventario` | Intencion alta para tiendas que usan Shopify pero necesitan CRM, factura y despacho local. |
| P2 | Software para WooCommerce en Colombia | `/software-woocommerce-colombia-crm-facturacion` | Similar a Shopify, mas PYME y WordPress. |
| P2 | Knowledge base para agente IA | `/base-conocimiento-agente-ia-soporte` | Ayuda a explicar entrenamiento de IA y reduce miedo a respuestas inventadas. |

## Arquitectura de enlaces

- Home debe enlazar a 6 paginas P0 bajo una seccion "Soluciones por problema".
- `/modulos` debe enlazar a todas las paginas de modulo y a las P0/P1 mas relacionadas.
- `/modulo-retail` debe enlazar a EAN/GTIN, inventario, despachos, tracking, Shopify y WooCommerce.
- `/modulo-crm` debe enlazar a CRM WhatsApp, agente ventas, agente soporte, agente reservas y campanas.
- `/precios` debe enlazar a las P0 desde las FAQ, especialmente CRM, IA, campanas y pagos.
- Footer debe tener una columna "Soluciones" con 6 enlaces maximos: EAN, Facturacion DIAN, CRM WhatsApp, Agente IA, Despachos, Links de pago.
- Sitemap debe incluir todas las paginas publicadas desde `src/lib/seo.ts`.

## Estructura recomendada para cada pagina

1. Hero con problema concreto y CTA a WhatsApp.
2. Seccion "Cuando lo necesitas" con ejemplos colombianos reales del flujo.
3. Seccion "Como lo resuelve Binah" conectada al modulo padre.
4. Seccion de flujo operacional en 3 a 5 pasos.
5. Seccion de integraciones/canales si aplica.
6. FAQ SEO con 4 a 6 preguntas.
7. CTA final a demo y enlaces a paginas relacionadas.

## Notas de diseno

Visual thesis: editorial, sobrio, de alto contraste, con composiciones de producto y datos operativos; debe sentirse como una herramienta seria para negocios colombianos, no como landing generica SaaS.

Content plan: cada pagina debe abrir con el feature como señal principal, sostener con el caso colombiano, profundizar en flujo operativo y cerrar con demo.

Interaction thesis: entrada sutil del hero, flujo sticky o horizontal para explicar procesos, hover/reveal sobre pasos o preguntas; evitar mosaicos de cards sin jerarquia.

## Fuentes externas revisadas

- [GS1 Colombia - Codigo de barras en Colombia para vender en retail y marketplaces](https://gs1co.org/).
- [GS1 Colombia - Que es el codigo GTIN](https://gs1co.org/soluciones/identificacion/numeros-globales-de-identificacion-de-productos-gtin).
- [GS1 Colombia - Codigo EAN/UPC](https://gs1co.org/soluciones/captura-de-informacion/codigo-ean-upc).
- [GS1 Colombia - Estandares GS1 exigidos por cadenas retail en Colombia](https://gs1co.org/blog/que-estandar-gs1-exigen-las-grandes-cadenas-retail-en-colombia-guia-para-proveedores).
- [DIAN - Sistema de Factura Electronica](https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/).
- [DIAN - Documento Equivalente Electronico](https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/documento-equivalente-electronico/).
