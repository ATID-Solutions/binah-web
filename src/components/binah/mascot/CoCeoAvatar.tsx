import { Mascot } from "./Mascot";
import "./mascot.css";

/**
 * The Co-CEO's face, as in the Binah app (binah repo,
 * src/components/agents/coceo/CoCeoAvatar.tsx): the guide sheep's
 * head-and-shoulders portrait on a white disc with a faint charcoal edge and
 * a soft shadow, like a profile photo. Decorative: the text next to it
 * carries the name. Renders as static SVG (no hydration); the idle motion is
 * CSS and respects reduced motion.
 */
export default function CoCeoAvatar({ size, thinking = false }: { size: number; thinking?: boolean }) {
  return (
    <span
      className="coceo-avatar-disc"
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 0 0 1px rgba(23, 30, 25, 0.12), 0 4px 10px -4px rgba(0, 0, 0, 0.35)",
      }}
    >
      <Mascot variant="avatar" pose={thinking ? "think" : "happy"} size={size} decorative />
    </span>
  );
}
