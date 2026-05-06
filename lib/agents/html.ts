// lib/agents/html.ts

import { ModelConfig, getClient } from '../model-router';
import { DesignOutput } from './design';
import { CopyOutput } from './copy';

// ─── The scaffold with named slots ───────────────────────────
// ─── BASE STYLES & SHARED UTILS ─────────────────────────────
const BASE_HEAD = `
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>{{APP_NAME}} — Case Study</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family={{DISPLAY_FONT}}:wght@400;600;700;800&family={{BODY_FONT}}:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet"/>
<style>
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
  --gray-1:     #f5f5f3;
  --gray-2:     #e8e8e4;
  --gray-3:     #9a9a94;
  --font-display: '{{DISPLAY_FONT_NAME}}', sans-serif;
  --font-body:    '{{BODY_FONT_NAME}}', sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.section { padding: 80px 60px; }
@media (max-width: 900px) { .section { padding: 60px 32px; } }
@media (max-width: 600px) { .section { padding: 48px 20px; } }
</style>
`;

// ─── TEMPLATE 1: EDITORIAL (High Contrast, Bold) ────────────
const TEMPLATE_EDITORIAL = `
<!DOCTYPE html>
<html lang="en">
<head>
${BASE_HEAD}
<style>
.topbar { display: flex; justify-content: space-between; align-items: center; padding: 24px 60px; border-bottom: 1px solid var(--border); }
.topbar-logo { font-family: var(--font-display); font-weight: 800; font-size: 18px; letter-spacing: -0.5px; color: var(--text); }
.topbar-logo span { color: var(--accent); }
.tag { font-size: 11px; font-weight: 500; padding: 5px 14px; border-radius: 100px; border: 1px solid var(--border); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }

.hero { background: var(--bg); padding: 80px 60px 0; position: relative; overflow: hidden; }
.hero::before { content: ''; position: absolute; top: -120px; left: 50%; transform: translateX(-50%); width: 700px; height: 700px; background: radial-gradient(circle, {{ACCENT_COLOR}}18 0%, transparent 70%); pointer-events: none; }
.hero-header { text-align: center; position: relative; z-index: 2; margin-bottom: 64px; }
.hero-eyebrow { font-family: var(--font-body); font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
.hero-title { font-family: var(--font-display); font-size: clamp(48px, 6vw, 88px); font-weight: 800; color: var(--text); line-height: 0.95; letter-spacing: -2px; margin-bottom: 24px; }
.hero-title em { font-style: normal; color: var(--accent); }
.hero-sub { font-size: 15px; font-weight: 300; color: var(--text-muted); max-width: 520px; margin: 0 auto; line-height: 1.7; }

.mockup-stage { position: relative; display: flex; justify-content: center; align-items: flex-end; height: 440px; z-index: 2; }
.phone { position: absolute; bottom: 0; border-radius: 36px; border: 2px solid var(--border); overflow: hidden; background: var(--bg-2); box-shadow: 0 40px 80px rgba(0,0,0,0.1), 0 0 0 1px var(--border); transition: transform 0.3s ease; }
.phone:hover { transform: translateY(-8px) !important; }
.phone-screen img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
{{PHONE_POSITIONS_CSS}}

.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
.stat-cell { background: var(--bg); padding: 40px 32px; text-align: center; }
.stat-n { font-family: var(--font-display); font-size: 52px; font-weight: 800; color: var(--text); line-height: 1; margin-bottom: 8px; letter-spacing: -2px; }
.stat-n span { color: var(--accent); }
.stat-l { font-size: 13px; color: var(--text-muted); font-weight: 400; line-height: 1.4; }

.process-title { font-family: var(--font-display); font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 36px; }
.process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.process-pill { border-radius: 100px; padding: 14px 24px; font-family: var(--font-display); font-weight: 700; font-size: 14px; text-align: center; margin-bottom: 14px; }
.process-item { background: var(--bg); border: 1px solid var(--border); border-radius: 12px; padding: 14px 18px; font-size: 13px; color: var(--text); margin-bottom: 10px; text-align: center; font-weight: 400; }

.timeline-wrap { display: flex; gap: 60px; }
.timeline-line { display: flex; flex-direction: column; align-items: center; padding-top: 6px; flex-shrink: 0; }
.timeline-node { width: 36px; height: 36px; border-radius: 50%; background: var(--text); color: var(--bg); font-family: var(--font-display); font-weight: 800; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; z-index: 2; }
.timeline-dash { width: 2px; flex: 1; background: repeating-linear-gradient(to bottom, var(--border) 0, var(--border) 6px, transparent 6px, transparent 12px); margin: 8px 0; min-height: 60px; }
.timeline-content { flex: 1; padding-bottom: 64px; }
.timeline-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; }
.timeline-heading { font-family: var(--font-display); font-size: clamp(28px, 3vw, 44px); font-weight: 800; line-height: 1.1; letter-spacing: -1px; margin-bottom: 28px; color: var(--text); }
.timeline-bullets { list-style: none; }
.timeline-bullets li { display: flex; gap: 14px; align-items: flex-start; font-size: 15px; font-weight: 300; line-height: 1.65; color: var(--text); margin-bottom: 18px; }
.bullet-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--text); flex-shrink: 0; margin-top: 8px; }
.bullet-dot.accent { background: var(--accent); }

.features-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
.features-heading { font-family: var(--font-display); font-size: clamp(32px, 4vw, 54px); font-weight: 800; letter-spacing: -1.5px; color: var(--text); margin-bottom: 56px; line-height: 1.05; }
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.feature-card { background: var(--bg-2); border: 1px solid var(--border); border-radius: 20px; padding: 32px 28px; transition: border-color 0.3s, transform 0.3s; cursor: default; }
.feature-card:hover { border-color: var(--accent); transform: translateY(-4px); }
.feature-icon { width: 48px; height: 48px; border-radius: 14px; background: var(--accent-dim); border: 1px solid var(--accent-mid); display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 20px; }
.feature-title { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: var(--text); margin-bottom: 10px; }
.feature-desc { font-size: 13px; font-weight: 300; color: var(--text-muted); line-height: 1.6; }

.result-band { background: var(--accent); padding: 64px 60px; display: flex; align-items: center; gap: 80px; }
.result-band-title { font-family: var(--font-display); font-size: clamp(36px, 4vw, 60px); font-weight: 800; color: var(--bg); letter-spacing: -2px; line-height: 1; flex-shrink: 0; max-width: 340px; }
.result-items { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; flex: 1; }
.result-n { font-family: var(--font-display); font-size: 42px; font-weight: 800; color: var(--bg); letter-spacing: -2px; line-height: 1; margin-bottom: 6px; }
.result-l { font-size: 13px; color: var(--bg); opacity: 0.8; font-weight: 400; }

.tech-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
.tech-badge { display: flex; align-items: center; gap: 8px; padding: 10px 18px; border: 1px solid var(--border); border-radius: 100px; font-size: 13px; font-weight: 500; background: var(--bg); color: var(--text); }
.tech-dot { width: 8px; height: 8px; border-radius: 50%; }

.footer { padding: 48px 60px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
.footer-brand { font-family: var(--font-display); font-weight: 800; font-size: 20px; letter-spacing: -0.5px; color: var(--text); }
.footer-brand span { color: var(--accent); }
.footer-meta { font-size: 12px; color: var(--gray-3); }

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
  .mockup-stage { height: 360px; }
}
@media (max-width: 600px) {
  .hero { padding: 48px 20px 0; }
  .hero-title { letter-spacing: -1px; }
  .mockup-stage { height: 320px; }
  .stats-row { grid-template-columns: repeat(2, 1fr); border-radius: 12px; }
  .stat-cell { padding: 28px 16px; }
  .stat-n { font-size: 36px; }
  .result-band { padding: 48px 20px; gap: 32px; }
  .result-items { grid-template-columns: 1fr; gap: 24px; }
  .result-n { font-size: 36px; }
  .timeline-heading { font-size: 26px; }
  .topbar { padding: 16px 20px; }
}
</style>
</head>
<body>
  <div class="topbar">
    <div class="topbar-logo">{{LOGO_TEXT}}<span>.</span></div>
    <div class="topbar-tags">{{TOPBAR_TAGS}}</div>
  </div>
  <section class="hero">
    <div class="hero-header">{{HERO_CONTENT}}</div>
    <div class="mockup-stage" id="mockup-stage">{{PHONE_FRAMES_HTML}}</div>
  </section>
  {{SECTIONS}}
  <footer class="footer">
    <div class="footer-brand">{{LOGO_TEXT}}<span>.</span></div>
    <div class="footer-meta">AI-Generated Case Study &bull; {{YEAR}}</div>
  </footer>
</body>
</html>
`;

// ─── TEMPLATE 2: MODERN MINIMAL (Clean, Grid-based) ──────────
const TEMPLATE_MINIMAL = `
<!DOCTYPE html>
<html lang="en">
<head>
${BASE_HEAD}
<style>
.topbar { padding: 40px 60px; display: flex; justify-content: space-between; align-items: baseline; }
.topbar-logo { font-family: var(--font-display); font-weight: 700; font-size: 24px; color: var(--text); text-transform: uppercase; letter-spacing: 2px; }
.topbar-logo span { color: var(--accent); }

.hero { padding: 0 60px 100px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; min-height: 80vh; }
.hero-header { text-align: left; }
.hero-eyebrow { font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 12px; border-left: 2px solid var(--accent); padding-left: 12px; }
.hero-title { font-family: var(--font-display); font-size: clamp(40px, 5vw, 72px); font-weight: 700; line-height: 1.1; margin-bottom: 32px; }
.hero-sub { font-size: 18px; color: var(--text-muted); line-height: 1.6; max-width: 480px; }

.mockup-stage { position: relative; height: 600px; width: 100%; display: flex; align-items: center; justify-content: center; background: var(--bg-2); border-radius: 40px; overflow: hidden; }
.phone { position: absolute; border-radius: 24px; border: 1px solid var(--border); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
{{PHONE_POSITIONS_CSS}}

.stats-row { display: flex; gap: 40px; border-top: 1px solid var(--border); padding-top: 40px; }
.stat-cell { flex: 1; }
.stat-n { font-family: var(--font-display); font-size: 40px; font-weight: 700; color: var(--accent); margin-bottom: 4px; }
.stat-l { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); }

.feature-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; }
.feature-card { padding: 0; }
.feature-icon { font-size: 32px; margin-bottom: 24px; }
.feature-title { font-family: var(--font-display); font-size: 20px; font-weight: 600; margin-bottom: 12px; }
.feature-desc { color: var(--text-muted); line-height: 1.6; }

.footer { padding: 100px 60px 60px; text-align: center; }
.footer-brand { font-family: var(--font-display); font-size: 32px; font-weight: 700; margin-bottom: 24px; }

@media (max-width: 1024px) {
  .hero { grid-template-columns: 1fr; min-height: auto; padding-top: 40px; }
  .mockup-stage { height: 400px; }
}
</style>
</head>
<body>
  <div class="topbar">
    <div class="topbar-logo">{{LOGO_TEXT}}<span>.</span></div>
    <div class="tag-group">{{TOPBAR_TAGS}}</div>
  </div>
  <section class="hero">
    <div class="hero-header">{{HERO_CONTENT}}</div>
    <div class="mockup-stage">{{PHONE_FRAMES_HTML}}</div>
  </section>
  {{SECTIONS}}
  <footer class="footer">
    <div class="footer-brand">{{LOGO_TEXT}}</div>
    <div class="footer-meta">© {{YEAR}} Case Study</div>
  </footer>
</body>
</html>
`;

// ─── TEMPLATE 3: MODERN DARK (Glassmorphism, Glow) ──────────
const TEMPLATE_DARK = `
<!DOCTYPE html>
<html lang="en">
<head>
${BASE_HEAD}
<style>
body { background: #050505; color: #fff; }
.topbar { padding: 32px 60px; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); }
.topbar-logo { font-family: var(--font-display); font-weight: 800; font-size: 20px; letter-spacing: -1px; }
.topbar-logo span { color: var(--accent); text-shadow: 0 0 20px var(--accent); }

.hero { padding: 120px 60px; text-align: center; position: relative; overflow: hidden; background: radial-gradient(circle at 50% 0%, {{ACCENT_COLOR}}33 0%, transparent 50%); }
.hero-title { font-family: var(--font-display); font-size: clamp(50px, 8vw, 100px); font-weight: 800; letter-spacing: -3px; line-height: 0.9; margin-bottom: 40px; }
.hero-title em { font-style: normal; color: var(--accent); text-shadow: 0 0 30px var(--accent); }
.hero-sub { font-size: 20px; color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto 60px; line-height: 1.6; }

.mockup-stage { display: flex; justify-content: center; align-items: center; gap: 40px; padding-top: 40px; }
.phone { border-radius: 40px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02); backdrop-filter: blur(20px); box-shadow: 0 40px 100px rgba(0,0,0,0.5); }
.phone-screen img { width: 100%; height: 100%; object-fit: cover; display: block; }
{{PHONE_POSITIONS_CSS}}

.section { padding: 100px 60px; }
.section-dark { background: #0a0a0a; border-top: 1px solid rgba(255,255,255,0.05); }
.feature-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 40px; }
.feature-card:hover { border-color: var(--accent); box-shadow: 0 0 40px var(--accent-dim); }

.result-band { background: linear-gradient(90deg, var(--accent), var(--secondary)); padding: 100px 60px; border-radius: 40px; margin: 0 60px; text-align: center; }
.result-items { display: flex; justify-content: center; gap: 60px; margin-top: 40px; }
.result-n { font-size: 64px; text-shadow: 0 4px 20px rgba(0,0,0,0.2); font-weight: 800; }
.result-l { font-size: 16px; opacity: 0.8; }

@media (max-width: 900px) {
  .result-band { margin: 0 20px; padding: 60px 32px; }
  .result-items { flex-direction: column; gap: 40px; }
}
</style>
</head>
<body>
  <div class="topbar">
    <div class="topbar-logo">{{LOGO_TEXT}}<span>.</span></div>
    <div class="topbar-tags">{{TOPBAR_TAGS}}</div>
  </div>
  <section class="hero">
    {{HERO_CONTENT}}
    <div class="mockup-stage">{{PHONE_FRAMES_HTML}}</div>
  </section>
  {{SECTIONS}}
  <footer class="footer">
    <div class="footer-brand">{{LOGO_TEXT}}</div>
    <div class="footer-meta">Digital Experience &bull; {{YEAR}}</div>
  </footer>
</body>
</html>
`;
;

// ─── Token builder ────────────────────────────────────────────
function buildTokens(design: DesignOutput, copy: CopyOutput, screenshotCount: number) {
  if (!copy || !design) {
    return {
      APP_NAME: 'Case Study',
      LOGO_TEXT: 'Showcaise',
      DISPLAY_FONT: 'Syne',
      DISPLAY_FONT_NAME: 'Syne',
      BODY_FONT: 'DM Sans',
      BODY_FONT_NAME: 'DM Sans',
      PRIMARY_COLOR: '#000000',
      SECONDARY_COLOR: '#333333',
      ACCENT_COLOR: '#00c896',
      BG_COLOR: '#ffffff',
      BG_2_COLOR: '#f9f9f9',
      TEXT_COLOR: '#000000',
      TEXT_MUTED_COLOR: 'rgba(0,0,0,0.45)',
      BORDER_COLOR: 'rgba(0,0,0,0.08)',
      PHONE_POSITIONS_CSS: '',
      TOPBAR_TAGS: '',
      YEAR: new Date().getFullYear().toString(),
    };
  }

  const isDark = isColorDark(design.bg_color);
  const bg2 = isDark
    ? lightenHex(design.bg_color, 8)
    : darkenHex(design.bg_color, 4);
  const border = isDark
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(0,0,0,0.08)';
  const textMuted = isDark
    ? 'rgba(255,255,255,0.45)'
    : 'rgba(0,0,0,0.45)';

  const tags = [copy.category || 'Product', design.layout_style, design.mood]
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  return {
    APP_NAME: copy.hero_headline,
    LOGO_TEXT: copy.hero_headline.split(' ')[0],
    DISPLAY_FONT: design.font_pairing.display.replace(/\s+/g, '+'),
    DISPLAY_FONT_NAME: design.font_pairing.display,
    BODY_FONT: design.font_pairing.body.replace(/\s+/g, '+'),
    BODY_FONT_NAME: design.font_pairing.body,
    PRIMARY_COLOR: design.primary_color,
    SECONDARY_COLOR: design.secondary_color,
    ACCENT_COLOR: design.accent_color,
    BG_COLOR: design.bg_color,
    BG_2_COLOR: bg2,
    TEXT_COLOR: isDark ? '#ffffff' : '#0a0a0a',
    TEXT_MUTED_COLOR: textMuted,
    BORDER_COLOR: border,
    PHONE_POSITIONS_CSS: generatePhoneCSS(screenshotCount, design.layout_style),
    TOPBAR_TAGS: tags,
    YEAR: new Date().getFullYear().toString(),
  };
}

// ─── Phone layout generator ───────────────────────────────────
function generatePhoneCSS(count: number, layoutStyle: string): string {
  if (layoutStyle === 'minimal-clean' || layoutStyle === 'feature-forward') {
    return `
      .phone-0 { width: 280px; height: 560px; right: 60px; top: 20px; z-index: 5; transform: rotate(2deg); }
      .phone-1 { width: 240px; height: 480px; right: 280px; top: 100px; z-index: 4; transform: rotate(-4deg); opacity: 0.6; }
      .phone-2 { width: 220px; height: 440px; right: 440px; top: 180px; z-index: 3; transform: rotate(-8deg); opacity: 0.4; }
      @media (max-width: 1024px) {
        .phone { position: relative; width: 160px !important; height: 320px !important; right: auto !important; top: auto !important; transform: none !important; opacity: 1 !important; margin: 0 10px; }
      }
    `;
  }

  const configs: Record<number, string> = {
    1: `
      .phone-0 { width: 220px; height: 440px; left: 50%; transform: translateX(-50%); z-index: 5; }`,
    2: `
      .phone-0 { width: 200px; height: 400px; left: calc(50% - 110px); z-index: 4; transform: rotate(-4deg) translateY(20px); }
      .phone-1 { width: 200px; height: 400px; left: calc(50% + 10px);  z-index: 4; transform: rotate(4deg) translateY(20px); }`,
    3: `
      .phone-0 { width: 175px; height: 360px; left: calc(50% - 170px); z-index: 4; transform: rotate(-4deg) translateY(20px); }
      .phone-1 { width: 200px; height: 400px; left: 50%; transform: translateX(-50%); z-index: 5; border-color: var(--accent); }
      .phone-2 { width: 175px; height: 360px; left: calc(50% + 0px);  z-index: 4; transform: rotate(4deg) translateY(20px); }`,
    4: `
      .phone-0 { width: 175px; height: 360px; left: calc(50% - 170px); z-index: 4; transform: rotate(-4deg) translateY(20px); }
      .phone-1 { width: 155px; height: 320px; left: calc(50% - 320px); z-index: 3; transform: rotate(-8deg) translateY(40px); opacity: 0.7; }
      .phone-2 { width: 200px; height: 400px; left: 50%; transform: translateX(-50%); z-index: 5; border-color: var(--accent); }
      .phone-3 { width: 175px; height: 360px; left: calc(50% + 0px);  z-index: 4; transform: rotate(4deg) translateY(20px); }`,
    5: `
      .phone-c { width: 200px; height: 400px; left: 50%; transform: translateX(-50%); z-index: 5; border-color: var(--accent); }
      .phone-l1 { width: 175px; height: 360px; left: calc(50% - 170px); z-index: 4; transform: rotate(-4deg) translateY(20px); }
      .phone-l2 { width: 155px; height: 320px; left: calc(50% - 320px); z-index: 3; transform: rotate(-8deg) translateY(40px); opacity: 0.7; }
      .phone-r1 { width: 175px; height: 360px; left: calc(50% + 0px);  z-index: 4; transform: rotate(4deg) translateY(20px); }
      .phone-r2 { width: 155px; height: 320px; left: calc(50% + 155px); z-index: 3; transform: rotate(8deg) translateY(40px); opacity: 0.7; }
      .phone-0 { display:none; } .phone-1 { display:none; } .phone-2 { display:none; } .phone-3 { display:none; } .phone-4 { display:none; }
    `,
  };

  if (count >= 5) return configs[5];
  return configs[Math.min(count, 5)] || configs[5];
}

// ─── Section HTML builders ────────────────────────────────────
function buildPhoneFrames(screenshotCount: number): string {
  if (screenshotCount >= 5) {
    return `
      <div class="phone phone-l2"><div class="phone-screen"><img src="PLACEHOLDER_SCREENSHOT_0" /></div></div>
      <div class="phone phone-l1"><div class="phone-screen"><img src="PLACEHOLDER_SCREENSHOT_1" /></div></div>
      <div class="phone phone-c"><div class="phone-screen"><img src="PLACEHOLDER_SCREENSHOT_2" /></div></div>
      <div class="phone phone-r1"><div class="phone-screen"><img src="PLACEHOLDER_SCREENSHOT_3" /></div></div>
      <div class="phone phone-r2"><div class="phone-screen"><img src="PLACEHOLDER_SCREENSHOT_4" /></div></div>
    `;
  }
  return Array.from({ length: Math.min(screenshotCount, 5) }, (_, i) => `
    <div class="phone phone-${i}" data-screen-index="${i}">
      <div class="phone-screen">
        <img src="PLACEHOLDER_SCREENSHOT_${i}" alt="App Screen ${i + 1}" />
      </div>
    </div>`
  ).join('\n');
}

function buildStats(stats: CopyOutput['stats']): string {
  if (!stats || !Array.isArray(stats)) return '';
  return stats.map(s => `
    <div class="stat-cell">
      <div class="stat-n">${s.number}</div>
      <div class="stat-l">${s.label}</div>
    </div>`
  ).join('\n');
}

function buildTimeline(copy: CopyOutput): string {
  if (!copy) return '';
  const items = [
    { label: 'The Problem', heading: copy.problem?.heading || 'Challenge', bullets: copy.problem?.bullets || [], dot: '' },
    { label: 'The Solution', heading: copy.solution?.heading || 'Solution', bullets: copy.solution?.bullets || [], dot: 'accent' },
    { label: 'The Result', heading: copy.result?.heading || 'Result', bullets: copy.result?.bullets || [], dot: 'accent' },
  ];
  return items.map((item, i) => `
    <div class="timeline-wrap">
      <div class="timeline-line">
        <div class="timeline-node">${i + 1}</div>
        ${i < items.length - 1 ? '<div class="timeline-dash"></div>' : ''}
      </div>
      <div class="timeline-content">
        <p class="timeline-eyebrow">${item.label}</p>
        <h2 class="timeline-heading">${item.heading}</h2>
        <ul class="timeline-bullets">
          ${(item.bullets || []).map(b => `
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
  if (!features || !Array.isArray(features)) return '';
  return features.map(f => `
    <div class="feature-card">
      <div class="feature-icon">${f.icon}</div>
      <div class="feature-title">${f.title}</div>
      <p class="feature-desc">${f.desc}</p>
    </div>`
  ).join('\n');
}

function buildProcess(process: CopyOutput['process'], design: DesignOutput): string {
  if (!process) return '';
  const pillStyles = [
    'background: #fdf3c0; color: #7a6010;',
    'background: #d0f5e8; color: #0a5c3a;',
    'background: #dbeeff; color: #1a4a7a;',
  ];
  const phases = [process.phase1, process.phase2, process.phase3].filter(Boolean);
  return phases.map((phase, i) => `
    <div class="process-col">
      <div class="process-pill" style="${pillStyles[i % 3]}">
        ${phase?.title || 'Step'}
      </div>
      ${(phase?.items || []).map(item => `<div class="process-item">${item}</div>`).join('')}
    </div>`
  ).join('\n');
}

function buildImpact(impact: CopyOutput['impact']): string {
  if (!impact || !Array.isArray(impact)) return '';
  return impact.map(m => `
    <div class="result-item">
      <div class="result-n">${m.number}</div>
      <div class="result-l">${m.label}</div>
    </div>`
  ).join('\n');
}

function buildTechBadges(badges: CopyOutput['tech_badges']): string {
  if (!badges || !Array.isArray(badges)) return '';
  return badges.map(b => `
    <div class="tech-badge">
      <div class="tech-dot" style="background:${b.color}"></div>
      ${b.name}
    </div>`
  ).join('\n');
}

// ─── Colour helpers ───────────────────────────────────────────
function isColorDark(hex: string): boolean {
  if (!hex || hex[0] !== '#') return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}
function lightenHex(hex: string, amount: number): string {
  if (!hex || hex[0] !== '#') return hex;
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
  
  // Choose template
  let scaffold = TEMPLATE_EDITORIAL;

  // Build sections dynamically based on design.section_order
  const sectionMap: Record<string, string> = {
    stats: `<section class="section"><div class="stats-row">${buildStats(copy.stats)}</div></section>`,
    process: `<section class="section section-gray"><p class="process-title">Process</p><div class="process-grid">${buildProcess(copy.process, design)}</div></section>`,
    problem: `<section class="section"><div class="timeline-wrap">${buildTimeline(copy)}</div></section>`,
    features: `<section class="section section-dark"><p class="features-eyebrow">Product</p><h2 class="features-heading">${copy.features_heading ?? 'Core Features'}</h2><div class="features-grid">${buildFeatures(copy.features)}</div></section>`,
    result: `<div class="result-band"><div class="result-band-title">${copy.result.heading}</div><div class="result-items">${buildImpact(copy.impact)}</div></div>`,
    tech: `<section class="section"><p class="process-title">Built With</p><div class="tech-row">${buildTechBadges(copy.tech_badges)}</div></section>`,
  };

  if (design.layout_style === 'minimal-grid' || design.layout_style === 'impact-metrics') {
    scaffold = TEMPLATE_MINIMAL;
  } else if (design.mood === 'dark-luxury' || design.bg_color === '#000000' || design.bg_color === '#050505') {
    scaffold = TEMPLATE_DARK;
  }

  const activeSections = (design.section_order || ["stats", "process", "features", "result", "tech"])
    .map(s => sectionMap[s])
    .filter(Boolean)
    .join('\n');

  const sections = {
    SECTIONS: activeSections,
    PHONE_FRAMES_HTML: buildPhoneFrames(screenshotCount),
  };

  const heroHtml = await generateUniqueHero(model, design, copy);
  
  let html = scaffold;
  const allTokens = { ...tokens, ...sections, HERO_CONTENT: heroHtml };
  for (const [key, value] of Object.entries(allTokens)) {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
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
  
  // Choose template
  let scaffold = TEMPLATE_EDITORIAL;
  if (design.layout_style === 'minimal-grid' || design.layout_style === 'impact-metrics') {
    scaffold = TEMPLATE_MINIMAL;
  } else if (design.mood === 'dark-luxury' || design.bg_color === '#000000' || design.bg_color === '#050505') {
    scaffold = TEMPLATE_DARK;
  }

  // Build sections dynamically
  const sectionMap: Record<string, string> = {
    stats: `<section class="section"><div class="stats-row">${buildStats(copy.stats)}</div></section>`,
    process: `<section class="section section-gray"><p class="process-title">Process</p><div class="process-grid">${buildProcess(copy.process, design)}</div></section>`,
    problem: `<section class="section"><div class="timeline-wrap">${buildTimeline(copy)}</div></section>`,
    features: `<section class="section section-dark"><p class="features-eyebrow">Product</p><h2 class="features-heading">${copy.features_heading ?? 'Core Features'}</h2><div class="features-grid">${buildFeatures(copy.features)}</div></section>`,
    result: `<div class="result-band"><div class="result-band-title">${copy.result.heading}</div><div class="result-items">${buildImpact(copy.impact)}</div></div>`,
    tech: `<section class="section"><p class="process-title">Built With</p><div class="tech-row">${buildTechBadges(copy.tech_badges)}</div></section>`,
  };

  const activeSections = (design.section_order || ["stats", "process", "features", "result", "tech"])
    .map(s => sectionMap[s])
    .filter(Boolean)
    .join('\n');

  const prompt = `
    Generate ONLY the inner hero HTML for a ${design.mood} app case study.
    App: "${copy.hero_headline}" — ${copy.hero_sub}
    Mood: ${design.mood}
    Layout: ${design.layout_style}
    Accent color CSS var: var(--accent)
    Text color CSS var: var(--text)
    Muted color CSS var: var(--text-muted)
    Font display CSS var: var(--font-display)

    Output a small HTML snippet (NO <html>, <head>, <body>, <style> tags).
    Include only: eyebrow label, h1 headline (use <em> for accent parts), subtitle paragraph.
    Make the headline creative and typographically interesting.
    Return raw HTML only.
  `;

  const stream = await client.chat.completions.create({
    model: model.id,
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });

  return (async function* () {
    let heroHtml = '';
    
    const parts = scaffold.split('{{HERO_CONTENT}}');
    const preHero = parts[0];
    const postHero = parts[1];
    
    let preHtml = preHero;
    const allTokens = { ...tokens, SECTIONS: activeSections, PHONE_FRAMES_HTML: buildPhoneFrames(screenshotCount) };
    for (const [key, value] of Object.entries(allTokens)) {
      preHtml = preHtml.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    yield preHtml;

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        const cleaned = text.replace(/`{3}html?|`{3}/g, '');
        heroHtml += cleaned;
        yield cleaned; 
      }
    }

    let postHtml = postHero;
    for (const [key, value] of Object.entries(allTokens)) {
      postHtml = postHtml.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    yield postHtml;
  })();
}

function buildHeroContent(copy: CopyOutput): string {
  return `
    <p class="hero-eyebrow">${copy.category ?? 'Featured Case Study'}</p>
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
    Include only: eyebrow label, h1 headline (use <em> for accent parts), subtitle paragraph.
    Return raw HTML only.
  `;

  try {
    const response = await client.chat.completions.create({
      model: model.id,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
    });
    const content = response.choices[0].message.content || '';
    return content.replace(/`{3}html?|`{3}/g, '').trim();
  } catch {
    return buildHeroContent(copy);
  }
}