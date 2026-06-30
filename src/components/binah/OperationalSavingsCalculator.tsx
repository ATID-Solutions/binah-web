import { useMemo, useState } from "react";

const PERIOD_DAYS = 28;
const BINAH_ORDER_MINUTES = 2;
const BINAH_INVOICE_SECONDS = 10;
const BINAH_INVOICE_MINUTES = BINAH_INVOICE_SECONDS / 60;
const formatNumber = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0,
});

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

interface NumericFieldProps {
  label: string;
  suffix: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

function NumericField({ label, suffix, value, min, max, step = 1, onChange }: NumericFieldProps) {
  const update = (nextValue: string) => {
    const parsed = Number(nextValue);
    if (!Number.isNaN(parsed)) {
      onChange(clamp(parsed, min, max));
    }
  };

  return (
    <label className="ops-calc-field">
      <span>{label}</span>
      <div className="ops-calc-control">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => update(event.target.value)}
        />
        <div className="ops-calc-number">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) => update(event.target.value)}
          />
          <small>{suffix}</small>
        </div>
      </div>
    </label>
  );
}

export default function OperationalSavingsCalculator() {
  const [ordersPerDay, setOrdersPerDay] = useState(100);
  const [manualOrderMinutes, setManualOrderMinutes] = useState(15);
  const [invoiceMinutes, setInvoiceMinutes] = useState(7);

  const results = useMemo(() => {
    const periodOrders = ordersPerDay * PERIOD_DAYS;
    const orderHoursSaved = (Math.max(manualOrderMinutes - BINAH_ORDER_MINUTES, 0) * periodOrders) / 60;
    const invoiceHoursSaved = (Math.max(invoiceMinutes - BINAH_INVOICE_MINUTES, 0) * periodOrders) / 60;
    const totalHoursSaved = orderHoursSaved + invoiceHoursSaved;

    return {
      periodOrders,
      orderHoursSaved,
      invoiceHoursSaved,
      totalHoursSaved,
      workdaysSaved: totalHoursSaved / 8,
    };
  }, [ordersPerDay, manualOrderMinutes, invoiceMinutes]);

  return (
    <div className="ops-calculator">
      <div className="ops-calculator-summary">
        <div className="mono">Calculadora / 28 días</div>
        <strong>{formatNumber.format(results.totalHoursSaved)} h</strong>
        <p>
          Horas estimadas que se pueden liberar por periodo al conectar pedidos, despacho y facturación.
        </p>
        <dl>
          <div>
            <dt>Pedidos del periodo</dt>
            <dd>{formatNumber.format(results.periodOrders)}</dd>
          </div>
          <div>
            <dt>Pedidos y despacho</dt>
            <dd>{formatNumber.format(results.orderHoursSaved)} h</dd>
          </div>
          <div>
            <dt>Facturación SIIGO</dt>
            <dd>{formatNumber.format(results.invoiceHoursSaved)} h</dd>
          </div>
          <div>
            <dt>Jornadas de 8 horas</dt>
            <dd>{formatNumber.format(results.workdaysSaved)}</dd>
          </div>
        </dl>
      </div>

      <div className="ops-calculator-controls">
        <NumericField
          label="Pedidos por día"
          suffix="pedidos"
          value={ordersPerDay}
          min={10}
          max={500}
          onChange={setOrdersPerDay}
        />
        <NumericField
          label="Minutos manuales por pedido ACTUALMENTE"
          suffix="min"
          value={manualOrderMinutes}
          min={3}
          max={45}
          onChange={setManualOrderMinutes}
        />
        <NumericField
          label="Minutos manuales por factura ACTUALMENTE"
          suffix="min"
          value={invoiceMinutes}
          min={1}
          max={20}
          onChange={setInvoiceMinutes}
        />
        <div className="ops-calc-assumptions">
          <div>
            <span>Pedido en Binah</span>
            <strong>~{BINAH_ORDER_MINUTES} min</strong>
          </div>
          <div>
            <span>Factura en Binah</span>
            <strong>~{BINAH_INVOICE_SECONDS} seg</strong>
          </div>
        </div>
        <p>
          Estimación operativa. Binah usa aproximadamente 2 minutos para generar pedido/despacho y 10 segundos para generar factura.
          No incluye el tiempo que se libera en atención al cliente cuando la IA recopila datos, responde preguntas repetidas
          y escala solo los casos necesarios.
        </p>
      </div>
    </div>
  );
}
