// lib/agents/html.ts

import { ModelConfig, getClient } from '../model-router';
import { DesignOutput } from './design';
import { CopyOutput } from './copy';
import { pickTheme, buildDesignTokens } from '../theme/index';
import { BASE_CSS } from '../theme/base';
import { buildAllSections } from '../theme/section-builders';
import { ScreenshotMetadata } from '../theme/types';

export async function runHtmlAgent(
  model: ModelConfig,
  design: DesignOutput,
  copy: CopyOutput,
  screenshots: ScreenshotMetadata[] | number
): Promise<string> {
  const screenshotData = Array.isArray(screenshots)
    ? screenshots
    : Array.from({ length: screenshots }, (_, i) => ({ index: i, isDashboard: i === 0 }));

  // 1. Pick theme based on mood
  const theme = pickTheme(design);
  console.log(`[HTML AGENT] Theme selected: ${theme.name} for mood: ${design.mood}`);

  // 2. Build all tokens
  const tokens = buildDesignTokens(design);
  const sections = buildAllSections(copy, design, screenshotData, theme);

  // 3. Fill scaffold
  let html = theme.scaffold;
  const allTokens = { BASE_CSS, ...tokens, ...sections };

  for (const [key, val] of Object.entries(allTokens)) {
    html = html.replaceAll(`{{${key}}}`, String(val));
  }

  // 4. AI only generates hero — focused, fast, unique per mood
  const hero = await generateHero(model, design, copy);
  html = html.replace('{{HERO_CONTENT}}', hero);

  return html;
}

export async function streamHtmlAgent(
  model: ModelConfig,
  design: DesignOutput,
  copy: CopyOutput,
  screenshots: ScreenshotMetadata[] | number
) {
  const screenshotData = Array.isArray(screenshots)
    ? screenshots
    : Array.from({ length: screenshots }, (_, i) => ({ index: i, isDashboard: i === 0 }));

  const client = getClient(model.provider);
  const theme = pickTheme(design);
  const tokens = buildDesignTokens(design);
  const sections = buildAllSections(copy, design, screenshotData, theme);

  const prompt = `
    Generate ONLY the inner hero HTML for a ${design.mood} app case study.
    App: "${copy.hero_headline}" — ${copy.hero_sub}
    Mood: ${design.mood}
    Accent color CSS var: var(--accent)
    Text color CSS var: var(--text)
    Muted color CSS var: var(--muted)
    Font display CSS var: var(--display)

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

    const parts = theme.scaffold.split('{{HERO_CONTENT}}');
    const preHero = parts[0];
    const postHero = parts[1];

    let preHtml = preHero;
    const allTokens = { BASE_CSS, ...tokens, ...sections };
    for (const [key, value] of Object.entries(allTokens)) {
      preHtml = preHtml.replaceAll(`{{${key}}}`, String(value));
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
      postHtml = postHtml.replaceAll(`{{${key}}}`, String(value));
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

async function generateHero(
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
    Muted color CSS var: var(--muted)
    Font display CSS var: var(--display)

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