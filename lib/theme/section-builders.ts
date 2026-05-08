import { CopyOutput } from '../agents/copy';
import { DesignOutput } from '../agents/design';
import { Theme, ScreenshotMetadata } from './types';

export function buildAllSections(
    copy: CopyOutput,
    design: DesignOutput,
    screenshots: ScreenshotMetadata[],
    theme: Theme
) {
    const dashboardIndex = identifyDashboardIndex(screenshots);
    const phoneCSS = generatePhoneCSS(screenshots.length);
    const phoneFrames = buildPhoneFrames(screenshots, dashboardIndex);

    return {
        APP_NAME: copy.hero_headline || 'Case Study',
        PROBLEM_HEADING: copy.problem?.heading || 'The Challenge',
        PROBLEM_PULLQUOTE: copy.problem?.bullets?.[0] || 'A significant hurdle in the user journey.',
        PROBLEM_BULLETS: buildBulletList(copy.problem?.bullets),
        
        SOLUTION_HEADING: copy.solution?.heading || 'The Solution',
        SOLUTION_BULLETS: buildBulletList(copy.solution?.bullets),
        
        RESULT_HEADING: copy.result?.heading || 'The Outcome',
        RESULT_BULLETS: buildBulletList(copy.result?.bullets),
        
        IMPACT_TITLE: copy.result?.heading || 'Impact',
        IMPACT_METRICS: buildImpactMetrics(copy.impact),
        
        FEATURES_HEADING: copy.features_heading || 'Key Features',
        FEATURE_CARDS: buildFeatureCards(copy.features),
        BENTO_CARDS: buildBentoCards(copy.features),
        
        TECH_BADGES: buildTechBadges(copy.tech_badges),
        
        SCREEN_SHOWCASES: buildScreenShowcases(screenshots),
        PHONE_FRAMES: phoneFrames,
        
        PROCESS_COLUMNS: buildProcessColumns(copy.process),
        STATS_CELLS: buildStatsCells(copy.stats),
        TIMELINE_ITEMS: buildTimelineItems(copy),
        TOPBAR_TAGS: buildTopbarTags(copy, design),
        
        DASHBOARD_SCREEN: `PLACEHOLDER_SCREENSHOT_${dashboardIndex}`,
        
        PHONE_POSITIONS_CSS: phoneCSS,
        PHONE_POSITIONS_CSS_INLINE: `<style>${phoneCSS}</style>`,
        
        YEAR: new Date().getFullYear().toString(),
        LOGO_TEXT: copy.hero_headline?.split(' ')[0] || 'Showcaise',
    };
}

function identifyDashboardIndex(screenshots: ScreenshotMetadata[]): number {
    // 1. Explicitly marked
    const marked = screenshots.find(s => s.isDashboard);
    if (marked) return marked.index;

    // 2. High confidence from vision analysis (if label exists)
    const analyzed = screenshots.find(s => 
        s.label?.toLowerCase().includes('dashboard') || 
        s.label?.toLowerCase().includes('home') ||
        s.label?.toLowerCase().includes('main')
    );
    if (analyzed) return analyzed.index;

    // 3. Fallback to first
    return 0;
}

function buildBulletList(bullets?: string[]) {
    if (!bullets) return '';
    return bullets.map(b => `<li>${b}</li>`).join('\n');
}

function buildImpactMetrics(impact?: CopyOutput['impact']) {
    if (!impact) return '';
    return impact.map((m: { number: string; label: string }) => `
        <div class="impact-item">
            <div class="impact-n">${m.number}</div>
            <div class="impact-l">${m.label}</div>
        </div>
    `).join('\n');
}

function buildFeatureCards(features?: CopyOutput['features']) {
    if (!features) return '';
    return features.map((f: { icon: string; title: string; desc: string }) => `
        <div class="feature-card">
            <div class="feature-icon">${f.icon}</div>
            <div class="feature-title">${f.title}</div>
            <p class="feature-desc">${f.desc}</p>
        </div>
    `).join('\n');
}

function buildBentoCards(features?: CopyOutput['features']) {
    if (!features) return '';
    return features.map((f: { icon: string; title: string; desc: string }, i: number) => {
        let sizeClass = 'third';
        if (i === 0) sizeClass = 'wide';
        else if (i === 1) sizeClass = 'tall';
        return `
            <div class="bento-card ${sizeClass}">
                <div class="feature-icon">${f.icon}</div>
                <div class="feature-title">${f.title}</div>
                <p class="feature-desc">${f.desc}</p>
            </div>
        `;
    }).join('\n');
}

function buildTechBadges(badges?: CopyOutput['tech_badges']) {
    if (!badges) return '';
    return badges.map((b: { name: string; color: string }) => `
        <div class="tech-badge">
            <div class="tech-dot" style="background: ${b.color}"></div>
            <span>${b.name}</span>
        </div>
    `).join('\n');
}

function buildProcessColumns(process?: CopyOutput['process']) {
    if (!process) return '';
    const phases = [process.phase1, process.phase2, process.phase3].filter(Boolean);
    return phases.map((p, i) => `
        <div class="process-col">
            <div class="process-step">0${i + 1}</div>
            <h3>${p?.title}</h3>
            <ul>
                ${p?.items?.map((item: string) => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('\n');
}

function buildStatsCells(stats?: CopyOutput['stats']) {
    if (!stats) return '';
    return stats.map((s: { number: string; label: string }) => `
        <div class="stat-cell">
            <div class="stat-n">${s.number}</div>
            <div class="stat-l">${s.label}</div>
        </div>
    `).join('\n');
}

function buildScreenShowcases(screenshots: ScreenshotMetadata[]) {
    return screenshots.map((s, i) => `
        <div class="screen-showcase ${i % 2 === 1 ? 'flip' : ''} ${s.isDashboard ? 'dashboard-highlight' : ''}">
            <div class="screen-img">
                <img src="PLACEHOLDER_SCREENSHOT_${s.index}" alt="Screen ${s.index + 1}" />
            </div>
            <div class="screen-content">
                <h3>${s.label || 'Interface Details'}</h3>
                <p>Deep-diving into the ${s.label || 'User Flow'} to understand specific interaction patterns.</p>
            </div>
        </div>
    `).join('\n');
}

function buildPhoneFrames(screenshots: ScreenshotMetadata[], dashboardIndex: number) {
    const total = Math.min(screenshots.length, 5);
    
    const getClassName = (i: number, total: number) => {
        // Find the index of the dashboard in the array to place it correctly
        const isDash = screenshots[i].index === dashboardIndex;

        if (total === 1) return 'phone-0';
        if (total === 2) return isDash ? 'phone-0' : 'phone-1';
        if (total === 3) {
            if (isDash) return 'phone-1'; // Center
            // Assign remaining positions
            const remaining = screenshots.filter(s => s.index !== dashboardIndex);
            if (screenshots[i].index === remaining[0].index) return 'phone-0';
            return 'phone-2';
        }
        // ... similar logic for 4 and 5 ...
        if (total === 5) {
            if (isDash) return 'phone-c'; // Center
            const remaining = screenshots.filter(s => s.index !== dashboardIndex);
            if (screenshots[i].index === remaining[0].index) return 'phone-l1';
            if (screenshots[i].index === remaining[1].index) return 'phone-l2';
            if (screenshots[i].index === remaining[2].index) return 'phone-r1';
            return 'phone-r2';
        }
        return `phone-${i}`;
    };

    return screenshots.slice(0, 5).map((s, i) => `
        <div class="phone-frame ${getClassName(i, total)} ${s.index === dashboardIndex ? 'dashboard-frame' : ''}">
            <img src="PLACEHOLDER_SCREENSHOT_${s.index}" alt="App Screen ${s.index + 1}" />
        </div>
    `).join('\n');
}

function generatePhoneCSS(count: number): string {
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
    `,
  };

  if (count >= 5) return configs[5];
  return configs[Math.min(count, 5)] || configs[5];
}

function buildTimelineItems(copy: CopyOutput): string {
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
          ${(item.bullets || []).map((b: string) => `
            <li>
              <div class="bullet-dot ${item.dot}"></div>
              <p>${b}</p>
            </li>`).join('')}
        </ul>
      </div>
    </div>`
  ).join('\n');
}

function buildTopbarTags(copy: CopyOutput, design: DesignOutput): string {
    return [copy.category || 'Product', design.layout_style, design.mood]
      .map((t: string) => `<span class="tag">${t}</span>`)
      .join('');
}
