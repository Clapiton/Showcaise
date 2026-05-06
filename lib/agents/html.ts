import { ModelConfig, getClient } from '../model-router';
import { DesignOutput } from './design';
import { CopyOutput } from './copy';

export async function runHtmlAgent(
  model: ModelConfig,
  design: DesignOutput,
  copy: CopyOutput,
  screenshotCount: number
): Promise<string> {
  const client = getClient(model.provider);

  const prompt = `
    Generate a WORLD-CLASS, PREMIUM, self-contained HTML file for a product case study. 
    Design Aesthetic: High-end Editorial (Apple, Linear, Stripe style).

    BRAND IDENTITY:
    - Primary Color: ${design.primary_color}
    - Accent: ${design.accent_color}
    - Background: ${design.bg_color} (Use rich radial gradients or mesh backgrounds, not flat colors)
    - Font Pairings: ${design.font_pairing.display} for headers, ${design.font_pairing.body} for content.

    DESIGN REQUIREMENTS:
    1. IMMERSIVE HERO: A massive, centered headline using 'clamp()' for responsive scale. Below it, create a "3D Mockup Stage" using CSS 'perspective: 1000px'.
    2. FLOATING MOCKUPS: Display screenshots (PLACEHOLDER_SCREENSHOT_i) inside CSS-only phone frames. Use 'transform: rotateY(-15deg) rotateX(5deg)' to create depth. Add soft, wide shadows.
    3. SECTION RHYTHM:
       - Alternating layouts (Left-text/Right-image vs Right-text/Left-image).
       - Use 'Bento Grid' layouts for secondary features.
       - Large, breathable margins (10rem to 15rem vertical spacing).
    4. GLASSMORPHISM: Use 'backdrop-filter: blur(10px)' for nav bars and floating cards.
    5. MICRO-INTERACTIONS: Add 'hover:translate-y-[-5px]' effects and smooth scroll behaviors.
    6. TYPOGRAPHY: Use 'text-wrap: balance' for headlines. Maintain 1.6 line-height for body.
    7. DARK MODE DEPTH: Even if the background is dark, use subtle gradients and borders (1px solid rgba(255,255,255,0.1)) to define containers.

    CONTENT JSON:
    ${JSON.stringify(copy, null, 2)}

    IMAGES:
    You have ${screenshotCount} screenshots available. Use src="PLACEHOLDER_SCREENSHOT_0", "PLACEHOLDER_SCREENSHOT_1", etc.
    Distribute them throughout the page to illustrate the challenges, solutions, and final results.

    Return ONLY raw HTML. No markdown blocks.
  `;

  console.log(`--- HTML AGENT: CALLING MODEL ${model.id} ---`);
  const response = await client.chat.completions.create({
    model: model.id,
    messages: [{ role: 'user', content: prompt }],
  });

  let html = response.choices[0].message.content || '';
  if (html.includes('```html')) html = html.split('```html')[1].split('```')[0].trim();
  else if (html.includes('```')) html = html.split('```')[1].split('```')[0].trim();
  return html;
}

export async function streamHtmlAgent(
  model: ModelConfig,
  design: DesignOutput,
  copy: CopyOutput,
  screenshotCount: number
) {
  const client = getClient(model.provider);

  const prompt = `
    Generate a PREMIUM EDITORIAL HTML case study. No markdown.
    Aesthetic: Apple/Stripe (Clean, Large Typography, Depth).
    
    SYSTEM:
    - Primary: ${design.primary_color}
    - Background: ${design.bg_color}
    - Layout: ${design.layout_style}
    
    GUIDELINES:
    1. HERO: Big centered text + CSS 3D Floating Mockups (use perspective/transform).
    2. SECTIONS: Bento grids, alternating layouts, huge whitespace.
    3. STYLE: Glassmorphism, radial gradients, subtle borders.
    4. IMAGES: Use src="PLACEHOLDER_SCREENSHOT_i" (0 to ${screenshotCount - 1}).
    
    DATA: ${JSON.stringify(copy)}
  `;

  return await client.chat.completions.create({
    model: model.id,
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });
}
