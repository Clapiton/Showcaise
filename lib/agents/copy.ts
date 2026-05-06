import { ModelConfig, getClient } from '../model-router';
import { DesignOutput } from './design';

export interface CopyOutput {
  hero_headline: string;
  hero_sub: string;
  category?: string;
  features_heading?: string;
  problem: {
    heading: string;
    narrative: string;
    bullets: string[];
  };
  solution: {
    heading: string;
    bullets: string[];
  };
  result: {
    heading: string;
    bullets: string[];
  };
  stats: { number: string; label: string }[];
  features: { icon: string; title: string; desc: string }[];
  process: {
    phase1: { title: string; items: string[] };
    phase2: { title: string; items: string[] };
    phase3: { title: string; items: string[] };
  };
  impact: { number: string; label: string }[];
  tech_badges: { name: string; color: string }[];
}

export async function runCopyAgent(
  model: ModelConfig,
  appName: string,
  tagline: string,
  description: string,
  design: DesignOutput
): Promise<CopyOutput> {
  const client = getClient(model.provider);

  const prompt = `
    Write high-converting case study copy for an app called "${appName}".
    Tagline: ${tagline}
    Description: ${description}
    The mood is "${design.mood}". Tone-match the content to this mood.
    Return a JSON object with the structure defined in the specification.
  `;

  const response = await client.chat.completions.create({
    model: model.id,
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content || '{}') as CopyOutput;
}
