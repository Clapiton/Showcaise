import { Theme } from './types';

export const magazine: Theme = {
    id: 'magazine',
    name: 'Magazine Editorial',
    signature: 'Asymmetric editorial layout, large chapter headings, pull quotes, serif elegance',
    mockupStyle: 'scroll',
    supportedPlatforms: ['Mobile', 'Desktop', 'Web'],
    sectionOrder: ['hero', 'stats', 'narrative', 'features', 'screens', 'process', 'result', 'tech'],
    requiredTokens: ['PRIMARY_COLOR', 'ACCENT_COLOR', 'BG_COLOR', 'DISPLAY_FONT', 'BODY_FONT'],
    scaffold: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>{{APP_NAME}} — Volume I</title>
<link href="https://fonts.googleapis.com/css2?family={{DISPLAY_FONT}}:ital,wght@0,400;0,700;0,900;1,400;1,700&family={{BODY_FONT}}:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
{{BASE_CSS}}
:root {
  --primary: {{PRIMARY_COLOR}};
  --accent:  {{ACCENT_COLOR}};
  --accent-soft: color-mix(in srgb, var(--accent) 15%, transparent);
  --bg:      {{BG_COLOR}};
  --bg-2:    {{BG_2_COLOR}};
  --text:    {{TEXT_COLOR}};
  --muted:   {{TEXT_MUTED_COLOR}};
  --border:  {{BORDER_COLOR}};
  --display: '{{DISPLAY_FONT}}', serif;
  --body:    '{{BODY_FONT}}', sans-serif;
}

body {
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
}

/* ── PAPER TEXTURE ── */
body::after {
  content: "";
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
  opacity: 0.03;
  pointer-events: none;
  z-index: 1000;
}

/* ── HERO ── */
.hero {
  min-height: 100vh;
  padding: 100px 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  background: var(--bg);
}

.hero-bg-accent {
  position: absolute;
  top: 0; right: 0;
  width: 40%; height: 100%;
  background: var(--accent);
  opacity: 0.03;
  clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 1000px;
}

.hero-issue {
  font-family: var(--display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.hero-issue::after {
  content: "";
  height: 2px;
  width: 60px;
  background: var(--accent);
}

.hero h1 {
  font-family: var(--display);
  font-size: clamp(60px, 12vw, 160px);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.05em;
  color: var(--text);
  margin-bottom: 48px;
}

.hero h1 em {
  font-style: italic;
  font-weight: 400;
  color: var(--accent);
}

.hero p {
  font-size: 24px;
  font-weight: 300;
  line-height: 1.5;
  color: var(--muted);
  max-width: 600px;
}

/* ── CHAPTERS ── */
.chapter {
  display: flex;
  gap: 80px;
  padding: 120px 0;
  border-top: 1px solid var(--border);
}

.chapter-sidebar {
  width: 200px;
  flex-shrink: 0;
}

.chapter-number {
  font-family: var(--display);
  font-size: 120px;
  font-weight: 900;
  line-height: 0.8;
  color: var(--accent-soft);
  margin-bottom: 24px;
  display: block;
}

.chapter-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--muted);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  margin-left: auto;
  display: block;
  height: 100px;
}

.chapter-content {
  flex: 1;
}

.chapter-content h2 {
  font-family: var(--display);
  font-size: clamp(40px, 5vw, 72px);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 48px;
  color: var(--text);
}

/* ── PULL QUOTE ── */
.pull-quote {
  font-family: var(--display);
  font-size: clamp(24px, 3vw, 40px);
  font-style: italic;
  line-height: 1.3;
  color: var(--text);
  margin: 60px 0;
  padding: 40px;
  background: var(--bg-2);
  position: relative;
  border-radius: 4px;
}

.pull-quote::before {
  content: "“";
  position: absolute;
  top: -20px; left: 20px;
  font-size: 100px;
  color: var(--accent);
  opacity: 0.2;
}

/* ── SCREEN SHOWCASES ── */
.screen-showcase {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 100px;
  align-items: center;
  margin-bottom: 120px;
}

.screen-showcase.flip {
  grid-template-columns: 0.8fr 1.2fr;
}

.screen-img {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.15);
  transform: rotate(-1deg);
  transition: transform 0.4s ease;
}

.screen-showcase.flip .screen-img {
  transform: rotate(1deg);
}

.screen-img:hover { transform: rotate(0deg) scale(1.02); }

.screen-img img { width: 100%; display: block; }

.screen-content h3 {
  font-family: var(--display);
  font-size: 32px;
  margin-bottom: 24px;
}

/* ── STATS MAGAZINE ── */
.stats-mag {
  display: flex;
  justify-content: space-between;
  padding: 80px 0;
  border-bottom: 2px solid var(--text);
  margin-bottom: 100px;
}

.stat-cell {
  text-align: left;
}

.stat-n {
  font-family: var(--display);
  font-size: 80px;
  font-weight: 900;
  line-height: 1;
  color: var(--text);
  margin-bottom: 8px;
}

.stat-l {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent);
}

/* ── BENTO MAGAZINE ── */
.features-mag {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.feature-card {
  padding: 40px;
  border-bottom: 1px solid var(--border);
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 32px;
  color: var(--accent);
}

.feature-title {
  font-family: var(--display);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.feature-desc {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.6;
}

/* ── IMPACT ── */
.impact-mag {
  background: var(--text);
  color: var(--bg);
  padding: 120px 80px;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 100px;
}

.impact-mag-title {
  font-family: var(--display);
  font-size: 80px;
  font-weight: 900;
  line-height: 0.9;
}

.impact-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.impact-n {
  font-family: var(--display);
  font-size: 60px;
  font-weight: 900;
  color: var(--accent);
}

@media (max-width: 1100px) {
  .hero { padding: 80px 40px; }
  .chapter { flex-direction: column; gap: 40px; }
  .chapter-sidebar { width: 100%; display: flex; align-items: flex-end; justify-content: space-between; }
  .chapter-label { writing-mode: horizontal-tb; transform: none; height: auto; }
  .screen-showcase, .screen-showcase.flip { grid-template-columns: 1fr; gap: 40px; }
  .stats-mag { flex-wrap: wrap; gap: 40px; }
  .features-mag { grid-template-columns: 1fr 1fr; }
  .impact-mag { grid-template-columns: 1fr; }
}

{{SHARED_SECTION_CSS}}
</style>
</head>
<body>

<section class="hero">
  <div class="hero-bg-accent"></div>
  <div class="hero-content">
    <div class="hero-issue">Case Study / Vol. 01</div>
    {{HERO_CONTENT}}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="stats-mag">
      {{STATS_CELLS}}
    </div>

    <div class="chapter">
      <div class="chapter-sidebar">
        <span class="chapter-number">01</span>
        <span class="chapter-label">The Vision</span>
      </div>
      <div class="chapter-content">
        <h2>{{PROBLEM_HEADING}}</h2>
        <div class="pull-quote">{{PROBLEM_PULLQUOTE}}</div>
        <ul class="bullet-list" style="columns: 2;">
          {{PROBLEM_BULLETS}}
        </ul>
      </div>
    </div>

    <div class="chapter">
      <div class="chapter-sidebar">
        <span class="chapter-number">02</span>
        <span class="chapter-label">The Craft</span>
      </div>
      <div class="chapter-content">
        <h2>{{SOLUTION_HEADING}}</h2>
        <ul class="bullet-list">
          {{SOLUTION_BULLETS}}
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section bg-2">
  <div class="container">
    {{SCREEN_SHOWCASES}}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="chapter">
      <div class="chapter-sidebar">
        <span class="chapter-number">03</span>
        <span class="chapter-label">Details</span>
      </div>
      <div class="chapter-content">
        <h2 style="margin-bottom: 80px;">{{FEATURES_HEADING}}</h2>
        <div class="features-mag">
          {{FEATURE_CARDS}}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="impact-mag">
  <div class="impact-mag-title">{{IMPACT_TITLE}}</div>
  <div class="impact-metrics">
    {{IMPACT_METRICS}}
  </div>
</section>

<section class="section">
  <div class="container">
    <span class="eyebrow">Engineered With</span>
    <div class="tech-grid" style="margin-top: 40px;">
      {{TECH_BADGES}}
    </div>
  </div>
</section>

<footer class="section" style="border-top: 1px solid var(--border); padding: 60px 0;">
  <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
    <div style="font-family: var(--display); font-size: 24px; font-weight: 900;">Showcaise Editorial</div>
    <div style="font-size: 12px; opacity: 0.5;">&copy; {{YEAR}} / AI-Driven Creative Portfolio</div>
  </div>
</footer>

</body>
</html>`
};