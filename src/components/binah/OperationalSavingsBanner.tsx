import { useEffect, useRef, useState } from "react";
import OperationalSavingsCalculator from "./OperationalSavingsCalculator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const EXIT_ANIMATION_MS = 260;

export default function OperationalSavingsBanner() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const closeTimerRef = useRef<number | undefined>(undefined);

  const handleOpenChange = (nextOpen: boolean) => {
    window.clearTimeout(closeTimerRef.current);

    if (nextOpen) {
      setMounted(true);
      setIsExiting(false);
      setOpen(true);
      return;
    }

    setIsExiting(true);
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      setMounted(false);
      setIsExiting(false);
    }, EXIT_ANIMATION_MS);
  };

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <section className="hp-calc" aria-labelledby="ops-savings-title">
        <span className="hp-eyebrow hp-eyebrow--dark">Calculadora de ahorro</span>
        <h3 id="ops-savings-title">Calcula cuántas horas libera Binah.</h3>
        <p>
          Ajusta tus pedidos diarios y los tiempos actuales de tu equipo para estimar el ahorro al conectar pedidos,
          cobros, facturación y despachos.
        </p>

        <dl className="hp-calc-metrics" aria-label="Supuestos de cálculo en Binah">
          <div>
            <dt>Pedido</dt>
            <dd>~2 min</dd>
          </div>
          <div>
            <dt>Factura</dt>
            <dd>~10 s</dd>
          </div>
          <div>
            <dt>Base</dt>
            <dd>28 días</dd>
          </div>
        </dl>

        <DialogTrigger asChild>
          <button className="hp-btn hp-btn-primary hp-calc-cta" type="button">
            Abrir calculadora <span className="hp-arrow" aria-hidden="true">→</span>
          </button>
        </DialogTrigger>

        {mounted && (
          <DialogContent
            className={`ops-savings-dialog-content${isExiting ? " is-exiting" : ""}`}
            overlayClassName={isExiting ? "is-exiting" : undefined}
            forceMount
          >
            <DialogHeader className="ops-savings-dialog-head">
              <div>
                <div className="eyebrow">Ahorro operativo</div>
                <DialogTitle className="display display-sm">
                  Calculadora de tiempo liberado.
                </DialogTitle>
                <DialogDescription>
                  Ajusta el volumen y los tiempos actuales de tu equipo para estimar horas liberadas en 28 días.
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <button className="ops-savings-close" type="button" aria-label="Cerrar calculadora">
                  ×
                </button>
              </DialogClose>
            </DialogHeader>
            <OperationalSavingsCalculator />
          </DialogContent>
        )}
      </section>
    </Dialog>
  );
}
