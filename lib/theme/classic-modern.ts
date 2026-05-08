import { Theme } from './types';

export const classicModern: Theme = {
    id: 'classic-modern',
    name: 'Classic Modern',
    signature: 'High-fidelity showcase with floating mockups, timeline-driven story, and clean stats.',
    mockupStyle: 'fanned',
    supportedPlatforms: ['Mobile', 'Desktop', 'Web'],
    sectionOrder: ['hero', 'stats', 'process', 'timeline', 'features', 'impact', 'tech'],
    requiredTokens: ['PRIMARY_COLOR', 'ACCENT_COLOR', 'BG_COLOR', 'DISPLAY_FONT', 'BODY_FONT'],
    scaffold: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>{{APP_NAME}} — Case Study</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family={{DISPLAY_FONT}}:wght@400;600;700;800&family={{BODY_FONT}}:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet"/>
<style>
{{BASE_CSS}}
:root {
  --primary:    {{PRIMARY_COLOR}};
  --secondary:  {{SECONDARY_COLOR}};
  --accent:     {{ACCENT_COLOR}};
  --accent-dim: {{ACCENT_COLOR}}22;
  --accent-mid: {{ACCENT_COLOR}}44;
  --bg:         {{BG_COLOR}};
  --bg-2:       {{BG_2_COLOR}};
  --text:       {{TEXT_COLOR}};
  --text-muted: {{TEXT_MUTED_COLOR}};
  --border:     {{BORDER_COLOR}};
  --font-display: '{{DISPLAY_FONT}}', sans-serif;
  --font-body:    '{{BODY_FONT}}', sans-serif;
}

/* ── TOP BAR ── */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px clamp(20px, 5vw, 60px);
  border-bottom: 1px solid var(--border);
}
@media (max-width: 768px) {
  .topbar { flex-direction: column; gap: 16px; text-align: center; }
}
.topbar-logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 18px;
  letter-spacing: -0.5px;
  color: var(--text);
}
.topbar-logo span { color: var(--accent); }
.topbar-tags {
  display: flex;
  gap: 10px;
}
.tag {
  font-size: 11px;
  font-weight: 500;
  padding: 5px 14px;
  border-radius: 100px;
  border: 1px solid var(--border);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* ── HERO ── */
.hero {
  background: var(--bg);
  padding: 80px 60px 0;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  top: -120px; left: 50%;
  transform: translateX(-50%);
  width: 700px; height: 700px;
  background: radial-gradient(circle, {{ACCENT_COLOR}}18 0%, transparent 70%);
  pointer-events: none;
}
.hero-header {
  text-align: center;
  position: relative;
  z-index: 2;
  margin-bottom: 64px;
}
.hero-eyebrow {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(48px, 6vw, 88px);
  font-weight: 800;
  color: var(--text);
  line-height: 0.95;
  letter-spacing: -2px;
  margin-bottom: 24px;
}
.hero-title em {
  font-style: normal;
  color: var(--accent);
}
.hero-sub {
  font-size: 15px;
  font-weight: 300;
  color: var(--text-muted);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── MOCKUP STAGE ── */
.mockup-stage {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 440px;
  z-index: 2;
}
.phone-frame {
  position: absolute;
  bottom: 0;
  border-radius: 36px;
  border: 2px solid var(--border);
  overflow: hidden;
  background: var(--bg-2);
  box-shadow: 0 40px 80px rgba(0,0,0,0.1), 0 0 0 1px var(--border);
  transition: transform 0.3s ease;
}
.phone-frame:hover { transform: translateY(-8px) !important; }
.dashboard-frame { border-color: var(--accent); box-shadow: 0 40px 100px color-mix(in srgb, var(--accent) 15%, transparent); }
.phone-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

{{PHONE_POSITIONS_CSS}}

/* ── STATS ROW ── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.stat-cell {
  background: var(--bg);
  padding: 40px 32px;
  text-align: center;
}
.stat-n {
  font-family: var(--font-display);
  font-size: 52px;
  font-weight: 800;
  color: var(--text);
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: -2px;
}
.stat-n span { color: var(--accent); }
.stat-l {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 400;
  line-height: 1.4;
}

/* ── PROCESS ── */
.process-title {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 36px;
}
.process-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.process-pill {
  border-radius: 100px;
  padding: 14px 24px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  margin-bottom: 14px;
  background: var(--bg-2);
}
.process-item {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 13px;
  color: var(--text);
  margin-bottom: 10px;
  text-align: center;
  font-weight: 400;
}

/* ── TIMELINE ── */
.timeline-wrap {
  display: flex;
  gap: 60px;
}
.timeline-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6px;
  flex-shrink: 0;
}
.timeline-node {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--text);
  color: var(--bg);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 14px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}
.timeline-dash {
  width: 2px;
  flex: 1;
  background: repeating-linear-gradient(to bottom, var(--border) 0, var(--border) 6px, transparent 6px, transparent 12px);
  margin: 8px 0;
  min-height: 60px;
}
.timeline-content { flex: 1; padding-bottom: 64px; }
.timeline-eyebrow {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 10px;
}
.timeline-heading {
  font-family: var(--font-display);
  font-size: clamp(28px, 3vw, 44px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 28px;
  color: var(--text);
}
.timeline-bullets { list-style: none; }
.timeline-bullets li {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.65;
  color: var(--text);
  margin-bottom: 18px;
}
.bullet-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--text);
  flex-shrink: 0;
  margin-top: 8px;
}
.bullet-dot.accent { background: var(--accent); }

/* ── FEATURES GRID ── */
.features-eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}
.features-heading {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 54px);
  font-weight: 800;
  letter-spacing: -1.5px;
  color: var(--text);
  margin-bottom: 56px;
  line-height: 1.05;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.feature-card {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px 28px;
  transition: border-color 0.3s, transform 0.3s;
  cursor: default;
}
.feature-card:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
}
.feature-icon {
  width: 48px; height: 48px;
  border-radius: 14px;
  background: var(--accent-dim);
  border: 1px solid var(--accent-mid);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  margin-bottom: 20px;
}
.feature-title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
}
.feature-desc {
  font-size: 13px;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ── RESULT BAND ── */
.result-band {
  background: var(--accent);
  padding: 64px 60px;
  display: flex;
  align-items: center;
  gap: 80px;
}
.result-band-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 4vw, 60px);
  font-weight: 800;
  color: var(--bg);
  letter-spacing: -2px;
  line-height: 1;
  flex-shrink: 0;
  max-width: 340px;
}
.result-items { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; flex: 1; }
.result-n {
  font-family: var(--font-display);
  font-size: 42px;
  font-weight: 800;
  color: var(--bg);
  letter-spacing: -2px;
  line-height: 1;
  margin-bottom: 6px;
}
.result-l { font-size: 13px; color: var(--bg); opacity: 0.8; font-weight: 400; }

/* ── TECH STACK ── */
.tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}
.tech-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  background: var(--bg);
  color: var(--text);
}
.tech-dot { width: 8px; height: 8px; border-radius: 50%; }

/* ── FOOTER ── */
.footer {
  padding: 48px 60px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-brand {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 20px;
  letter-spacing: -0.5px;
  color: var(--text);
}
.footer-brand span { color: var(--accent); }
.footer-meta { font-size: 12px; color: var(--gray-3); }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .hero { padding: 60px 32px 0; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .process-grid { grid-template-columns: 1fr; gap: 24px; }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .result-band { flex-direction: column; gap: 40px; padding: 48px 32px; }
  .result-items { grid-template-columns: repeat(3, 1fr); width: 100%; }
  .result-band-title { max-width: 100%; }
  .timeline-wrap { gap: 28px; }
  .footer { flex-direction: column; gap: 12px; text-align: center; padding: 36px 32px; }
  .topbar { padding: 20px 32px; }
  .topbar-tags { display: none; }
  .mockup-stage { height: 360px; }
}

@media (max-width: 600px) {
  .hero { padding: 48px 20px 0; }
  .hero-title { letter-spacing: -1px; }
  .mockup-stage { height: 320px; }
  .stats-row { grid-template-columns: repeat(2, 1fr); border-radius: 12px; }
  .stat-cell { padding: 28px 16px; }
  .stat-n { font-size: 36px; }
  .process-grid { grid-template-columns: 1fr; }
  .features-grid { grid-template-columns: 1fr; }
  .result-band { padding: 48px 20px; gap: 32px; }
  .result-items { grid-template-columns: 1fr; gap: 24px; }
  .result-n { font-size: 36px; }
  .timeline-wrap { gap: 16px; }
  .timeline-heading { font-size: 26px; }
  .timeline-node { width: 30px; height: 30px; font-size: 12px; }
  .tech-row { gap: 8px; }
  .tech-badge { font-size: 12px; padding: 8px 14px; }
  .topbar { padding: 16px 20px; }
  .footer { padding: 32px 20px; }
}

{{SHARED_SECTION_CSS}}
</style>
</head>
<body>

<!-- TOP BAR -->
<div class="topbar">
  <div class="topbar-logo">{{LOGO_TEXT}}<span>.</span></div>
  <div class="topbar-tags">
    {{TOPBAR_TAGS}}
  </div>
</div>

<!-- HERO -->
<section class="hero">
  <div class="hero-header">
    {{HERO_CONTENT}}
  </div>

  <!-- MOCKUP STAGE -->
  <div class="mockup-stage" id="mockup-stage">
    {{PHONE_FRAMES}}
  </div>
</section>

<!-- STATS -->
<section class="section">
  <div class="container">
    <div class="stats-row">
      {{STATS_CELLS}}
    </div>
  </div>
</section>

<!-- PROCESS -->
<section class="section bg-2">
  <div class="container">
    <p class="process-title">Development Process</p>
    <div class="process-grid">
      {{PROCESS_COLUMNS}}
    </div>
  </div>
</section>

<!-- CASE STUDY TIMELINE -->
<section class="section">
  <div class="container">
    {{TIMELINE_ITEMS}}
  </div>
</section>

<!-- FEATURES -->
<section class="section bg-2">
  <div class="container">
    <p class="features-eyebrow">The Product</p>
    <h2 class="features-heading">{{FEATURES_HEADING}}</h2>
    <div class="features-grid">
      {{FEATURE_CARDS}}
    </div>
  </div>
</section>

<!-- RESULT BAND -->
<div class="result-band">
  <div class="result-band-title">{{IMPACT_TITLE}}</div>
  <div class="result-items">
    {{IMPACT_METRICS}}
  </div>
</div>

<!-- TECH STACK -->
<section class="section">
  <div class="container">
    <p class="process-title">Engineered With</p>
    <div class="tech-row">
      {{TECH_BADGES}}
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="footer-brand">{{LOGO_TEXT}}<span>.</span></div>
  <div class="footer-meta">AI-Generated Case Study &bull; {{YEAR}}</div>
</footer>

</body>
</html>`
};
