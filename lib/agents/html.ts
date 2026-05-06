// lib/agents/html.ts

import { ModelConfig, getClient } from '../model-router';
import { DesignOutput } from './design';
import { CopyOutput } from './copy';

// ─── The scaffold with named slots ───────────────────────────
const HTML_SCAFFOLD = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>{{APP_NAME}} — Case Study</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family={{DISPLAY_FONT}}:wght@400;600;700;800&family={{BODY_FONT}}:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
/* ── DESIGN TOKENS ── */
:root {
  --primary:    {{PRIMARY_COLOR}};
  --secondary:  {{SECONDARY_COLOR}};
  --accent:     {{ACCENT_COLOR}};
  --bg:         {{BG_COLOR}};
  --bg-2:       {{BG_2_COLOR}};
  --text:       {{TEXT_COLOR}};
  --text-muted: {{TEXT_MUTED_COLOR}};
  --border:     {{BORDER_COLOR}};
  --font-display: '{{DISPLAY_FONT}}', sans-serif;
  --font-body:    '{{BODY_FONT}}', sans-serif;
  --radius:     16px;
  --radius-lg:  24px;
}

/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ── TYPOGRAPHY ── */
h1, h2, h3, h4 {
  font-family: var(--font-display);
  text-wrap: balance;
  line-height: 1.05;
  letter-spacing: -0.03em;
}
h1 { font-size: clamp(48px, 8vw, 100px); font-weight: 800; }
h2 { font-size: clamp(32px, 4vw, 56px);  font-weight: 700; }
h3 { font-size: clamp(20px, 2vw, 28px);  font-weight: 600; }
p  { font-size: 16px; line-height: 1.7; color: var(--text-muted); font-weight: 300; }

/* ── LAYOUT ── */
.container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
.section    { padding: clamp(64px, 10vw, 140px) 0; }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 40px 0;
  background: {{HERO_GRADIENT}};
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: {{HERO_GLOW}};
  pointer-events: none;
}
.hero-eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 24px;
  display: block;
}
.hero-title { color: var(--text); margin-bottom: 24px; }
.hero-title em { font-style: normal; color: var(--accent); }
.hero-sub {
  font-size: clamp(16px, 1.5vw, 20px);
  max-width: 600px;
  margin: 0 auto 64px;
  color: var(--text-muted);
}

/* ── MOCKUP STAGE ── */
.mockup-stage {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: clamp(360px, 45vw, 520px);
  width: 100%;
  perspective: 1200px;
  margin-top: 20px;
}
.phone-frame {
  position: absolute;
  bottom: 0;
  border-radius: 38px;
  border: 2px solid var(--border);
  overflow: hidden;
  background: var(--bg-2);
  box-shadow:
    0 50px 100px rgba(0,0,0,0.4),
    0 0 0 1px rgba(255,255,255,0.05),
    inset 0 1px 0 rgba(255,255,255,0.1);
  transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease;
}
.phone-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
  pointer-events: none;
}
.phone-frame:hover {
  box-shadow:
    0 70px 140px rgba(0,0,0,0.5),
    0 0 0 1px var(--accent),
    inset 0 1px 0 rgba(255,255,255,0.1);
}
/* Phone positions — AI fills in transform values based on count */
{{PHONE_POSITIONS_CSS}}

/* ── STATS ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: clamp(40px, 6vw, 80px) 0;
}
.stat-cell {
  background: var(--bg);
  padding: clamp(28px, 4vw, 52px) 32px;
  text-align: center;
}
.stat-number {
  font-family: var(--font-display);
  font-size: clamp(36px, 4vw, 60px);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 8px;
}
.stat-number span { color: var(--accent); }
.stat-label { font-size: 13px; color: var(--text-muted); line-height: 1.4; }

/* ── TIMELINE ── */
.timeline { display: flex; flex-direction: column; gap: 0; }
.timeline-item { display: flex; gap: 40px; }
.timeline-spine {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding-top: 4px;
}
.timeline-node {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--text);
  color: var(--bg);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 15px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  z-index: 1;
}
.timeline-line {
  width: 2px; flex: 1;
  background: repeating-linear-gradient(
    to bottom,
    var(--border) 0, var(--border) 6px,
    transparent 6px, transparent 12px
  );
  margin: 8px 0;
  min-height: 48px;
}
.timeline-body { flex: 1; padding-bottom: 72px; }
.timeline-micro {
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--text-muted); margin-bottom: 12px;
}
.timeline-heading { color: var(--text); margin-bottom: 28px; }
.bullet-list { list-style: none; display: flex; flex-direction: column; gap: 16px; }
.bullet-list li { display: flex; gap: 14px; align-items: flex-start; }
.bullet-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--text); flex-shrink: 0; margin-top: 8px;
}
.bullet-dot.accent { background: var(--accent); }
.bullet-list li p { font-size: 15px; }

/* ── PROCESS ── */
.process-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 40px;
}
.process-col {}
.process-pill {
  border-radius: 100px;
  padding: 14px 24px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  margin-bottom: 12px;
}
.process-item {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 18px;
  font-size: 13px;
  text-align: center;
  margin-bottom: 10px;
  color: var(--text);
  background: var(--bg-2);
}

/* ── FEATURES ── */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 48px;
}
.feature-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  background: var(--bg-2);
  transition: border-color 0.3s, transform 0.3s;
  cursor: default;
}
.feature-card:hover {
  border-color: var(--accent);
  transform: translateY(-5px);
}
.feature-icon {
  width: 52px; height: 52px;
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px;
  margin-bottom: 20px;
}
.feature-title {
  font-family: var(--font-display);
  font-size: 17px; font-weight: 700;
  color: var(--text); margin-bottom: 10px;
}
.feature-desc { font-size: 13px; line-height: 1.65; }

/* ── IMPACT BAND ── */
.impact-band {
  background: var(--accent);
  padding: clamp(48px, 8vw, 96px) 40px;
}
.impact-band .stat-number { color: var(--bg); }
.impact-band .stat-label  { color: color-mix(in srgb, var(--bg) 60%, transparent); }
.impact-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center;
  gap: clamp(32px, 6vw, 96px);
}
.impact-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 800;
  color: var(--bg);
  letter-spacing: -0.03em;
  line-height: 1;
  flex-shrink: 0;
  max-width: 280px;
}
.impact-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  flex: 1;
}

/* ── TECH STACK ── */
.tech-grid {
  display: flex; flex-wrap: wrap;
  gap: 10px; margin-top: 32px;
}
.tech-badge {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 18px;
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 13px; font-weight: 500;
  background: var(--bg-2);
  color: var(--text);
}
.tech-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

/* ── SECTION LABEL ── */
.section-eyebrow {
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 16px; display: block;
}
.section-heading { color: var(--text); margin-bottom: 16px; }
.section-sub { max-width: 560px; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .container { padding: 0 24px; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .process-grid { grid-template-columns: 1fr; }
  .impact-inner { flex-direction: column; }
  .impact-metrics { grid-template-columns: repeat(3, 1fr); width: 100%; }
  .timeline-item { gap: 20px; }
}
@media (max-width: 600px) {
  .container { padding: 0 20px; }
  h1 { letter-spacing: -0.02em; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .features-grid { grid-template-columns: 1fr; }
  .impact-metrics { grid-template-columns: 1fr; gap: 24px; }
  .tech-grid { gap: 8px; }
  .timeline-item { gap: 14px; }
}

/* ── PRINT / PDF ── */
@media print {
  .hero { min-height: auto; padding: 60px 40px; }
  .phone-frame { box-shadow: none; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>
</head>
<body>

<!-- HERO -->
<section class="hero">
  {{HERO_CONTENT}}
  
  <!-- MOCKUP STAGE -->
  <div class="mockup-stage" id="mockup-stage">
    {{PHONE_FRAMES_HTML}}
  </div>
</section>

<!-- PROCESS -->
<section class="section" style="background: var(--bg-2);">
  <div class="container">
    <span class="section-eyebrow">Process</span>
    <h2 class="section-heading">{{PROCESS_HEADING}}</h2>
    <div class="process-grid">
      {{PROCESS_COLUMNS}}
    </div>
  </div>
</section>

<!-- STATS -->
<section class="section">
  <div class="container">
    <div class="stats-grid">
      {{STATS_CELLS}}
    </div>
  </div>
</section>

<!-- CASE STUDY TIMELINE -->
<section class="section">
  <div class="container">
    <div class="timeline">
      {{TIMELINE_ITEMS}}
    </div>
  </div>
</section>

<!-- FEATURES -->
<section class="section" style="background: var(--bg-2);">
  <div class="container">
    <span class="section-eyebrow">Key Features</span>
    <h2 class="section-heading">{{FEATURES_HEADING}}</h2>
    <div class="features-grid">
      {{FEATURE_CARDS}}
    </div>
  </div>
</section>

<!-- IMPACT BAND -->
<div class="impact-band">
  <div class="impact-inner">
    <div class="impact-title">{{IMPACT_TITLE}}</div>
    <div class="impact-metrics">
      {{IMPACT_METRICS}}
    </div>
  </div>
</div>

<!-- TECH STACK -->
<section class="section">
  <div class="container">
    <span class="section-eyebrow">Tech Stack</span>
    <h2 class="section-heading">{{TECH_HEADING}}</h2>
    <div class="tech-grid">
      {{TECH_BADGES}}
    </div>
  </div>
</section>

</body>
</html>`;

// ─── Token builder ────────────────────────────────────────────
function buildTokens(design: DesignOutput, copy: CopyOutput, screenshotCount: number) {

  // Derive bg-2 and border from bg intelligently
  const isDark = isColorDark(design.bg_color);
  const bg2 = isDark
    ? lightenHex(design.bg_color, 8)   // slightly lighter on dark
    : darkenHex(design.bg_color, 4);   // slightly darker on light
  const border = isDark
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(0,0,0,0.08)';
  const textMuted = isDark
    ? 'rgba(255,255,255,0.45)'
    : 'rgba(0,0,0,0.45)';

  // Hero gradient
  const heroGradient = isDark
    ? `radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, ${design.accent_color} 12%, ${design.bg_color}), ${design.bg_color})`
    : `radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, ${design.accent_color} 8%, ${design.bg_color}), ${design.bg_color})`;
  const heroGlow = `radial-gradient(circle 600px at 50% -100px, color-mix(in srgb, ${design.accent_color} 18%, transparent), transparent 70%)`;

  // Phone positions CSS based on count
  const phoneCSS = generatePhoneCSS(screenshotCount);

  return {
    APP_NAME: copy.hero_headline,
    DISPLAY_FONT: design.font_pairing.display.replace(/\s+/g, '+'),
    BODY_FONT: design.font_pairing.body.replace(/\s+/g, '+'),
    PRIMARY_COLOR: design.primary_color,
    SECONDARY_COLOR: design.secondary_color,
    ACCENT_COLOR: design.accent_color,
    BG_COLOR: design.bg_color,
    BG_2_COLOR: bg2,
    TEXT_COLOR: isDark ? '#ffffff' : '#0a0a0a',
    TEXT_MUTED_COLOR: textMuted,
    BORDER_COLOR: border,
    HERO_GRADIENT: heroGradient,
    HERO_GLOW: heroGlow,
    PHONE_POSITIONS_CSS: phoneCSS,
  };
}

// ─── Phone layout generator ───────────────────────────────────
function generatePhoneCSS(count: number): string {
  const configs: Record<number, string> = {
    1: `
      .phone-0 { width: 220px; height: 440px; left: 50%; transform: translateX(-50%); z-index: 5; }`,
    2: `
      .phone-0 { width: 200px; height: 400px; left: calc(50% - 110px); z-index: 4; transform: rotate(-4deg) translateY(20px); }
      .phone-1 { width: 200px; height: 400px; left: calc(50% + 10px);  z-index: 4; transform: rotate(4deg) translateY(20px); }`,
    3: `
      .phone-0 { width: 175px; height: 350px; left: calc(50% - 170px); z-index: 4; transform: rotate(-6deg) translateY(24px); }
      .phone-1 { width: 210px; height: 420px; left: 50%; transform: translateX(-50%); z-index: 5; }
      .phone-2 { width: 175px; height: 350px; left: calc(50% + 10px);  z-index: 4; transform: rotate(6deg) translateY(24px); }`,
    4: `
      .phone-0 { width: 155px; height: 310px; left: calc(50% - 260px); z-index: 3; transform: rotate(-10deg) translateY(40px); opacity: 0.75; }
      .phone-1 { width: 180px; height: 360px; left: calc(50% - 145px); z-index: 4; transform: rotate(-4deg) translateY(18px); }
      .phone-2 { width: 210px; height: 420px; left: 50%; transform: translateX(-50%); z-index: 5; }
      .phone-3 { width: 180px; height: 360px; left: calc(50% + 10px);  z-index: 4; transform: rotate(4deg) translateY(18px); }`,
    5: `
      .phone-0 { width: 145px; height: 290px; left: calc(50% - 310px); z-index: 3; transform: rotate(-10deg) translateY(44px); opacity: 0.65; }
      .phone-1 { width: 170px; height: 340px; left: calc(50% - 195px); z-index: 4; transform: rotate(-5deg) translateY(22px); }
      .phone-2 { width: 210px; height: 420px; left: 50%; transform: translateX(-50%); z-index: 5; }
      .phone-3 { width: 170px; height: 340px; left: calc(50% + 8px);   z-index: 4; transform: rotate(5deg) translateY(22px); }
      .phone-4 { width: 145px; height: 290px; left: calc(50% + 155px); z-index: 3; transform: rotate(10deg) translateY(44px); opacity: 0.65; }`,
  };
  return configs[Math.min(count, 5)] || configs[5];
}

// ─── Section HTML builders ────────────────────────────────────
function buildPhoneFrames(screenshotCount: number): string {
  return Array.from({ length: Math.min(screenshotCount, 5) }, (_, i) => `
    <div class="phone-frame phone-${i}" data-screen-index="${i}">
      <img src="PLACEHOLDER_SCREENSHOT_${i}" alt="App Screen ${i + 1}" />
    </div>`
  ).join('\n');
}

function buildStats(stats: CopyOutput['stats']): string {
  return stats.map(s => `
    <div class="stat-cell">
      <div class="stat-number">${s.number}</div>
      <div class="stat-label">${s.label}</div>
    </div>`
  ).join('\n');
}

function buildTimeline(copy: CopyOutput): string {
  const items = [
    { label: 'Problem', heading: copy.problem.heading, bullets: copy.problem.bullets, dot: '' },
    { label: 'Solution', heading: copy.solution.heading, bullets: copy.solution.bullets, dot: 'accent' },
    { label: 'Result', heading: copy.result.heading, bullets: copy.result.bullets, dot: 'accent' },
  ];
  return items.map((item, i) => `
    <div class="timeline-item">
      <div class="timeline-spine">
        <div class="timeline-node">${i + 1}</div>
        ${i < items.length - 1 ? '<div class="timeline-line"></div>' : ''}
      </div>
      <div class="timeline-body">
        <p class="timeline-micro">${item.label}</p>
        <h2 class="timeline-heading">${item.heading}</h2>
        <ul class="bullet-list">
          ${item.bullets.map(b => `
            <li>
              <div class="bullet-dot ${item.dot}"></div>
              <p>${b}</p>
            </li>`).join('')}
        </ul>
      </div>
    </div>`
  ).join('\n');
}

function buildFeatures(features: CopyOutput['features']): string {
  return features.map(f => `
    <div class="feature-card">
      <div class="feature-icon">${f.icon}</div>
      <div class="feature-title">${f.title}</div>
      <p class="feature-desc">${f.desc}</p>
    </div>`
  ).join('\n');
}

function buildProcess(process: CopyOutput['process'], design: DesignOutput): string {
  const pillColors = [
    { bg: 'color-mix(in srgb, #f5c842 25%, transparent)', color: '#7a6010' },
    { bg: 'color-mix(in srgb, var(--accent) 20%, transparent)', color: 'var(--accent)' },
    { bg: 'color-mix(in srgb, #7eb8f7 25%, transparent)', color: '#1a4a7a' },
  ];
  return [process.phase1, process.phase2, process.phase3].map((phase, i) => `
    <div class="process-col">
      <div class="process-pill" style="background:${pillColors[i].bg};color:${pillColors[i].color}">
        ${phase.title}
      </div>
      ${phase.items.map(item => `<div class="process-item">${item}</div>`).join('')}
    </div>`
  ).join('\n');
}

function buildImpact(impact: CopyOutput['impact']): string {
  return impact.map(m => `
    <div>
      <div class="stat-number">${m.number}</div>
      <div class="stat-label">${m.label}</div>
    </div>`
  ).join('\n');
}

function buildTechBadges(badges: CopyOutput['tech_badges']): string {
  return badges.map(b => `
    <div class="tech-badge">
      <div class="tech-dot" style="background:${b.color}"></div>
      ${b.name}
    </div>`
  ).join('\n');
}

// ─── Colour helpers ───────────────────────────────────────────
function isColorDark(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}
function lightenHex(hex: string, amount: number): string {
  const r = Math.min(255, Math.max(0, parseInt(hex.slice(1, 3), 16) + amount));
  const g = Math.min(255, Math.max(0, parseInt(hex.slice(3, 5), 16) + amount));
  const b = Math.min(255, Math.max(0, parseInt(hex.slice(5, 7), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
function darkenHex(hex: string, amount: number): string {
  return lightenHex(hex, -amount);
}

// ─── Main agent function ──────────────────────────────────────
export async function runHtmlAgent(
  model: ModelConfig,
  design: DesignOutput,
  copy: CopyOutput,
  screenshotCount: number
): Promise<string> {
  const tokens = buildTokens(design, copy, screenshotCount);
  const sections = {
    PROCESS_HEADING: 'How We Built It',
    PROCESS_COLUMNS: buildProcess(copy.process, design),
    STATS_CELLS: buildStats(copy.stats),
    TIMELINE_ITEMS: buildTimeline(copy),
    FEATURES_HEADING: copy.features_heading ?? 'Built for Both Sides',
    FEATURE_CARDS: buildFeatures(copy.features),
    IMPACT_TITLE: copy.result.heading,
    IMPACT_METRICS: buildImpact(copy.impact),
    TECH_HEADING: 'Built With',
    TECH_BADGES: buildTechBadges(copy.tech_badges),
    PHONE_FRAMES_HTML: buildPhoneFrames(screenshotCount),
  };

  const heroHtml = await generateUniqueHero(model, design, copy);
  
  let html = HTML_SCAFFOLD;
  const allTokens = { ...tokens, ...sections, HERO_CONTENT: heroHtml };
  for (const [key, value] of Object.entries(allTokens)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }

  return html;
}

export async function streamHtmlAgent(
  model: ModelConfig,
  design: DesignOutput,
  copy: CopyOutput,
  screenshotCount: number
) {
  const client = getClient(model.provider);
  const tokens = buildTokens(design, copy, screenshotCount);
  const sections = {
    PROCESS_HEADING: 'How We Built It',
    PROCESS_COLUMNS: buildProcess(copy.process, design),
    STATS_CELLS: buildStats(copy.stats),
    TIMELINE_ITEMS: buildTimeline(copy),
    FEATURES_HEADING: copy.features_heading ?? 'Built for Both Sides',
    FEATURE_CARDS: buildFeatures(copy.features),
    IMPACT_TITLE: copy.result.heading,
    IMPACT_METRICS: buildImpact(copy.impact),
    TECH_HEADING: 'Built With',
    TECH_BADGES: buildTechBadges(copy.tech_badges),
    PHONE_FRAMES_HTML: buildPhoneFrames(screenshotCount),
  };

  const prompt = `
    Generate ONLY the inner hero HTML for a ${design.mood} app case study.
    App: "${copy.hero_headline}" — ${copy.hero_sub}
    Mood: ${design.mood}
    Accent color CSS var: var(--accent)
    Text color CSS var: var(--text)
    Muted color CSS var: var(--text-muted)
    Font display CSS var: var(--font-display)

    Output a small HTML snippet (NO <html>, <head>, <body>, <style> tags).
    Include only: eyebrow label, h1 headline, subtitle paragraph.
    Make the headline creative and typographically interesting.
    Return raw HTML only.
  `;

  const stream = await client.chat.completions.create({
    model: model.id,
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });

  // Since we are streaming, we need to return a stream that wraps the scaffold parts
  // But for the sake of the existing architecture, we'll just stream the final HTML as a single block
  // or use a generator.
  
  return (async function* () {
    let heroHtml = '';
    
    // First, send the top part of the scaffold (everything before HERO_CONTENT)
    // Actually, to keep it simple for the frontend Split/Replace logic, 
    // we'll just stream the AI response and the frontend will wrap it.
    // BUT our current frontend expects the FULL HTML in the stream.
    
    const preHero = HTML_SCAFFOLD.split('{{HERO_CONTENT}}')[0];
    const postHero = HTML_SCAFFOLD.split('{{HERO_CONTENT}}')[1];
    
    // Process pre-hero tokens
    let preHtml = preHero;
    const allTokens = { ...tokens, ...sections };
    for (const [key, value] of Object.entries(allTokens)) {
      preHtml = preHtml.replaceAll(`{{${key}}}`, value);
    }
    yield preHtml;

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        heroHtml += text;
        yield text.replace(/```html?|```/g, ''); // Basic cleaning during stream
      }
    }

    // Process post-hero tokens
    let postHtml = postHero;
    for (const [key, value] of Object.entries(allTokens)) {
      postHtml = postHtml.replaceAll(`{{${key}}}`, value);
    }
    yield postHtml;
  })();
}

function buildHeroContent(copy: CopyOutput): string {
  return `
    <span class="hero-eyebrow">${copy.category ?? 'Case Study'}</span>
    <h1 class="hero-title">${copy.hero_headline}</h1>
    <p class="hero-sub">${copy.hero_sub}</p>
  `;
}

async function generateUniqueHero(
  model: ModelConfig,
  design: DesignOutput,
  copy: CopyOutput
): Promise<string> {
  const client = getClient(model.provider);
  const prompt = `
    Generate ONLY the inner hero HTML for a ${design.mood} app case study.
    App: "${copy.hero_headline}" — ${copy.hero_sub}
    Mood: ${design.mood}
    Accent color CSS var: var(--accent)
    Text color CSS var: var(--text)
    Muted color CSS var: var(--text-muted)
    Font display CSS var: var(--font-display)

    Output a small HTML snippet (NO <html>, <head>, <body>, <style> tags).
    Include only: eyebrow label, h1 headline, subtitle paragraph.
    Return raw HTML only.
  `;

  try {
    const response = await client.chat.completions.create({
      model: model.id,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
    });
    const content = response.choices[0].message.content || '';
    return content.replace(/```html?|```/g, '').trim();
  } catch {
    return buildHeroContent(copy);
  }
}