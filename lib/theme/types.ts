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
}

export interface ScreenshotMetadata {
    index: number;
    url?: string;
    label?: string;
    isDashboard: boolean;
    confidence?: number;
}
