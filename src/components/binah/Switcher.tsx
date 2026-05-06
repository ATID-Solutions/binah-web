import { useEffect, useRef, useState } from "react";
import { BINAH_MODULES, MODULE_LOGOS, type ModuleId } from "./modules";
import { BrandTile, type BrandIcon } from "./brands";
import { ModuleMock } from "./mocks";

export default function Switcher() {
  const [active, setActive] = useState<ModuleId>("crm");
  const [tabScroll, setTabScroll] = useState({ canPrev: false, canNext: false });
  const tabsRef = useRef<HTMLDivElement>(null);
  const mod = BINAH_MODULES.find((m) => m.id === active)!;
  const logos = MODULE_LOGOS[active];
  const updateTabScroll = () => {
    const el = tabsRef.current;
    if (!el) return;

    const firstTab = el.querySelector<HTMLElement>(".switcher-tab:first-child");
    const lastTab = el.querySelector<HTMLElement>(".switcher-tab:last-child");
    if (!firstTab || !lastTab) return;

    const containerRect = el.getBoundingClientRect();
    const firstRect = firstTab.getBoundingClientRect();
    const lastRect = lastTab.getBoundingClientRect();

    setTabScroll({
      canPrev: firstRect.left < containerRect.left - 1,
      canNext: lastRect.right > containerRect.right + 1,
    });
  };
  const scrollTabs = (direction: -1 | 1) => {
    const el = tabsRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.72, behavior: "smooth" });
  };

  useEffect(() => {
    updateTabScroll();
    const el = tabsRef.current;
    if (!el) return;

    const onScroll = () => updateTabScroll();
    const onResize = () => updateTabScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="switcher">
      <div className="switcher-hint">
        <span className="switcher-hint-label">Selecciona un módulo</span>
        <span className="switcher-hint-meta">9 disponibles · clic para explorar</span>
      </div>
      <div className="switcher-tabs-wrap">
        {tabScroll.canPrev && (
          <button
            className="switcher-tabs-nav prev"
            type="button"
            aria-label="Ver módulos anteriores"
            onClick={() => scrollTabs(-1)}
          >
            ←
          </button>
        )}
        <div className="switcher-tabs" role="tablist" ref={tabsRef} onScroll={updateTabScroll}>
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
              <span className="switcher-tab-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
        {tabScroll.canNext && (
          <button
            className="switcher-tabs-nav next"
            type="button"
            aria-label="Ver más módulos"
            onClick={() => scrollTabs(1)}
          >
            →
          </button>
        )}
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
