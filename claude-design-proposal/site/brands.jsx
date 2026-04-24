// Brand logos — real files rendered inside a uniform white tile.
// Height is fixed (user sets `size`); width scales to each brand's aspect ratio
// so wordmarks read cleanly while glyph-only logos stay square.

const LOGO_SRC = {
  whatsapp: "assets/logos/whatsapp.svg",
  instagram: "assets/logos/instagram.svg",
  shopify: "assets/logos/shopify.svg",
  woocommerce: "assets/logos/woocommerce.svg",
  wompi: "assets/logos/wompi.svg",
  nequi: "assets/logos/nequi.png",
  epayco: "assets/logos/epayco.png",
  dian: "assets/logos/dian.png",
  coordinadora: "assets/logos/coordinadora.jpg",
};

// Aspect = tile width / tile height. 1 = square tile.
// Set based on each brand's natural wordmark aspect; capped so nothing
// dominates the row.
const TILE_ASPECT = {
  whatsapp: 3.4,          // full wordmark
  instagram: 1,           // glyph-only
  shopify: 1,             // glyph-only bag
  email: 1,
  woocommerce: 2.4,
  wompi: 2.4,
  nequi: 2.0,
  epayco: 2.4,
  dian: 2.4,
  coordinadora: 1,        // square logo (blue 8-mark on white)
  pse: 1.6,
  servientrega: 3.0,
  interrapidisimo: 3.2,
};

// Some logos ship with a lot of whitespace around them; knock that out by
// scaling the image slightly within its tile.
const LOGO_PAD = {
  whatsapp: 0.88,
  instagram: 0.82,
  shopify: 0.72,
  coordinadora: 0.82,
  default: 0.86,
};

// Email has no real logo — keep the SVG glyph.
const EmailGlyph = (
  <svg viewBox="0 0 32 32" width="60%" height="60%" preserveAspectRatio="xMidYMid meet">
    <rect x="3" y="7" width="26" height="18" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="2.2"/>
    <path d="M3 9l13 9 13-9" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinejoin="round"/>
  </svg>
);

// Fixed-height white tile; width follows the brand aspect ratio.
window.BrandTile = function BrandTile({ icon, size = 44 }) {
  const aspect = TILE_ASPECT[icon] || 1;
  const width = Math.round(size * aspect);
  const src = LOGO_SRC[icon];
  const pad = LOGO_PAD[icon] ?? LOGO_PAD.default;
  return (
    <span style={{
      width, height: size,
      display: "inline-grid", placeItems: "center",
      borderRadius: 10,
      background: "#fff",
      border: "1px solid var(--line)",
      flexShrink: 0,
      overflow: "hidden",
      boxSizing: "border-box",
    }}>
      {src ? (
        <img
          src={src}
          alt={icon}
          style={{
            width: `${pad * 100}%`,
            height: `${pad * 100}%`,
            objectFit: "contain",
            display: "block",
          }}
        />
      ) : icon === "email" ? EmailGlyph : null}
    </span>
  );
};

window.LogoPill = function LogoPill({ icon }) {
  return <BrandTile icon={icon} size={44} />;
};

window.BrandTileRow = function BrandTileRow({ icons, size = 32 }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {icons.map(ic => <BrandTile key={ic} icon={ic} size={size} />)}
    </div>
  );
};

// Tailored module glyphs — black lineart, used on module cards.
window.ModuleGlyph = function ModuleGlyph({ id, size = 26 }) {
  const s = size;
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const glyphs = {
    crm: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <path {...stroke} d="M3 17h6l2 2h6l2-2h6"/>
        <path {...stroke} d="M3 17V7a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v10v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4Z"/>
        <circle cx="10" cy="11" r="1.2" fill="currentColor" stroke="none"/>
        <circle cx="14" cy="11" r="1.2" fill="currentColor" stroke="none"/>
        <circle cx="18" cy="11" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
    retail: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <path {...stroke} d="M6 9h16l-1.5 14a2 2 0 0 1-2 1.8H9.5a2 2 0 0 1-2-1.8L6 9Z"/>
        <path {...stroke} d="M10 9V6a4 4 0 0 1 8 0v3"/>
      </svg>
    ),
    facturacion: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <path {...stroke} d="M7 3h10l5 5v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/>
        <path {...stroke} d="M17 3v5h5"/>
        <path {...stroke} d="M9 16l3 3 6-6"/>
      </svg>
    ),
    contabilidad: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <circle cx="14" cy="14" r="9" {...stroke}/>
        <path {...stroke} d="M14 5v9h9"/>
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <path {...stroke} d="M5 5h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-8l-5 4v-4H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z"/>
        <path {...stroke} d="M9 10h8M9 15h6"/>
      </svg>
    ),
    operaciones: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <rect x="3" y="5" width="22" height="19" rx="2" {...stroke}/>
        <path {...stroke} d="M3 11h22M9 3v4M19 3v4"/>
        <circle cx="17" cy="17" r="3" {...stroke}/>
        <path {...stroke} d="M17 15v2l1.5 1"/>
      </svg>
    ),
    tareas: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <rect x="3" y="4" width="22" height="20" rx="2" {...stroke}/>
        <path {...stroke} d="M7 9l2 2 4-4"/>
        <path {...stroke} d="M15 9h6"/>
        <path {...stroke} d="M7 17l2 2 4-4"/>
        <path {...stroke} d="M15 17h6"/>
      </svg>
    ),
    invoice: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <rect x="3" y="7" width="22" height="14" rx="2" {...stroke}/>
        <path {...stroke} d="M3 12h22"/>
        <path {...stroke} d="M7 17h4"/>
      </svg>
    ),
    reportes: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <path {...stroke} d="M4 22h20"/>
        <rect x="6" y="14" width="4" height="8" {...stroke}/>
        <rect x="12" y="9" width="4" height="13" {...stroke}/>
        <rect x="18" y="5" width="4" height="17" {...stroke}/>
      </svg>
    ),
  };
  return glyphs[id] || glyphs.crm;
};
