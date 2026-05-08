import { Theme } from './types';

export const vibrantEnergetic: Theme = {
    id: 'vibrant-energetic',
    name: 'Vibrant & Energetic',
    signature: 'Explosive colors, brutalist borders, bold type, energetic overlapping sections',
    sectionOrder: ['hero', 'stats', 'features', 'process', 'result', 'tech'],
    requiredTokens: ['PRIMARY_COLOR', 'ACCENT_COLOR', 'BG_COLOR', 'DISPLAY_FONT', 'BODY_FONT'],
    scaffold: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>{{APP_NAME}} — LFG!</title>
<link href="https://fonts.googleapis.com/css2?family={{DISPLAY_FONT}}:wght@900&family={{BODY_FONT}}:wght@500;700;800&display=swap" rel="stylesheet"/>
<style>
{{BASE_CSS}}
:root {
  --primary: {{PRIMARY_COLOR}};
  --accent:  {{ACCENT_COLOR}};
  --bg:      {{BG_COLOR}};
  --bg-2:    {{BG_2_COLOR}};
  --text:    {{TEXT_COLOR}};
  --muted:   {{TEXT_MUTED_COLOR}};
  --border:  #000000;
  --display: '{{DISPLAY_FONT}}', sans-serif;
  --body:    '{{BODY_FONT}}', sans-serif;
}

body {
  background: var(--bg);
  color: var(--text);
  font-weight: 700;
  overflow-x: hidden;
}

/* ── MESH GRADIENT BACKGROUND ── */
body::before {
  content: "";
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: 
    radial-gradient(circle at 0% 0%, var(--primary) 0%, transparent 40%),
    radial-gradient(circle at 100% 100%, var(--accent) 0%, transparent 40%);
  opacity: 0.05;
  z-index: -1;
}

/* ── HERO ── */
.hero {
  padding: 160px 40px 240px;
  background: var(--primary);
  color: #fff;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-bottom: 8px solid var(--border);
}

.hero-shape-1 {
  position: absolute;
  top: -100px; left: -100px;
  width: 400px; height: 400px;
  background: var(--accent);
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(80px);
}

.hero-content {
  position: relative;
  z-index: 10;
}

.hero h1 {
  font-family: var(--display);
  font-size: clamp(64px, 12vw, 160px);
  font-weight: 900;
  line-height: 0.8;
  letter-spacing: -0.06em;
  text-transform: uppercase;
  margin-bottom: 40px;
  transform: rotate(-2deg);
  display: inline-block;
}

.hero p {
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  background: var(--border);
  display: inline-block;
  padding: 8px 24px;
  transform: rotate(1deg);
  margin-top: 20px;
}

/* ── STATS BRUTAL ── */
.stats-brutal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: -80px;
  position: relative;
  z-index: 20;
  border: 8px solid var(--border);
  background: var(--border);
  box-shadow: 20px 20px 0 var(--border);
}

.stat-cell {
  background: #fff;
  color: #000;
  padding: 40px 20px;
  text-align: center;
  border: 4px solid var(--border);
}

.stat-n {
  font-family: var(--display);
  font-size: 64px;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-l {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ── FEATURES BRUTAL ── */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  padding: 120px 0;
}

.feature-card {
  background: #fff;
  color: #000;
  padding: 48px;
  border: 6px solid var(--border);
  border-radius: 0;
  box-shadow: 16px 16px 0 var(--border);
  transition: all 0.2s cubic-bezier(.17,.67,.83,.67);
}

.feature-card:hover {
  transform: translate(-8px, -8px);
  box-shadow: 24px 24px 0 var(--accent);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 32px;
  display: inline-block;
  background: var(--accent);
  padding: 16px;
  border: 4px solid var(--border);
}

.feature-title {
  font-family: var(--display);
  font-size: 28px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.feature-desc {
  font-size: 16px;
  line-height: 1.5;
}

/* ── IMPACT BRUTAL ── */
.impact-section {
  background: var(--accent);
  padding: 120px 40px;
  margin: 100px -40px;
  transform: rotate(-2deg);
  border-top: 8px solid var(--border);
  border-bottom: 8px solid var(--border);
}

.impact-inner {
  transform: rotate(2deg);
  display: flex;
  align-items: center;
  gap: 80px;
}

.impact-title {
  font-family: var(--display);
  font-size: 80px;
  font-weight: 900;
  line-height: 0.9;
  color: #000;
  text-transform: uppercase;
}

.impact-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  flex: 1;
}

.impact-n {
  font-family: var(--display);
  font-size: 80px;
  font-weight: 900;
  color: #fff;
  -webkit-text-stroke: 3px #000;
}

/* ── TECH ── */
.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 80px 0;
}

.tech-badge {
  background: #fff;
  border: 4px solid var(--border);
  padding: 16px 32px;
  font-size: 18px;
  box-shadow: 8px 8px 0 var(--border);
  transition: all 0.2s ease;
}

.tech-badge:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 var(--primary);
}

@media (max-width: 1000px) {
  .hero h1 { font-size: 80px; }
  .stats-brutal { grid-template-columns: repeat(2, 1fr); }
  .impact-inner { flex-direction: column; text-align: center; }
  .impact-metrics { grid-template-columns: 1fr; }
}

{{SHARED_SECTION_CSS}}
</style>
</head>
<body>

<header class="hero">
  <div class="hero-shape-1"></div>
  <div class="hero-content">
    {{HERO_CONTENT}}
  </div>
</header>

<div class="container">
  <section class="stats-brutal">
    {{STATS_CELLS}}
  </section>

  <section class="features-grid">
    {{FEATURE_CARDS}}
  </section>
</div>

<section class="impact-section">
  <div class="container">
    <div class="impact-inner">
      <div class="impact-title">LFG!</div>
      <div class="impact-metrics">
        {{IMPACT_METRICS}}
      </div>
    </div>
  </div>
</section>

<div class="container">
  <section class="tech-grid">
    {{TECH_BADGES}}
  </section>
</div>

<footer style="background: var(--border); color: #fff; padding: 80px 40px; text-align: center;">
  <div style="font-family: var(--display); font-size: 48px; margin-bottom: 20px;">STAY TUNED.</div>
  <div style="opacity: 0.6; font-size: 14px;">&copy; {{YEAR}} — Showcaise Vibrant Pro</div>
</footer>

</body>
</html>`
};
