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
      <section className="ops-savings-banner" aria-labelledby="ops-savings-title">
        <div className="ops-savings-banner-inner">
          <div>
            <div className="section-num section-num-dark">
              <span className="n">02</span>
              <span>Ahorro operativo</span>
              <span className="rule"></span>
              <span>Calculadora</span>
            </div>
            <h2 className="display display-lg" id="ops-savings-title">
              Calcula cuántas horas libera Binah.
            </h2>
            <p>
              Ajusta pedidos diarios y tiempos actuales de tu equipo para estimar el ahorro al conectar pedidos,
              despachos, facturación y WhatsApp.
            </p>
            <DialogTrigger asChild>
              <button className="btn ops-savings-cta" type="button">
                Abrir calculadora <span className="arrow">→</span>
              </button>
            </DialogTrigger>
          </div>

          <div className="ops-savings-banner-metrics" aria-label="Supuestos de cálculo en Binah">
            <div>
              <span>Pedido en Binah</span>
              <strong>~2 min</strong>
            </div>
            <div>
              <span>Factura en Binah</span>
              <strong>~10 seg</strong>
            </div>
            <div>
              <span>Base del cálculo</span>
              <strong>28 días</strong>
            </div>
          </div>
        </div>

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
