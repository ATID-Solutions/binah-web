import { BrandTile, type BrandIcon } from "./brands";

interface Card {
  icon: BrandIcon;
  title: string;
  desc: string;
}

const CARDS: Card[] = [
  { icon: "whatsapp", title: "WhatsApp Business API", desc: "Oficial. Sin apps intermediarias." },
  { icon: "instagram", title: "Instagram DM", desc: "Conversaciones e historias." },
  { icon: "email", title: "Email", desc: "Conecta cualquier dominio." },
  { icon: "phone", title: "Llamadas CRM", desc: "Celulares colombianos desde Binah." },
  { icon: "email", title: "Chat web", desc: "Widget embebible en tu sitio." },
];

export default function ChannelCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
      {CARDS.map((c, i) => (
        <div
          key={i}
          style={{ border: "1px solid var(--line)", borderRadius: 8, padding: "28px 24px", background: "var(--bg)" }}
        >
          <div style={{ height: 44, display: "flex", alignItems: "center" }}>
            <BrandTile icon={c.icon} size={40} />
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              marginTop: 16,
            }}
          >
            {c.title}
          </div>
          <p style={{ color: "var(--mute)", fontSize: 13, marginTop: 10 }}>{c.desc}</p>
        </div>
      ))}
    </div>
  );
}
