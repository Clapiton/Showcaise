import { DesignOutput } from '../agents/design';
import { Theme } from './types';
import { editorial } from './editorial';
import { boldImpact } from './bold-impact';
import { magazine } from './magazine';
import { minimalClean } from './minimal-clean';
import { vibrantEnergetic } from './vibrant-energetic';
import { classicModern } from './classic-modern';

const THEME_REGISTRY: Theme[] = [
    editorial,
    boldImpact,
    magazine,
    minimalClean,
    vibrantEnergetic,
    classicModern,
];

// Mood → Theme mapping
const MOOD_TO_THEME: Record<string, string> = {
    'dark-luxury': 'editorial',
    'minimal-clean': 'minimal-clean',
    'bold-playful': 'vibrant-energetic',
    'vibrant-energetic': 'vibrant-energetic',
    'corporate-trust': 'bold-impact',
    'story-narrative': 'magazine',
    'feature-forward': 'bold-impact',
    'editorial': 'editorial',
    'dashboard-heavy': 'bold-impact',
    'asymmetric': 'magazine',
    'classic-modern': 'classic-modern',
};

export function pickTheme(design: DesignOutput): Theme {
    const themeId = MOOD_TO_THEME[design.mood]
        ?? MOOD_TO_THEME[design.layout_style]
        ?? 'editorial'; // safe default

    return THEME_REGISTRY.find(t => t.id === themeId) ?? editorial;
}

export function buildDesignTokens(design: DesignOutput) {
    const isDark = isColorDark(design.bg_color);
    const bg2 = isDark
        ? lightenHex(design.bg_color, 8)
        : darkenHex(design.bg_color, 4);

    const textMuted = isDark
        ? 'rgba(255,255,255,0.45)'
        : 'rgba(0,0,0,0.45)';

    const border = isDark
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(0,0,0,0.08)';

    return {
        PRIMARY_COLOR: design.primary_color,
        SECONDARY_COLOR: design.secondary_color,
        ACCENT_COLOR: design.accent_color,
        BG_COLOR: design.bg_color,
        BG_2_COLOR: bg2,
        TEXT_COLOR: isDark ? '#ffffff' : '#0a0a0a',
        TEXT_MUTED_COLOR: textMuted,
        BORDER_COLOR: border,
        DISPLAY_FONT: design.font_pairing.display,
        BODY_FONT: design.font_pairing.body,
    };
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

export { THEME_REGISTRY };