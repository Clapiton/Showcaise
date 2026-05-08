export const BASE_CSS = `
:root {
  --gray-1: #f5f5f3;
  --gray-2: #e8e8e4;
  --gray-3: #9a9a94;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--body);
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; height: auto; display: block; }
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 40px);
}
.section { padding: clamp(40px, 10vw, 80px) 0; }
.bg-2 { background: var(--bg-2); }
.eyebrow {
  display: block;
  font-family: var(--body);
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 16px;
}
h2 {
  font-family: var(--display);
  font-size: clamp(28px, 5vw, 54px);
  font-weight: 800; letter-spacing: -0.02em;
  line-height: 1.1; color: var(--text);
  margin-bottom: 32px;
}
@media (max-width: 768px) {
  .container { padding: 0 24px; }
  .section { padding: 60px 0; }
}
`;

export const SHARED_SECTION_CSS = `
/* Feature Cards */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.feature-card {
  background: var(--bg-2);
  border: 1px solid var(--border);
  padding: 40px;
  border-radius: 24px;
  transition: transform 0.3s ease;
}
.feature-card:hover { transform: translateY(-5px); }
.feature-icon { font-size: 32px; margin-bottom: 24px; }
.feature-title { font-family: var(--display); font-size: 20px; font-weight: 700; margin-bottom: 12px; }
.feature-desc { font-size: 15px; color: var(--muted); line-height: 1.6; }

/* Impact Band */
.impact-band {
  background: var(--accent);
  color: var(--bg);
  padding: clamp(60px, 10vw, 100px) 0;
}
.impact-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 40px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}
.impact-title { font-family: var(--display); font-size: clamp(32px, 5vw, 48px); font-weight: 800; max-width: 500px; line-height: 1; }
.impact-metrics { display: flex; gap: clamp(24px, 5vw, 64px); }
.impact-n { font-family: var(--display); font-size: clamp(40px, 6vw, 56px); font-weight: 800; margin-bottom: 4px; }
.impact-l { font-size: 13px; opacity: 0.8; }

@media (max-width: 900px) {
  .impact-inner { flex-direction: column; text-align: center; }
  .impact-title { max-width: 100%; }
  .impact-metrics { justify-content: center; width: 100%; }
}

@media (max-width: 600px) {
  .impact-metrics { flex-direction: column; gap: 32px; }
  .features-grid { grid-template-columns: 1fr; }
}

/* Tech Grid */
.tech-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.tech-badge {
  padding: 8px 16px;
  border-radius: 100px;
  border: 1px solid var(--border);
  font-size: 13px; font-weight: 500;
  display: flex; align-items: center; gap: 6px;
}
.tech-dot { width: 6px; height: 6px; border-radius: 50%; }

/* Bullet List */
.bullet-list { list-style: none; }
.bullet-list li {
  position: relative;
  padding-left: 28px;
  margin-bottom: 12px;
  font-size: 15px;
  line-height: 1.5;
}
.bullet-list li::before {
  content: '';
  position: absolute; left: 0; top: 9px;
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
}
`;
