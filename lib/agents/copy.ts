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
    Write high-converting, editorial-grade case study copy for an app called "${appName}".
    Tagline: ${tagline}
    Description: ${description}
    The mood is "${design.mood}". Tone-match the content to this mood (e.g., if dark-luxury, be sophisticated; if vibrant, be energetic).
    
    Return a JSON object with this exact structure:
    {
      "hero_headline": "A bold, punchy headline",
      "hero_sub": "A 2-3 sentence engaging subtitle",
      "category": "e.g. Fintech, E-commerce, Social",
      "features_heading": "e.g. Revolutionizing the Experience",
      "problem": {
        "heading": "The Core Challenge",
        "narrative": "A short story about the user pain points",
        "bullets": ["Point 1", "Point 2", "Point 3"]
      },
      "solution": {
        "heading": "The Strategic Approach",
        "bullets": ["How we solved it 1", "How we solved it 2"]
      },
      "result": {
        "heading": "The Impact",
        "bullets": ["Success metric 1", "Success metric 2"]
      },
      "stats": [{"number": "e.g. 40%", "label": "e.g. Faster Loading"}],
      "features": [{"icon": "Emoji", "title": "Feature Name", "desc": "One sentence description"}],
      "process": {
        "phase1": {"title": "e.g. Discovery & UX", "items": ["Task 1", "Task 2"]},
        "phase2": {"title": "e.g. Visual Design", "items": ["Task 1", "Task 2"]},
        "phase3": {"title": "e.g. Development", "items": ["Task 1", "Task 2"]}
      },
      "impact": [{"number": "e.g. 250k", "label": "e.g. Active Users"}],
      "tech_badges": [{"name": "React", "color": "#61DAFB"}]
    }
    Ensure all fields are present and high-quality.
  `;

  try {
    const response = await client.chat.completions.create({
      model: model.id,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content || '{}';
    const parsed = JSON.parse(content);
    
    // Defensive merging with defaults
    return {
      hero_headline: parsed.hero_headline || appName,
      hero_sub: parsed.hero_sub || tagline,
      category: parsed.category || 'Mobile App',
      features_heading: parsed.features_heading || 'Key Features',
      problem: {
        heading: parsed.problem?.heading || 'The Challenge',
        narrative: parsed.problem?.narrative || description,
        bullets: parsed.problem?.bullets || ['Complexity', 'Friction', 'Poor UX'],
      },
      solution: {
        heading: parsed.solution?.heading || 'The Solution',
        bullets: parsed.solution?.bullets || ['Seamless Flow', 'Modern Design', 'Efficiency'],
      },
      result: {
        heading: parsed.result?.heading || 'The Result',
        bullets: parsed.result?.bullets || ['Higher Retention', 'Positive Feedback'],
      },
      stats: parsed.stats || [
        { number: '99%', label: 'Uptime' },
        { number: '2.5x', label: 'Faster' }
      ],
      features: parsed.features || [
        { icon: '✨', title: 'Smart Sync', desc: 'Real-time updates across all devices.' }
      ],
      process: {
        phase1: parsed.process?.phase1 || { title: 'Strategy', items: ['Discovery', 'Planning'] },
        phase2: parsed.process?.phase2 || { title: 'Design', items: ['Wireframing', 'Prototyping'] },
        phase3: parsed.process?.phase3 || { title: 'Build', items: ['Development', 'Testing'] },
      },
      impact: parsed.impact || [
        { number: '10k+', label: 'Active Users' }
      ],
      tech_badges: parsed.tech_badges || [
        { name: 'React Native', color: '#61DAFB' }
      ],
    };
  } catch (error) {
    console.error('Error in runCopyAgent:', error);
    // Return a full default structure on total failure
    return {
      hero_headline: appName,
      hero_sub: tagline,
      category: 'Case Study',
      problem: { heading: 'Challenge', narrative: description, bullets: [] },
      solution: { heading: 'Solution', bullets: [] },
      result: { heading: 'Result', bullets: [] },
      stats: [],
      features: [],
      process: {
        phase1: { title: 'Discovery', items: [] },
        phase2: { title: 'Design', items: [] },
        phase3: { title: 'Launch', items: [] },
      },
      impact: [],
      tech_badges: [],
    };
  }
}
