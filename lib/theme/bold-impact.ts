import { Theme } from './types';

export const boldImpact: Theme = {
    id: 'bold-impact',
    name: 'Bold Impact',
    signature: 'Split hero, large stat numbers up front, bento feature grid, accent dividers',
    mockupStyle: 'grid',
    supportedPlatforms: ['Mobile', 'Desktop', 'Web'],
    sectionOrder: ['hero', 'stats', 'problem', 'features', 'process', 'result', 'tech'],
    requiredTokens: ['PRIMARY_COLOR', 'ACCENT_COLOR', 'BG_COLOR', 'DISPLAY_FONT', 'BODY_FONT'],
    scaffold: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>{{APP_NAME}}</title>
<link href="https://fonts.googleapis.com/css2?family={{DISPLAY_FONT}}:wght@700;800;900&family={{BODY_FONT}}:wght@400;500&display=swap" rel="stylesheet"/>
<style>
{{BASE_CSS}}
:root {
  --primary: {{PRIMARY_COLOR}};
  --accent:  {{ACCENT_COLOR}};
  --bg:      {{BG_COLOR}};
  --bg-2:    {{BG_2_COLOR}};
  --text:    {{TEXT_COLOR}};
  --muted:   {{TEXT_MUTED_COLOR}};
  --border:  {{BORDER_COLOR}};
  --display: '{{DISPLAY_FONT}}', sans-serif;
  --body:    '{{BODY_FONT}}', sans-serif;
}
/* BOLD IMPACT: split layout hero */
.hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
  padding: 120px 80px;
  background: var(--bg);
  position: relative;
}
.hero::after {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 50%; height: 100%;
  background: color-mix(in srgb, var(--accent) 6%, var(--bg-2));
  z-index: 0;
}
.hero-left { position: relative; z-index: 1; }
.hero-right { position: relative; z-index: 1; display: flex; justify-content: center; }
.hero h1 {
  font-family: var(--display);
  font-size: clamp(48px, 5.5vw, 80px);
  font-weight: 900; letter-spacing: -0.04em;
  line-height: 1; color: var(--text);
  margin-bottom: 24px;
}
/* Stats FIRST — above the fold */
.stats-band {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.stats-band-cell {
  padding: 48px 32px;
  border-right: 1px solid var(--border);
  text-align: center;
}
.stats-band-cell:last-child { border-right: none; }
.big-number {
  font-family: var(--display);
  font-size: clamp(40px, 5vw, 72px);
  font-weight: 900;
  color: var(--accent);
  letter-spacing: -0.04em;
  line-height: 1;
}
/* Bento feature grid */
.bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  gap: 16px;
  margin-top: 48px;
}
.bento-card {
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px;
  background: var(--bg-2);
  transition: border-color 0.3s, transform 0.3s;
}
.bento-card:hover { border-color: var(--accent); transform: translateY(-4px); }
.bento-card.wide  { grid-column: span 4; }
.bento-card.tall  { grid-column: span 2; grid-row: span 2; }
.bento-card.half  { grid-column: span 3; }
.bento-card.third { grid-column: span 2; }
/* Accent divider between sections */
.accent-rule {
  height: 2px;
  background: linear-gradient(to right, var(--accent), transparent);
  margin: 0 80px;
}
{{SHARED_SECTION_CSS}}
</style>
</head>
<body>
<!-- SPLIT HERO -->
<section class="hero">
  <div class="hero-left">{{HERO_CONTENT}}</div>
  <div class="hero-right">
    <div class="mockup-stage" style="height:500px;width:100%;position:relative;">
      {{PHONE_FRAMES}}
    </div>
  </div>
</section>
{{PHONE_POSITIONS_CSS_INLINE}}
<!-- STATS BAND — immediately below hero -->
<div class="stats-band">{{STATS_CELLS}}</div>
<div class="accent-rule"></div>
<!-- PROBLEM -->
<section class="section">
  <div class="container">
    <span class="eyebrow">The Problem</span>
    <h2>{{PROBLEM_HEADING}}</h2>
    <div class="two-col-text">{{PROBLEM_BULLETS}}</div>
  </div>
</section>
<!-- BENTO FEATURES -->
<section class="section bg-2">
  <div class="container">
    <span class="eyebrow">Features</span>
    <h2>{{FEATURES_HEADING}}</h2>
    <div class="bento">{{BENTO_CARDS}}</div>
  </div>
</section>
<div class="accent-rule"></div>
<!-- PROCESS -->
<section class="section">
  <div class="container">
    <span class="eyebrow">How We Built It</span>
    <div class="process-grid">{{PROCESS_COLUMNS}}</div>
  </div>
</section>
<!-- RESULT -->
<section class="section bg-2">
  <div class="container">
    <span class="eyebrow">The Result</span>
    <h2>{{RESULT_HEADING}}</h2>
    <div class="bullet-list">{{RESULT_BULLETS}}</div>
  </div>
</section>
<!-- IMPACT -->
<div class="impact-band">
  <div class="impact-inner">
    <div class="impact-title">{{IMPACT_TITLE}}</div>
    <div class="impact-metrics">{{IMPACT_METRICS}}</div>
  </div>
</div>
<!-- TECH -->
<section class="section">
  <div class="container">
    <span class="eyebrow">Built With</span>
    <div class="tech-grid">{{TECH_BADGES}}</div>
  </div>
</section>
</body>
</html>`
};