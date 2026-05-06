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
    Generate a COMPLETE, UNIQUE, self-contained HTML file for a case study.
    
    RULES:
    - NO templates. Generate fresh HTML/CSS.
    - Colors: Primary(${design.primary_color}), Secondary(${design.secondary_color}), Accent(${design.accent_color}), BG(${design.bg_color}), Text(${design.text_color}).
    - Mood: ${design.mood}.
    - Layout: ${design.layout_style}.
    - Section Order: ${design.section_order.join(', ')}.
    - Use Fonts: Display(${design.font_pairing.display}), Body(${design.font_pairing.body}).
    - Embed screenshots (passed as variables) in device mockups.
    - Fully responsive.
    - Subtle CSS animations.
    - Single file (no external deps except Google Fonts).
    
    COPY DATA:
    ${JSON.stringify(copy, null, 2)}
    
    Return ONLY the raw HTML content.
  `;

  const response = await client.chat.completions.create({
    model: model.id,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content || '';
}
