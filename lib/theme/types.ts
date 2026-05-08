export interface Theme {
    id: string;
    name: string;
    // The HTML scaffold with {{TOKEN}} slots
    scaffold: string;
    // Which CSS variables this theme needs filled
    requiredTokens: string[];
    // What section order this theme uses
    sectionOrder: string[];
    // Unique layout features of this theme
    signature: string;
    // Default mockup arrangement (fanned, grid, single, scroll)
    mockupStyle: 'fanned' | 'grid' | 'single' | 'scroll';
    // Which platforms this theme supports well
    supportedPlatforms: ('Mobile' | 'Desktop' | 'Web')[];
}

export interface ScreenshotMetadata {
    index: number;
    url?: string;
    label?: string;
    isDashboard: boolean;
    confidence?: number;
}
