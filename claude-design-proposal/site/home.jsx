// Home page — hero switcher + module grid + tweaks
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "headline": "default",
  "density": "comfortable"
}/*EDITMODE-END*/;

const HEADLINES = {
  default: { line1: "Vende más.", line2: "Opera mejor.", line3: "1 plataforma." },
  os: { line1: "Una plataforma.", line2: "Todo tu", line3: "negocio." },
  stop: { line1: "Deja de pagar", line2: "por ocho herramientas.", line3: "Usa una." },
  every: { line1: "La plataforma", line2: "de los negocios", line3: "colombianos." },
};

// Per-module logo sets (only real brands we have logos for)
const MODULE_LOGOS = {
  crm: ["whatsapp", "instagram", "email"],
  retail: ["shopify", "woocommerce", "coordinadora"],
  facturacion: ["dian"],
  invoice: ["wompi", "epayco", "nequi"],
};

function ModuleLogoRow({ id }) {
  const icons = MODULE_LOGOS[id];
  if (!icons) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
      {icons.map(ic => <LogoPill key={ic} icon={ic} />)}
    </div>
  );
}

function HeroLogos() {
  const items = ["whatsapp","instagram","dian","shopify","wompi","nequi"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--mute)", textTransform: "uppercase" }}>
        Conectado con las herramientas que ya usas
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        {items.map(ic => <LogoPill key={ic} icon={ic} />)}
      </div>
    </div>
  );
}

function Switcher() {
  const [active, setActive] = useState("crm");
  const mod = window.BINAH_MODULES.find(m => m.id === active);
  return (
    <div className="switcher">
      <div className="switcher-tabs" role="tablist">
        {window.BINAH_MODULES.map(m => (
          <button
            key={m.id}
            className={`switcher-tab ${active === m.id ? "active" : ""}`}
            onClick={() => setActive(m.id)}
            role="tab"
            aria-selected={active === m.id}
          >
            <span className="idx">{m.num}</span>
            <span>{m.name}</span>
          </button>
        ))}
      </div>
      <div className="switcher-body">
        <div className="switcher-left">
          <div className="eyebrow">Módulo {mod.num}</div>
          <h3>{mod.tagline}</h3>
          <p>{mod.description}</p>
          <ModuleLogoRow id={mod.id} />
          <ul>
            {mod.features.map((f,i) => <li key={i}>{f}</li>)}
          </ul>
          <div style={{ marginTop: "auto", paddingTop: 12 }}>
            <a href={mod.href} className="btn btn-outline">Ver {mod.name} <span className="arrow">→</span></a>
          </div>
        </div>
        <div className="switcher-right">
          <ModuleMock id={mod.id} />
        </div>
      </div>
    </div>
  );
}

function ModuleGrid() {
  return (
    <div className="module-grid">
      {window.BINAH_MODULES.map(m => (
        <a key={m.id} href={m.href} className="module-card">
          <div className="num">MÓDULO {m.num}</div>
          <div className="arrow-link">↗</div>
          <div className="module-icon">
            <ModuleGlyph id={m.id} size={26} />
          </div>
          <h3>{m.name}</h3>
          <p>{m.short}. {m.tagline}</p>
          {MODULE_LOGOS[m.id] && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginTop: 4 }}>
              {MODULE_LOGOS[m.id].slice(0, 4).map(ic => (
                <BrandTile key={ic} icon={ic} size={24} />
              ))}
            </div>
          )}
        </a>
      ))}
    </div>
  );
}

function FlowDiagram() {
  const steps = [
    { label: "Cliente escribe", detail: "WhatsApp · Instagram · Email" },
    { label: "Agente responde", detail: "Ventas · Soporte · Reservas" },
    { label: "Pedido creado", detail: "Retail + inventario" },
    { label: "Factura DIAN", detail: "Emitida y firmada" },
    { label: "Despacho", detail: "Etiqueta + tracking" },
    { label: "Contabilidad", detail: "Registrado automático" },
  ];
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 20, padding: 40, background: "var(--bg-alt)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, alignItems: "stretch" }}>
        {steps.map((s,i) => (
          <div key={i} style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 12, padding: 20, position: "relative", minHeight: 140, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--mute)", letterSpacing: "0.1em" }}>0{i+1}</div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.1 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 6 }}>{s.detail}</div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)", zIndex: 2, background: "var(--bg-alt)", padding: "2px 4px", fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--mute)" }}>→</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--mute)", letterSpacing: "0.08em" }}>
        <span>TIEMPO TOTAL</span>
        <span>~ 8 SEGUNDOS · 0 INTERVENCIÓN HUMANA</span>
      </div>
    </div>
  );
}

function Tweaks() {
  const { values, set } = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", values.theme);
    try { localStorage.setItem("binah-theme", values.theme); } catch (e) {}
  }, [values.theme]);

  useEffect(() => {
    const h = HEADLINES[values.headline] || HEADLINES.default;
    const el = document.querySelector(".hero h1");
    if (el) {
      el.innerHTML = `${h.line1}<br /><em>${h.line2}</em><br />${h.line3}`;
    }
  }, [values.headline]);

  useEffect(() => {
    const grid = document.querySelector(".module-grid");
    if (grid) grid.style.gridTemplateColumns = values.density === "dense" ? "repeat(4, 1fr)" : "repeat(3, 1fr)";
  }, [values.density]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Apariencia">
        <TweakRadio label="Tema" value={values.theme} options={[{value:"light",label:"Claro"},{value:"dark",label:"Oscuro"}]} onChange={v=>set("theme",v)} />
      </TweakSection>
      <TweakSection title="Hero">
        <TweakSelect label="Titular" value={values.headline} options={[
          {value:"default",label:"Vendan más (default)"},
          {value:"os",label:"Sistema operativo"},
          {value:"stop",label:"Deja de pagar por ocho"},
          {value:"every",label:"Una plataforma. Cada módulo."},
        ]} onChange={v=>set("headline",v)} />
      </TweakSection>
      <TweakSection title="Módulos">
        <TweakRadio label="Densidad" value={values.density} options={[{value:"comfortable",label:"3 col"},{value:"dense",label:"4 col"}]} onChange={v=>set("density",v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

// Mount
function mount(id, Comp) {
  const el = document.getElementById(id);
  if (el) ReactDOM.createRoot(el).render(<Comp />);
}

function mountAll() {
  mount("hero-logos", HeroLogos);
  mount("switcher-root", Switcher);
  mount("module-grid-root", ModuleGrid);
  mount("flow-root", FlowDiagram);
  mount("tweaks-slot", Tweaks);
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountAll);
} else {
  mountAll();
}
