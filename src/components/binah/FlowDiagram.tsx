import { useState, type CSSProperties } from "react";

const STEPS = [
  { label: "Cliente escribe", detail: "WhatsApp · Instagram · Email" },
  { label: "Agente responde", detail: "Ventas · Soporte · Reservas" },
  { label: "Pedido creado", detail: "Retail + inventario" },
  { label: "Factura DIAN", detail: "Emitida y firmada" },
  { label: "Despacho", detail: "Etiqueta + tracking" },
  { label: "Contabilidad", detail: "Registrado automático" },
];

export default function FlowDiagram() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((current) => (current === 0 ? STEPS.length - 1 : current - 1));
  const next = () => setActive((current) => (current === STEPS.length - 1 ? 0 : current + 1));

  return (
    <div className="flow-diagram">
      <div className="flow-viewport">
        <div className="flow-track" style={{ "--active-step": active } as CSSProperties}>
          {STEPS.map((s, i) => (
            <div key={i} className="flow-step">
              <div className="mono flow-step-num">0{i + 1}</div>
              <div>
                <div className="flow-step-label">{s.label}</div>
                <div className="flow-step-detail">{s.detail}</div>
              </div>
              {i < STEPS.length - 1 && <div className="flow-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="flow-controls" aria-label="Controles del flujo">
        <button type="button" onClick={prev} aria-label="Paso anterior">
          ←
        </button>
        <div className="flow-dots">
          {STEPS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
              aria-label={`Ver paso ${i + 1}`}
              aria-current={active === i}
            />
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Paso siguiente">
          →
        </button>
      </div>
      <div className="flow-total">
        <span>TIEMPO TOTAL</span>
        <span>~ 8 SEGUNDOS · 0 INTERVENCIÓN HUMANA</span>
      </div>
    </div>
  );
}
