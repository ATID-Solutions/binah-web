import { BrandTile, type BrandIcon } from "./brands";

const ITEMS: BrandIcon[] = ["whatsapp", "instagram", "dian", "shopify", "wompi", "coordinadora"];

export default function HeroLogos() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          color: "var(--mute)",
          textTransform: "uppercase",
        }}
      >
        Conectado con las herramientas que ya usas
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        {ITEMS.map((ic) => (
          <BrandTile key={ic} icon={ic} size={44} />
        ))}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--mute)",
            padding: "0 14px",
            height: 44,
            display: "inline-flex",
            alignItems: "center",
            border: "1px dashed var(--line)",
            borderRadius: 6,
            textTransform: "uppercase",
          }}
        >
          + y muchas más
        </span>
      </div>
    </div>
  );
}
