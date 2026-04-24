import { useState } from "react";
import { BINAH_MODULES, MODULE_LOGOS, type ModuleId } from "./modules";
import { BrandTile, type BrandIcon } from "./brands";
import { ModuleMock } from "./mocks";

export default function Switcher() {
  const [active, setActive] = useState<ModuleId>("crm");
  const mod = BINAH_MODULES.find((m) => m.id === active)!;
  const logos = MODULE_LOGOS[active];

  return (
    <div className="switcher">
      <div className="switcher-hint">
        <span className="switcher-hint-label">Selecciona un módulo</span>
        <span className="switcher-hint-meta">9 disponibles · clic para explorar</span>
      </div>
      <div className="switcher-tabs" role="tablist">
        {BINAH_MODULES.map((m) => (
          <button
            key={m.id}
            className={`switcher-tab ${active === m.id ? "active" : ""}`}
            onClick={() => setActive(m.id)}
            role="tab"
            aria-selected={active === m.id}
          >
            <span className="idx">{m.num}</span>
            <span className="switcher-tab-name">{m.name}</span>
            <span className="switcher-tab-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className="switcher-body">
        <div className="switcher-left">
          <div className="eyebrow">Módulo {mod.num}</div>
          <h3>{mod.tagline}</h3>
          <p>{mod.description}</p>
          {logos && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {logos.map((ic) => (
                <BrandTile key={ic} icon={ic as BrandIcon} size={44} />
              ))}
            </div>
          )}
          <ul>
            {mod.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <div style={{ marginTop: "auto", paddingTop: 12 }}>
            <a href={mod.href} className="btn btn-outline">
              Ver {mod.name} <span className="arrow">→</span>
            </a>
          </div>
        </div>
        <div className="switcher-right">
          <ModuleMock id={mod.id} />
        </div>
      </div>
    </div>
  );
}
