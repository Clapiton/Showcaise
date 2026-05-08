import { CopyOutput } from '../agents/copy';
import { DesignOutput } from '../agents/design';
import { Theme, ScreenshotMetadata } from './types';

export function buildAllSections(
    copy: CopyOutput,
    design: DesignOutput,
    screenshots: ScreenshotMetadata[],
    theme: Theme,
    platform: string = 'Mobile'
) {
    const dashboardIndex = identifyDashboardIndex(screenshots);
    const mockupHTML = buildMockup(screenshots, dashboardIndex, theme, platform);
    const mockupCSS = generateMockupCSS(screenshots.length, theme, platform);

    return {
        APP_NAME: copy.hero_headline || 'Case Study',
        // ... rest of tokens ...
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
        PHONE_FRAMES: mockupHTML, // Backward compatibility for some templates
        MOCKUP_CONTENT: mockupHTML,
        
        PROCESS_COLUMNS: buildProcessColumns(copy.process),
        STATS_CELLS: buildStatsCells(copy.stats),
        TIMELINE_ITEMS: buildTimelineItems(copy),
        TOPBAR_TAGS: buildTopbarTags(copy, design),
        
        DASHBOARD_SCREEN: `PLACEHOLDER_SCREENSHOT_${dashboardIndex}`,
        
        PHONE_POSITIONS_CSS: mockupCSS,
        PHONE_POSITIONS_CSS_INLINE: `<style>${mockupCSS}</style>`,
        
        YEAR: new Date().getFullYear().toString(),
        LOGO_TEXT: copy.hero_headline?.split(' ')[0] || 'Showcaise',
    };
}

function buildMockup(screenshots: ScreenshotMetadata[], dashboardIndex: number, theme: Theme, platform: string) {
    const total = Math.min(screenshots.length, 5);
    const style = theme.mockupStyle;

    const getClassName = (i: number, total: number) => {
        const isDash = screenshots[i].index === dashboardIndex;
        if (style === 'fanned') {
            if (total === 1) return 'm-0';
            if (total === 2) return isDash ? 'm-0' : 'm-1';
            if (total === 3) return isDash ? 'm-1' : (i < 1 ? 'm-0' : 'm-2');
            if (total >= 5) {
                if (isDash) return 'm-c';
                const others = screenshots.filter(s => s.index !== dashboardIndex);
                if (screenshots[i].index === others[0].index) return 'm-l1';
                if (screenshots[i].index === others[1].index) return 'm-l2';
                if (screenshots[i].index === others[2].index) return 'm-r1';
                return 'm-r2';
            }
        }
        return `m-${i}`;
    };

    const frameClass = platform === 'Mobile' ? 'mobile-frame' : 'desktop-frame';

    return screenshots.slice(0, 5).map((s, i) => `
        <div class="mockup-item ${frameClass} ${getClassName(i, total)} ${s.index === dashboardIndex ? 'is-dashboard' : ''}">
            <div class="frame-bezel">
                <img src="PLACEHOLDER_SCREENSHOT_${s.index}" alt="App Screen ${s.index + 1}" />
            </div>
        </div>
    `).join('\n');
}

function generateMockupCSS(count: number, theme: Theme, platform: string): string {
    const style = theme.mockupStyle;
    const isMobile = platform === 'Mobile';
    const w = isMobile ? '200px' : '600px';
    const h = isMobile ? '420px' : '380px';

    if (style === 'grid') {
        return `
            .mockup-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(${w}, 1fr)); gap: 2rem; }
            .mockup-item { width: 100%; height: ${h}; position: relative; }
        `;
    }

    if (style === 'scroll') {
        return `
            .mockup-scroll { display: flex; overflow-x: auto; gap: 2rem; padding: 2rem; scroll-snap-type: x mandatory; }
            .mockup-item { flex: 0 0 ${w}; height: ${h}; scroll-snap-align: center; }
        `;
    }

    // Default: Fanned
    return `
      .mockup-item { position: absolute; transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
      .mobile-frame { width: 200px; height: 400px; border-radius: 32px; }
      .desktop-frame { width: 500px; height: 320px; border-radius: 12px; }
      
      .m-c { z-index: 10; left: 50%; transform: translateX(-50%); scale: 1.1; border-color: var(--accent); box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
      .m-l1 { left: calc(50% - 160px); z-index: 5; transform: rotate(-5deg) translateY(20px); }
      .m-l2 { left: calc(50% - 300px); z-index: 3; transform: rotate(-10deg) translateY(40px); opacity: 0.6; }
      .m-r1 { left: calc(50% + 10px);  z-index: 5; transform: rotate(5deg) translateY(20px); }
      .m-r2 { left: calc(50% + 150px); z-index: 3; transform: rotate(10deg) translateY(40px); opacity: 0.6; }
      
      .m-0 { left: 50%; transform: translateX(-50%); z-index: 10; }

      @media (max-width: 768px) {
        .mobile-frame { width: 140px; height: 280px; border-radius: 20px; }
        .desktop-frame { width: 280px; height: 180px; }
        .m-l1 { left: calc(50% - 100px); }
        .m-l2 { left: calc(50% - 160px); }
        .m-r1 { left: calc(50% + 10px); }
        .m-r2 { left: calc(50% + 70px); }
      }
      @media (max-width: 480px) {
        .mobile-frame { width: 120px; height: 240px; }
        .m-l1 { left: calc(50% - 80px); }
        .m-l2 { left: calc(50% - 130px); }
        .m-r1 { left: calc(50% + 5px); }
        .m-r2 { left: calc(50% + 55px); }
      }
    `;
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

function identifyDashboardIndex(screenshots: ScreenshotMetadata[]): number {
    const marked = screenshots.find(s => s.isDashboard);
    if (marked) return marked.index;
    const analyzed = screenshots.find(s => 
        s.label?.toLowerCase().includes('dashboard') || 
        s.label?.toLowerCase().includes('home') ||
        s.label?.toLowerCase().includes('main')
    );
    if (analyzed) return analyzed.index;
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
