import type { CSSProperties, ReactNode } from "react";

export type BrandIcon =
  | "whatsapp"
  | "instagram"
  | "shopify"
  | "woocommerce"
  | "wompi"
  | "nequi"
  | "epayco"
  | "dian"
  | "coordinadora"
  | "phone"
  | "email";

const LOGO_SRC: Partial<Record<BrandIcon, string>> = {
  whatsapp: "/logos/whatsapp.png",
  instagram: "/logos/instagram.png",
  shopify: "/logos/shopify.png",
  woocommerce: "/logos/woo.png",
  wompi: "/logos/wompi.png",
  nequi: "/logos/nequi.png",
  epayco: "/logos/epayco.png",
  dian: "/logos/dian.png",
  coordinadora: "/logos/coordinadora.png",
};

// All source PNGs share the same 900×357 aspect (~2.52:1), so every tile uses
// the same dimensions and the same internal padding.
const TILE_ASPECT = 2.52;
const LOGO_PAD = 0.86;

const EmailGlyph = (
  <svg viewBox="0 0 32 32" width="50%" height="50%" preserveAspectRatio="xMidYMid meet">
    <rect x="3" y="7" width="26" height="18" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="2.2" />
    <path d="M3 9l13 9 13-9" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
);

const PhoneGlyph = (
  <svg viewBox="0 0 32 32" width="50%" height="50%" preserveAspectRatio="xMidYMid meet">
    <path
      d="M10.2 5.8 7.6 8.4c-.8.8-1 2-.5 3 3 7 6.5 10.5 13.5 13.5 1 .4 2.2.2 3-.5l2.6-2.6-5.2-5.2-2.7 2.7c-2.5-1.4-4.2-3.1-5.6-5.6l2.7-2.7-5.2-5.2Z"
      fill="none"
      stroke="#1a1a1a"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function BrandTile({ icon, size = 44 }: { icon: BrandIcon; size?: number }) {
  const width = Math.round(size * TILE_ASPECT);
  const src = LOGO_SRC[icon];
  return (
    <span
      style={{
        width,
        height: size,
        display: "inline-grid",
        placeItems: "center",
        borderRadius: 6,
        background: "#fff",
        border: "1px solid var(--line)",
        flexShrink: 0,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={icon}
          style={{
            width: `${LOGO_PAD * 100}%`,
            height: `${LOGO_PAD * 100}%`,
            objectFit: "contain",
            display: "block",
          }}
        />
      ) : icon === "email" ? (
        EmailGlyph
      ) : icon === "phone" ? (
        PhoneGlyph
      ) : null}
    </span>
  );
}

export function LogoPill({ icon }: { icon: BrandIcon }) {
  return <BrandTile icon={icon} size={44} />;
}

export function BrandTileRow({ icons, size = 32 }: { icons: BrandIcon[]; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {icons.map((ic) => (
        <BrandTile key={ic} icon={ic} size={size} />
      ))}
    </div>
  );
}

export function ModuleGlyph({ id, size = 26 }: { id: string; size?: number }) {
  const s = size;
  const stroke: CSSProperties = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const glyphs: Record<string, ReactNode> = {
    crm: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <path style={stroke} d="M3 17h6l2 2h6l2-2h6" />
        <path style={stroke} d="M3 17V7a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v10v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4Z" />
        <circle cx="10" cy="11" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="14" cy="11" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="18" cy="11" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
    soporte: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <path style={stroke} d="M5 5h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        <path style={stroke} d="M8 10h8M8 15h12" />
        <path style={stroke} d="M8 20h6" />
        <circle cx="21" cy="10" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    ),
    retail: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <path style={stroke} d="M6 9h16l-1.5 14a2 2 0 0 1-2 1.8H9.5a2 2 0 0 1-2-1.8L6 9Z" />
        <path style={stroke} d="M10 9V6a4 4 0 0 1 8 0v3" />
      </svg>
    ),
    facturacion: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <path style={stroke} d="M7 3h10l5 5v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path style={stroke} d="M17 3v5h5" />
        <path style={stroke} d="M9 16l3 3 6-6" />
      </svg>
    ),
    contabilidad: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <circle cx="14" cy="14" r="9" style={stroke} />
        <path style={stroke} d="M14 5v9h9" />
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <path style={stroke} d="M5 5h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-8l-5 4v-4H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" />
        <path style={stroke} d="M9 10h8M9 15h6" />
      </svg>
    ),
    operaciones: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <rect x="3" y="5" width="22" height="19" rx="2" style={stroke} />
        <path style={stroke} d="M3 11h22M9 3v4M19 3v4" />
        <circle cx="17" cy="17" r="3" style={stroke} />
        <path style={stroke} d="M17 15v2l1.5 1" />
      </svg>
    ),
    tareas: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <rect x="3" y="4" width="22" height="20" rx="2" style={stroke} />
        <path style={stroke} d="M7 9l2 2 4-4" />
        <path style={stroke} d="M15 9h6" />
        <path style={stroke} d="M7 17l2 2 4-4" />
        <path style={stroke} d="M15 17h6" />
      </svg>
    ),
    invoice: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <rect x="3" y="7" width="22" height="14" rx="2" style={stroke} />
        <path style={stroke} d="M3 12h22" />
        <path style={stroke} d="M7 17h4" />
      </svg>
    ),
    reportes: (
      <svg viewBox="0 0 28 28" width={s} height={s}>
        <path style={stroke} d="M4 22h20" />
        <rect x="6" y="14" width="4" height="8" style={stroke} />
        <rect x="12" y="9" width="4" height="13" style={stroke} />
        <rect x="18" y="5" width="4" height="17" style={stroke} />
      </svg>
    ),
  };
  return <>{glyphs[id] ?? glyphs.crm}</>;
}
