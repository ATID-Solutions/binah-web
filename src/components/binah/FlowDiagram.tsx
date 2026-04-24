const STEPS = [
  { label: "Cliente escribe", detail: "WhatsApp · Instagram · Email" },
  { label: "Agente responde", detail: "Ventas · Soporte · Reservas" },
  { label: "Pedido creado", detail: "Retail + inventario" },
  { label: "Factura DIAN", detail: "Emitida y firmada" },
  { label: "Despacho", detail: "Etiqueta + tracking" },
  { label: "Contabilidad", detail: "Registrado automático" },
];

export default function FlowDiagram() {
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: 40, background: "var(--bg-alt)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, alignItems: "stretch" }}>
        {STEPS.map((s, i) => (
          <div
            key={i}
            style={{
              background: "var(--bg)",
              border: "1px solid var(--line)",
              borderRadius: 6,
              padding: 20,
              position: "relative",
              minHeight: 140,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="mono" style={{ fontSize: 10, color: "var(--mute)", letterSpacing: "0.1em" }}>0{i + 1}</div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                }}
              >
                {s.label}
              </div>
              <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 6 }}>{s.detail}</div>
            </div>
            {i < STEPS.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  right: -14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  background: "var(--bg-alt)",
                  padding: "2px 4px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: "var(--mute)",
                }}
              >
                →
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 24,
          paddingTop: 20,
          borderTop: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--mute)",
          letterSpacing: "0.08em",
        }}
      >
        <span>TIEMPO TOTAL</span>
        <span>~ 8 SEGUNDOS · 0 INTERVENCIÓN HUMANA</span>
      </div>
    </div>
  );
}
