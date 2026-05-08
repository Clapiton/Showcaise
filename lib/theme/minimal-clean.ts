import { Theme } from './types';

export const minimalClean: Theme = {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    signature: 'Huge whitespace, single column, floating phone, obsessively clean typography',
    sectionOrder: ['hero', 'screens', 'problem', 'solution', 'features', 'result', 'tech'],
    requiredTokens: ['PRIMARY_COLOR', 'BG_COLOR', 'DISPLAY_FONT', 'BODY_FONT'],
    scaffold: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>{{APP_NAME}} — Case Study</title>
<link href="https://fonts.googleapis.com/css2?family={{DISPLAY_FONT}}:wght@300;400;500;600;700&family={{BODY_FONT}}:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
{{BASE_CSS}}
:root {
  --primary: {{PRIMARY_COLOR}};
  --accent:  {{ACCENT_COLOR}};
  --bg:      {{BG_COLOR}};
  --bg-2:    #fcfcfc;
  --text:    {{TEXT_COLOR}};
  --muted:   {{TEXT_MUTED_COLOR}};
  --border:  {{BORDER_COLOR}};
  --display: '{{DISPLAY_FONT}}', sans-serif;
  --body:    '{{BODY_FONT}}', sans-serif;
}

body {
  background: #ffffff;
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 40px;
}

/* ── HERO ── */
.hero {
  padding: 200px 0 120px;
  text-align: center;
}

.hero-eyebrow {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 32px;
}

.hero h1 {
  font-family: var(--display);
  font-size: clamp(54px, 8vw, 96px);
  font-weight: 600;
  margin-bottom: 40px;
  letter-spacing: -0.04em;
  line-height: 1;
}

.hero p {
  font-size: 24px;
  font-weight: 300;
  color: var(--muted);
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ── FLOATING MOCKUP ── */
.floating-mockup {
  padding: 120px 0;
  display: flex;
  justify-content: center;
  perspective: 1200px;
}

.phone-frame {
  width: 320px;
  height: 660px;
  border-radius: 54px;
  border: 1px solid var(--border);
  box-shadow: 0 60px 120px rgba(0,0,0,0.06);
  background: #fff;
  overflow: hidden;
  animation: float-clean 8s ease-in-out infinite;
}

@keyframes float-clean {
  0%, 100% { transform: translateY(0) rotateY(0) rotateX(2deg); }
  50% { transform: translateY(-30px) rotateY(2deg) rotateX(-2deg); }
}

.phone-frame img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: top;
}

/* ── SECTIONS ── */
.section {
  padding: 160px 0;
}

.section-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 40px;
  display: block;
}

h2 {
  font-family: var(--display);
  font-size: 42px;
  font-weight: 600;
  margin-bottom: 48px;
  letter-spacing: -0.02em;
}

/* ── BULLETS ── */
.bullet-list {
  list-style: none;
  padding: 0;
}

.bullet-list li {
  font-size: 18px;
  font-weight: 300;
  color: var(--text);
  margin-bottom: 32px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.bullet-list li::before {
  content: "—";
  color: var(--accent);
  font-weight: 700;
}

/* ── FEATURES ── */
.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;
}

.feature-card {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateX(10px);
}

.feature-icon {
  width: 64px; height: 64px;
  display: flex; align-items: center; justify-content: center;
  font-size: 32px;
  background: var(--bg-2);
  border-radius: 20px;
  flex-shrink: 0;
}

.feature-title {
  font-family: var(--display);
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
}

.feature-desc {
  font-size: 16px;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.7;
}

/* ── IMPACT ── */
.impact-clean {
  padding: 160px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  text-align: center;
}

.stat-n {
  font-family: var(--display);
  font-size: 72px;
  font-weight: 300;
  letter-spacing: -0.05em;
  margin-bottom: 12px;
}

.stat-l {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}

/* ── TECH ── */
.tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 40px;
}

.tech-tag {
  font-size: 15px;
  font-weight: 500;
  color: var(--text);
  padding: 12px 24px;
  background: var(--bg-2);
  border-radius: 100px;
  border: 1px solid var(--border);
}

@media (max-width: 800px) {
  .hero { padding: 120px 0 80px; }
  .hero h1 { font-size: 48px; }
  .feature-card { flex-direction: column; gap: 20px; }
  .impact-grid { grid-template-columns: 1fr; gap: 80px; }
  .stat-n { font-size: 60px; }
}

{{SHARED_SECTION_CSS}}
</style>
</head>
<body>

<div class="container">
  <header class="hero">
    <div class="hero-eyebrow">Minimal Showcase</div>
    {{HERO_CONTENT}}
  </header>

  <div class="floating-mockup">
    {{PHONE_FRAMES}}
  </div>

  <section class="section">
    <span class="section-label">Challenge</span>
    <h2>{{PROBLEM_HEADING}}</h2>
    <ul class="bullet-list">
      {{PROBLEM_BULLETS}}
    </ul>
  </section>

  <section class="section">
    <span class="section-label">Approach</span>
    <h2>{{SOLUTION_HEADING}}</h2>
    <ul class="bullet-list">
      {{SOLUTION_BULLETS}}
    </ul>
  </section>

  <section class="section">
    <span class="section-label">Experience</span>
    <div class="features-grid">
      {{FEATURE_CARDS}}
    </div>
  </section>

  <section class="impact-clean">
    <div class="impact-grid">
      {{IMPACT_METRICS}}
    </div>
  </section>

  <section class="section">
    <span class="section-label">Stack</span>
    <div class="tech-row">
      {{TECH_BADGES}}
    </div>
  </section>

  <footer style="padding: 100px 0; border-top: 1px solid var(--border); display: flex; justify-content: space-between; font-size: 13px; color: var(--muted);">
    <div>{{APP_NAME}}</div>
    <div>&copy; {{YEAR}}</div>
  </footer>
</div>

</body>
</html>`
};
