import { Theme } from './types';

export const editorial: Theme = {
    id: 'editorial',
    name: 'Editorial Dark',
    signature: 'Luxury dark mode, fanned mockups, numbered timeline, elegant feature grids',
    sectionOrder: ['hero', 'stats', 'process', 'timeline', 'features', 'impact', 'tech'],
    requiredTokens: ['PRIMARY_COLOR', 'ACCENT_COLOR', 'BG_COLOR', 'DISPLAY_FONT', 'BODY_FONT'],
    scaffold: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>{{APP_NAME}} — Case Study</title>
<link href="https://fonts.googleapis.com/css2?family={{DISPLAY_FONT}}:wght@700;800&family={{BODY_FONT}}:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
{{BASE_CSS}}
:root {
  --primary: {{PRIMARY_COLOR}};
  --accent:  {{ACCENT_COLOR}};
  --accent-dim: {{ACCENT_COLOR}}22;
  --bg:      {{BG_COLOR}};
  --bg-2:    {{BG_2_COLOR}};
  --text:    {{TEXT_COLOR}};
  --muted:   {{TEXT_MUTED_COLOR}};
  --border:  {{BORDER_COLOR}};
  --display: '{{DISPLAY_FONT}}', sans-serif;
  --body:    '{{BODY_FONT}}', sans-serif;
}

body {
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

/* ── NOISE OVERLAY ── */
body::before {
  content: "";
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: url("https://grainy-gradients.vercel.app/noise.svg");
  opacity: 0.05;
  pointer-events: none;
  z-index: 9999;
}

/* ── HERO ── */
.hero {
  min-height: 100vh;
  background: radial-gradient(ellipse 80% 50% at 50% -20%, 
    color-mix(in srgb, var(--accent) 15%, var(--bg)), var(--bg));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 40px 0;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 900px;
  margin-bottom: 80px;
  position: relative;
  z-index: 10;
}

.hero h1 {
  font-family: var(--display);
  font-size: clamp(52px, 9vw, 110px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--text);
  margin-bottom: 32px;
}

.hero h1 em {
  font-style: normal;
  color: var(--accent);
}

.hero p {
  font-size: 18px;
  font-weight: 300;
  color: var(--muted);
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.7;
}

.mockup-stage {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: clamp(360px, 45vw, 540px);
  width: 100%;
  margin-top: auto;
}

{{PHONE_POSITIONS_CSS}}

.phone-frame {
  position: absolute;
  bottom: 0;
  border-radius: 42px;
  border: 1.5px solid var(--border);
  overflow: hidden;
  background: var(--bg-2);
  box-shadow: 0 50px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05);
  transition: transform 0.6s cubic-bezier(.23,1,.32,1);
}

.phone-frame:hover { transform: translateY(-12px) scale(1.02) !important; z-index: 20 !important; }
.dashboard-frame { border-color: var(--accent); box-shadow: 0 0 40px var(--accent-dim); }
.phone-frame img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }

/* ── STATS ROW ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
}

.stat-cell {
  background: var(--bg);
  padding: 54px 32px;
  text-align: center;
}

.stat-n {
  font-family: var(--display);
  font-size: 58px;
  font-weight: 800;
  color: var(--text);
  line-height: 1;
  margin-bottom: 12px;
  letter-spacing: -2px;
}

.stat-l {
  font-size: 13px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
}

/* ── PROCESS ── */
.process-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
}

.process-col {
  display: flex;
  flex-direction: column;
}

.process-step {
  font-family: var(--display);
  font-size: 16px;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.process-step::after {
  content: "";
  height: 1px;
  flex: 1;
  background: var(--border);
}

.process-col h3 {
  font-family: var(--display);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text);
}

.process-col ul {
  list-style: none;
  padding: 0;
}

.process-col li {
  font-size: 15px;
  color: var(--muted);
  margin-bottom: 12px;
  line-height: 1.6;
}

/* ── TIMELINE ── */
.timeline-wrap {
  display: flex;
  flex-direction: column;
}

.timeline-wrap .timeline-wrap {
  display: flex;
  gap: 64px;
}

.timeline-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
  flex-shrink: 0;
}

.timeline-node {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--accent);
  color: #000;
  font-family: var(--display);
  font-weight: 800;
  font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  z-index: 2;
}

.timeline-dash {
  width: 1px;
  flex: 1;
  background: var(--border);
  margin: 12px 0;
  min-height: 80px;
}

.timeline-content {
  flex: 1;
  padding-bottom: 100px;
}

.timeline-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
}

.timeline-heading {
  font-family: var(--display);
  font-size: clamp(32px, 4vw, 54px);
  font-weight: 800;
  line-height: 1;
  color: var(--text);
  margin-bottom: 32px;
}

.timeline-bullets {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.timeline-bullets li {
  display: flex;
  gap: 16px;
  font-size: 15px;
  color: var(--muted);
  line-height: 1.6;
}

.bullet-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  margin-top: 8px;
  flex-shrink: 0;
}

/* ── FEATURES GRID ── */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  background: var(--bg-2);
  padding: 40px;
  border-radius: 24px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 5%, var(--bg-2));
}

.feature-icon {
  font-size: 32px;
  margin-bottom: 24px;
  display: inline-block;
}

.feature-title {
  font-family: var(--display);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text);
}

.feature-desc {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.6;
}

/* ── IMPACT BAND ── */
.impact-band {
  background: var(--text);
  color: var(--bg);
  padding: 100px 0;
}

.impact-inner {
  display: flex;
  align-items: center;
  gap: 100px;
}

.impact-title {
  font-family: var(--display);
  font-size: 54px;
  font-weight: 800;
  line-height: 1;
  flex-shrink: 0;
  max-width: 400px;
}

.impact-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  flex: 1;
}

.impact-n {
  font-family: var(--display);
  font-size: 52px;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 8px;
}

.impact-l {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.6;
}

/* ── TECH ── */
.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.tech-badge {
  padding: 14px 24px;
  border-radius: 12px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 12px;
}

.tech-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
}

@media (max-width: 1000px) {
  .hero h1 { font-size: 72px; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .process-grid { grid-template-columns: 1fr; }
  .impact-inner { flex-direction: column; gap: 60px; text-align: center; }
  .impact-metrics { width: 100%; }
}

@media (max-width: 600px) {
  .timeline-bullets { grid-template-columns: 1fr; }
  .features-grid { grid-template-columns: 1fr; }
  .stat-n { font-size: 44px; }
}

{{SHARED_SECTION_CSS}}
</style>
</head>
<body>

<section class="hero">
  <div class="hero-content">
    {{HERO_CONTENT}}
  </div>
  <div class="mockup-stage">
    {{PHONE_FRAMES}}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="stats-grid">
      {{STATS_CELLS}}
    </div>
  </div>
</section>

<section class="section bg-2">
  <div class="container">
    <div class="process-grid">
      {{PROCESS_COLUMNS}}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    {{TIMELINE_ITEMS}}
  </div>
</section>

<section class="section bg-2">
  <div class="container">
    <span class="eyebrow">Features</span>
    <h2 style="font-family: var(--display); font-size: 48px; margin-bottom: 60px;">{{FEATURES_HEADING}}</h2>
    <div class="features-grid">
      {{FEATURE_CARDS}}
    </div>
  </div>
</section>

<div class="impact-band">
  <div class="container">
    <div class="impact-inner">
      <div class="impact-title">{{IMPACT_TITLE}}</div>
      <div class="impact-metrics">
        {{IMPACT_METRICS}}
      </div>
    </div>
  </div>
</div>

<section class="section">
  <div class="container">
    <span class="eyebrow">Stack</span>
    <div class="tech-grid">
      {{TECH_BADGES}}
    </div>
  </div>
</section>

</body>
</html>`
};