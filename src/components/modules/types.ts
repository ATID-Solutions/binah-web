// Content model for the module pages (/modulo-*). Every module page renders
// the same sections through ModulePage.astro; a page only supplies this
// content and its product shot (the hero mock, in the `shot` slot).
import type { ModuleId } from "../binah/modules";
import type { IconName } from "./icons";

export type ChannelName = "whatsapp" | "instagram" | "email" | "web" | "call";

/** Icon of a capability card: a channel's round app icon, a module glyph or a line icon. */
export type FeatureIcon = { channel: ChannelName } | { module: ModuleId } | { icon: IconName };

export interface ModuleFeature {
  icon: FeatureIcon;
  title: string;
  body: string;
  link?: { label: string; href: string };
}

/** A short title + sentence, used by the checklist strip and the guardrails grid. */
export interface ModuleNote {
  title: string;
  body: string;
}

export type Tone = "green" | "purple" | "amber" | "blue" | "gray";

/** Small illustration at the top of each card in the dark panel. */
export type MiniVisual =
  /** A customer message, the reply, and the outcome. */
  | { type: "chat"; in: string; out: string; result: string }
  /** A few rows of a list (label + status pill), with an optional outcome. */
  | { type: "rows"; title?: string; rows: Array<{ label: string; value: string; tone?: Tone }>; result?: string }
  /** One metric with a bar chart (bars are 0–100 heights), with an optional outcome. */
  | { type: "stat"; label: string; value: string; delta?: string; bars: number[]; result?: string };

export interface HighlightCard {
  kicker: string;
  name: string;
  /** Optional live status next to the kicker, e.g. "En línea" or "Automático". */
  status?: string;
  body: string;
  visual: MiniVisual;
  points: string[];
  link?: { label: string; href: string };
}

export interface ModuleContent {
  id: ModuleId;
  /** Page path, e.g. "/modulo-crm". */
  path: string;
  seo: { title: string; description: string };
  /** WhatsApp message for the demo buttons. */
  demoMessage: string;
  hero: {
    crumb: string;
    eyebrow: string;
    title: string;
    /** Second part of the H1, shown with the lavender gradient. */
    accent: string;
    lead: string;
  };
  /** 01 — what the module covers. */
  features: {
    label: string;
    title: string;
    /** Second part of the H2, shown in grey. */
    soft?: string;
    lead: string;
    items: ModuleFeature[];
    /** Short items (like the CRM channels) stay two per row on phones. */
    compact?: boolean;
    /** Optional strip of three checked notes under the cards. */
    notes?: ModuleNote[];
  };
  /** 02 — the dark panel: agents, automations or the AI in this module. */
  highlight: {
    label: string;
    title: string;
    lead: string;
    cards: HighlightCard[];
    guardrails?: { label: string; title: string; items: ModuleNote[] };
  };
  /** 03 — how the work flows to the rest of Binah. */
  flow: {
    label: string;
    title: string;
    soft?: string;
    lead: string;
    steps: Array<{ title: string; body: string; modules?: ModuleId[] }>;
  };
  solutions: {
    title: string;
    lead: string;
    /** Solution pages to list; by default every solution of this module. */
    slugs?: string[];
  };
  faqs: Array<{ q: string; a: string }>;
  cta: { eyebrow: string; heading: string; lead: string };
}
