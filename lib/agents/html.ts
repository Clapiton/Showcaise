import { ModelConfig, getClient } from '../model-router';
import { DesignOutput } from './design';
import { CopyOutput } from './copy';

export async function runHtmlAgent(
  model: ModelConfig,
  design: DesignOutput,
  copy: CopyOutput,
  screenshots: string[]
): Promise<string> {
  const client = getClient(model.provider);

  const prompt = `
    Generate a PREMIUM, EDITORIAL, self-contained HTML file for a case study. 
    You are a world-class frontend engineer and UI/UX designer.

    DESIGN SYSTEM:
    - Primary Color: ${design.primary_color}
    - Secondary Color: ${design.secondary_color}
    - Accent Color: ${design.accent_color}
    - Background: ${design.bg_color}
    - Text: ${design.text_color}
    - Mood: ${design.mood}
    - Layout Style: ${design.layout_style}
    - Display Font: ${design.font_pairing.display}
    - Body Font: ${design.font_pairing.body}

    UI REQUIREMENTS:
    1. HIGH-END AESTHETIC: Use glassmorphism, radial gradients for depth, and smooth CSS transitions.
    2. TYPOGRAPHY: Use a sophisticated type scale. Use 'clamp()' for responsive font sizes.
    3. HERO SECTION: Create a bold hero with the title "${copy.hero_headline}". Feature a "mockup stage" where screenshots are displayed in tilted, overlapping device frames (CSS-only or minimal markup).
    4. STATS ROW: If applicable, include a clean grid of key project results (e.g., "98% satisfaction").
    5. TIMELINE/PROCESS: Use a vertical or horizontal timeline to show the ${design.section_order.join(' -> ')} flow.
    6. FEATURE GRID: Showcase features with unique icons (use simple SVG paths or Lucide-like CSS icons).
    7. TECH STACK: If applicable, list the technologies used with clean badges or icons.
    8. RESPONSIVENESS: Ensure the layout looks stunning on desktop and perfectly shifts to a single column on mobile.
    9. SINGLE FILE: No external JS libraries. Use vanilla CSS for everything. You can import Google Fonts via @import.

    CONTENT DATA:
    ${JSON.stringify(copy, null, 2)}

    INSTRUCTIONS FOR SCREENSHOTS:
    The following screenshot URLs are available. Use them as src for your <img> tags within the mockups:
    ${screenshots.map((url, i) => `Screenshot ${i + 1}: ${url}`).join('\n')}

    Return ONLY the raw HTML content starting with <!DOCTYPE html>.
  `;

  const response = await client.chat.completions.create({
    model: model.id,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content || '';
}
