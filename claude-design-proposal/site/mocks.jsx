// Stylized dashboard mocks — abstract, not real UI
const { useMemo } = React;

function Bar({ w = 50, style }) {
  return <div className="mock-bar" style={{ "--w": `${w}%`, ...style }} />;
}

function Row({ children, highlight, style }) {
  return <div className={`mock-row ${highlight ? "highlight" : ""}`} style={style}>{children}</div>;
}

function WindowFrame({ title, children, style }) {
  return (
    <div className="mock-window" style={style}>
      <div className="mock-window-header">
        <div className="mock-dot"></div>
        <div className="mock-dot"></div>
        <div className="mock-dot"></div>
        <span style={{ marginLeft: 10 }}>{title}</span>
      </div>
      <div className="mock-window-body">{children}</div>
    </div>
  );
}

function MockCRM() {
  return (
    <div className="mock">
      <WindowFrame title="binah.app / inbox" style={{ top: 0, left: 0, width: "64%", bottom: "25%" }}>
        <Row><div className="mock-avatar"></div><div style={{ flex: 1 }}><div style={{ fontWeight: 500 }}>María López</div><div style={{ color: "var(--mute)", fontSize: 11 }}>WhatsApp · hace 2 min</div></div><span className="mock-pill ink">WA</span></Row>
        <Row highlight><div className="mock-avatar ink"></div><div style={{ flex: 1 }}><div style={{ fontWeight: 500 }}>Andrés Ruiz</div><div style={{ opacity: 0.7, fontSize: 11 }}>Instagram DM · ahora</div></div><span className="mock-pill" style={{ background: "#fff", color: "#000", borderColor: "#fff" }}>IG</span></Row>
        <Row><div className="mock-avatar"></div><div style={{ flex: 1 }}><div style={{ fontWeight: 500 }}>compras@acme.co</div><div style={{ color: "var(--mute)", fontSize: 11 }}>Email · hace 8 min</div></div><span className="mock-pill">@</span></Row>
        <Row><div className="mock-avatar"></div><div style={{ flex: 1 }}><div style={{ fontWeight: 500 }}>Lina Vega</div><div style={{ color: "var(--mute)", fontSize: 11 }}>WhatsApp · hace 15 min</div></div><span className="mock-pill">WA</span></Row>
      </WindowFrame>
      <WindowFrame title="agente · ventas" style={{ top: 0, right: 0, width: "32%", height: "48%" }}>
        <div style={{ fontSize: 11, color: "var(--mute)", fontFamily: "var(--font-mono)" }}>CONVERSIÓN 7D</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1 }}>34.2%</div>
        <Bar w={68} />
        <div style={{ fontSize: 11, color: "var(--mute)" }}>+12 vs sem. anterior</div>
      </WindowFrame>
      <WindowFrame title="agente · reservas" style={{ bottom: 0, left: 0, width: "36%", height: "22%" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[1,2,3,4,5,6,7].map(i => <div key={i} style={{ flex: 1, height: 26, borderRadius: 4, background: i === 3 ? "var(--ink)" : "var(--bg-alt)", border: "1px solid var(--line)" }} />)}
        </div>
      </WindowFrame>
      <WindowFrame title="agente · soporte" style={{ bottom: 0, right: 0, width: "60%", height: "22%" }}>
        <Row><span className="mock-pill">✓ resuelto</span><div style={{ flex: 1, fontSize: 11 }}>Cambio talla — Lina V.</div><span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--mute)" }}>3s</span></Row>
      </WindowFrame>
    </div>
  );
}

function MockRetail() {
  return (
    <div className="mock">
      <WindowFrame title="binah.app / pedidos" style={{ top: 0, left: 0, right: 0, height: "55%" }}>
        {[
          { n: "#4821", name: "M. López", status: "En tránsito", w: 70, hl: false },
          { n: "#4822", name: "A. Ruiz", status: "Despachado", w: 40, hl: true },
          { n: "#4823", name: "L. Vega", status: "Empacando", w: 20, hl: false },
        ].map((o,i) => (
          <Row key={i} highlight={o.hl}>
            <span className="mono" style={{ fontSize: 11, opacity: 0.6 }}>{o.n}</span>
            <div style={{ flex: 1, fontWeight: 500 }}>{o.name}</div>
            <Bar w={o.w} style={{ maxWidth: 100 }} />
            <span className="mock-pill" style={o.hl ? { background: "#fff", color: "#000", borderColor: "#fff" } : {}}>{o.status}</span>
          </Row>
        ))}
      </WindowFrame>
      <WindowFrame title="tracking" style={{ bottom: 0, left: 0, width: "48%", top: "60%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "10px 4px" }}>
          {["Recibido","Empacado","Ruta","Entregado"].map((step,i) => (
            <React.Fragment key={i}>
              <div style={{ textAlign: "center", flex: "0 0 auto" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: i <= 2 ? "var(--ink)" : "var(--bg-alt)", border: "1px solid var(--line)", margin: "0 auto 6px" }} />
                <div style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: i <= 2 ? "var(--ink)" : "var(--mute)" }}>{step}</div>
              </div>
              {i < 3 && <div style={{ flex: 1, height: 2, background: i < 2 ? "var(--ink)" : "var(--bg-alt)" }} />}
            </React.Fragment>
          ))}
        </div>
      </WindowFrame>
      <WindowFrame title="transportadoras" style={{ bottom: 0, right: 0, width: "48%", top: "60%" }}>
        <Row><span className="mock-pill ink">SERVIENTREGA</span><span style={{ flex: 1 }}></span><span className="mono" style={{ fontSize: 11 }}>48</span></Row>
        <Row><span className="mock-pill">COORDINADORA</span><span style={{ flex: 1 }}></span><span className="mono" style={{ fontSize: 11 }}>21</span></Row>
      </WindowFrame>
    </div>
  );
}

function MockFact() {
  return (
    <div className="mock">
      <WindowFrame title="factura electrónica · DIAN" style={{ top: 0, left: 0, right: 0, bottom: "42%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "4px 2px 12px", borderBottom: "1px solid var(--line)" }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: "var(--mute)" }}>FACTURA</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em" }}>FEV-001842</div>
          </div>
          <span className="mock-pill ink">✓ DIAN OK</span>
        </div>
        <Row><span style={{ flex: 1, fontSize: 12 }}>Camiseta básica negra × 2</span><span className="mono" style={{ fontSize: 11 }}>$89.800</span></Row>
        <Row><span style={{ flex: 1, fontSize: 12 }}>Envío Bogotá</span><span className="mono" style={{ fontSize: 11 }}>$12.000</span></Row>
      </WindowFrame>
      <WindowFrame title="últimos documentos" style={{ bottom: 0, left: 0, right: 0, height: "38%" }}>
        <Row><span className="mock-pill">FEV</span><span style={{ flex: 1, fontSize: 12 }}>FEV-001843</span><span className="mono" style={{ fontSize: 10, color: "var(--mute)" }}>14:22</span><span className="mock-pill ink">✓</span></Row>
        <Row><span className="mock-pill">NC</span><span style={{ flex: 1, fontSize: 12 }}>NC-000112</span><span className="mono" style={{ fontSize: 10, color: "var(--mute)" }}>14:18</span><span className="mock-pill ink">✓</span></Row>
      </WindowFrame>
    </div>
  );
}

function MockContab() {
  return (
    <div className="mock">
      <WindowFrame title="flujo · abril 2026" style={{ top: 0, left: 0, right: 0, height: "58%" }}>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 140, padding: "8px 0" }}>
          {[40,55,38,70,85,62,92,78,95,68,80,110].map((h,i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ background: i === 11 ? "var(--ink)" : "var(--bg-alt)", border: "1px solid var(--line)", height: h, borderRadius: 2 }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--mute)" }}>
          <span>ENE</span><span>JUN</span><span>DIC</span>
        </div>
      </WindowFrame>
      <WindowFrame title="proveedores" style={{ bottom: 0, left: 0, width: "48%", height: "36%" }}>
        <Row><div className="mock-avatar"></div><span style={{ flex: 1, fontSize: 12 }}>Textiles Medellín</span><span className="mono" style={{ fontSize: 11 }}>$4.2M</span></Row>
        <Row highlight><div className="mock-avatar ink"></div><span style={{ flex: 1, fontSize: 12 }}>Cartón & Co.</span><span className="mono" style={{ fontSize: 11 }}>$1.1M</span></Row>
      </WindowFrame>
      <WindowFrame title="órdenes compra" style={{ bottom: 0, right: 0, width: "48%", height: "36%" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1 }}>24</div>
        <div style={{ fontSize: 11, color: "var(--mute)" }}>abiertas · $18.4M</div>
      </WindowFrame>
    </div>
  );
}

function MockChat() {
  return (
    <div className="mock">
      <WindowFrame title="#operaciones" style={{ top: 0, left: 0, right: "34%", bottom: 0 }}>
        <Row><div className="mock-avatar"></div><div style={{ flex: 1 }}><div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--mute)" }}>DANIELA · 14:02</div><div style={{ fontSize: 12 }}>Ya salió el pedido #4821 ✓</div></div></Row>
        <Row highlight><div className="mock-avatar ink"></div><div style={{ flex: 1 }}><div style={{ fontSize: 11, fontFamily: "var(--font-mono)", opacity: 0.7 }}>CARLOS · 14:04</div><div style={{ fontSize: 12 }}>Perfecto, aviso al cliente</div></div></Row>
        <Row><div className="mock-avatar"></div><div style={{ flex: 1 }}><div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--mute)" }}>VALERIA · 14:07</div><div style={{ fontSize: 12 }}>Inventario actualizado</div></div></Row>
      </WindowFrame>
      <WindowFrame title="canales" style={{ top: 0, right: 0, width: "30%", bottom: 0 }}>
        <Row highlight><span style={{ flex: 1, fontSize: 12 }}># operaciones</span></Row>
        <Row><span style={{ flex: 1, fontSize: 12, color: "var(--mute)" }}># ventas</span></Row>
        <Row><span style={{ flex: 1, fontSize: 12, color: "var(--mute)" }}># general</span></Row>
        <Row><span style={{ flex: 1, fontSize: 12, color: "var(--mute)" }}># soporte</span></Row>
      </WindowFrame>
    </div>
  );
}

function MockOps() {
  return (
    <div className="mock">
      <WindowFrame title="agenda · martes 23" style={{ top: 0, left: 0, right: 0, bottom: "42%" }}>
        {["09:00","10:00","11:00","12:00"].map((t,i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 2px", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--mute)", width: 40 }}>{t}</span>
            {i === 1 ? (
              <div style={{ flex: 1, background: "var(--ink)", color: "var(--bg)", borderRadius: 6, padding: "6px 10px", fontSize: 12 }}>Corte de cabello · M. Castro</div>
            ) : i === 2 ? (
              <div style={{ flex: 1, background: "var(--bg-alt)", border: "1px solid var(--line)", borderRadius: 6, padding: "6px 10px", fontSize: 12 }}>Manicure · L. Torres</div>
            ) : (
              <div style={{ flex: 1, height: 8, borderRadius: 4, background: "var(--bg-alt)", opacity: 0.4 }} />
            )}
          </div>
        ))}
      </WindowFrame>
      <WindowFrame title="recursos" style={{ bottom: 0, left: 0, right: 0, height: "38%" }}>
        <Row><div className="mock-avatar"></div><span style={{ flex: 1, fontSize: 12 }}>Estilista A</span><Bar w={80} style={{ maxWidth: 120 }} /></Row>
        <Row><div className="mock-avatar"></div><span style={{ flex: 1, fontSize: 12 }}>Estilista B</span><Bar w={45} style={{ maxWidth: 120 }} /></Row>
      </WindowFrame>
    </div>
  );
}

function MockTasks() {
  const cols = [
    { name: "Por hacer", items: ["Revisar inventario", "Llamar proveedor"] },
    { name: "En curso", items: ["Rediseño empaque"], highlight: true },
    { name: "Hecho", items: ["Promo abril", "Fotos producto"] },
  ];
  return (
    <div className="mock" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
      {cols.map((c,i) => (
        <div key={i} style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 10, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--mute)", letterSpacing: "0.08em" }}>{c.name.toUpperCase()}</div>
          {c.items.map((it,j) => (
            <div key={j} style={{ background: c.highlight && j === 0 ? "var(--ink)" : "var(--bg-alt)", color: c.highlight && j === 0 ? "var(--bg)" : "var(--ink)", border: "1px solid " + (c.highlight && j === 0 ? "var(--ink)" : "var(--line)"), borderRadius: 6, padding: "8px 10px", fontSize: 12 }}>{it}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function MockPay() {
  return (
    <div className="mock">
      <WindowFrame title="link de pago · WhatsApp" style={{ top: 0, left: 0, width: "50%", bottom: 0 }}>
        <div style={{ padding: 8, background: "var(--bg-alt)", borderRadius: 8, fontSize: 12 }}>
          <div style={{ color: "var(--mute)", fontSize: 11, marginBottom: 4 }}>binah.co/pay/</div>
          <div className="mono" style={{ fontSize: 11, wordBreak: "break-all" }}>a7f2-c891-e03b</div>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 500, letterSpacing: "-0.02em", marginTop: 8 }}>$340K</div>
        <span className="mock-pill ink">✓ Pagado en 8s</span>
      </WindowFrame>
      <WindowFrame title="métodos" style={{ top: 0, right: 0, width: "46%", height: "48%" }}>
        <Row><span className="mock-pill">PSE</span><span style={{ flex: 1 }}></span><span className="mono" style={{ fontSize: 11 }}>42%</span></Row>
        <Row highlight><span className="mock-pill" style={{ background: "#fff", color: "#000", borderColor: "#fff" }}>NEQUI</span><span style={{ flex: 1 }}></span><span className="mono" style={{ fontSize: 11 }}>31%</span></Row>
      </WindowFrame>
      <WindowFrame title="cobros hoy" style={{ bottom: 0, right: 0, width: "46%", height: "46%" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1 }}>$12.4M</div>
        <div style={{ fontSize: 11, color: "var(--mute)" }}>84 transacciones</div>
      </WindowFrame>
    </div>
  );
}

function MockReports() {
  return (
    <div className="mock">
      <WindowFrame title="dashboard · vista general" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ border: "1px solid var(--line)", borderRadius: 8, padding: 12 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--mute)" }}>VENTAS MES</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em" }}>$48.2M</div>
            <div style={{ height: 40, display: "flex", gap: 2, alignItems: "flex-end", marginTop: 6 }}>
              {[20,35,28,48,40,55,70,60,65,80].map((h,i) => <div key={i} style={{ flex: 1, height: h, background: "var(--ink)", opacity: i/10 + 0.3 }} />)}
            </div>
          </div>
          <div style={{ border: "1px solid var(--line)", borderRadius: 8, padding: 12 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--mute)" }}>CONVERSIÓN</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em" }}>34.2%</div>
            <Bar w={68} style={{ marginTop: 12 }} />
          </div>
          <div style={{ border: "1px solid var(--line)", borderRadius: 8, padding: 12, gridColumn: "1 / -1" }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--mute)" }}>POR MÓDULO</div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              {[{n: "CRM", w: 85}, {n: "Retail", w: 62}, {n: "Facturación", w: 48}, {n: "Pagos", w: 74}].map((m,i) => (
                <div key={i} style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", marginBottom: 4 }}>{m.n}</div>
                  <Bar w={m.w} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </WindowFrame>
    </div>
  );
}

const MOCK_MAP = {
  crm: MockCRM,
  retail: MockRetail,
  facturacion: MockFact,
  contabilidad: MockContab,
  chat: MockChat,
  operaciones: MockOps,
  tareas: MockTasks,
  invoice: MockPay,
  reportes: MockReports,
};

function ModuleMock({ id }) {
  const Comp = MOCK_MAP[id] || MockCRM;
  return <Comp />;
}

Object.assign(window, { ModuleMock, Bar, Row, WindowFrame });
