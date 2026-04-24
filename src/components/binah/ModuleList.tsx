import { useState, type CSSProperties } from "react";
import { BINAH_MODULES } from "./modules";

export default function ModuleList() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        border: "1px solid var(--line)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      {BINAH_MODULES.map((m, i) => {
        const rowStyle: CSSProperties = {
          display: "grid",
          gridTemplateColumns: "80px 1.2fr 2fr 1.4fr 60px",
          gap: 28,
          padding: "36px 40px",
          borderBottom: i < BINAH_MODULES.length - 1 ? "1px solid var(--line)" : "none",
          alignItems: "center",
          transition: "background .15s",
          background: hover === m.id ? "var(--bg-alt)" : "transparent",
        };
        return (
          <a
            href={m.href}
            key={m.id}
            style={rowStyle}
            onMouseEnter={() => setHover(m.id)}
            onMouseLeave={() => setHover(null)}
          >
            <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: "0.1em" }}>{m.num}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.02 }}>{m.name}</div>
            <div style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.45, maxWidth: "46ch" }}>{m.tagline}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {m.features.slice(0, 2).map((f, j) => (
                <span key={j} className="mock-pill" style={{ fontSize: 10 }}>{f}</span>
              ))}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--mute)", textAlign: "right" }}>→</div>
          </a>
        );
      })}
    </div>
  );
}
