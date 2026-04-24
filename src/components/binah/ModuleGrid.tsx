import { BINAH_MODULES, MODULE_LOGOS } from "./modules";
import { BrandTile, ModuleGlyph, type BrandIcon } from "./brands";

export default function ModuleGrid() {
  return (
    <div className="module-grid">
      {BINAH_MODULES.map((m) => {
        const logos = MODULE_LOGOS[m.id];
        return (
          <a key={m.id} href={m.href} className="module-card">
            <div className="num">MÓDULO {m.num}</div>
            <div className="arrow-link">↗</div>
            <div className="module-icon">
              <ModuleGlyph id={m.id} size={26} />
            </div>
            <h3>{m.name}</h3>
            <p>
              {m.short}. {m.tagline}
            </p>
            {logos && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginTop: 4 }}>
                {logos.slice(0, 4).map((ic) => (
                  <BrandTile key={ic} icon={ic as BrandIcon} size={24} />
                ))}
              </div>
            )}
          </a>
        );
      })}
    </div>
  );
}
