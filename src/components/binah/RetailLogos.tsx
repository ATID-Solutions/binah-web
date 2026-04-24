import { LogoPill, type BrandIcon } from "./brands";

const ITEMS: BrandIcon[] = ["shopify", "woocommerce", "coordinadora"];

export default function RetailLogos() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
      {ITEMS.map((ic) => (
        <LogoPill key={ic} icon={ic} />
      ))}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--mute)",
          padding: "8px 14px",
          border: "1px dashed var(--line)",
          borderRadius: 6,
        }}
      >
        + API abierta
      </span>
    </div>
  );
}
