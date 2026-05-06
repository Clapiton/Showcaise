import { ModelConfig, getClient } from '../model-router';

export interface DesignOutput {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  bg_color: string;
  text_color: string;
  mood: string;
  font_pairing: {
    display: string;
    body: string;
  };
  layout_style: string;
  section_order: string[];
  hero_style: string;
  mockup_count: number;
  color_reasoning: string;
}

export async function runDesignAgent(
  model: ModelConfig,
  appName: string,
  category: string,
  screenshots: string[] // base64 strings
): Promise<DesignOutput> {
  const client = getClient(model.provider);

  const prompt = `
    Analyze the visual language of the app "${appName}" (Category: ${category}) based on these screenshots.
    Return a JSON object with the following structure:
    {
      "primary_color": "#hex",
      "secondary_color": "#hex", 
      "accent_color": "#hex",
      "bg_color": "#hex",
      "text_color": "#hex",
      "mood": "dark-luxury | minimal-clean | bold-playful | corporate-trust | vibrant-energetic",
      "font_pairing": {
        "display": "Syne | Playfair Display | Cabinet Grotesk | Bebas Neue | Fraunces",
        "body": "DM Sans | Lato | Source Serif | Nunito"
      },
      "layout_style": "editorial | dashboard-heavy | story-narrative | feature-forward | minimal-impact",
      "section_order": ["hero", "problem", "features", "process", "stats", "result"],
      "hero_style": "fullbleed-mockup | split-layout | centered-minimal | asymmetric",
      "mockup_count": 3,
      "color_reasoning": "..."
    }
  `;

  const messages: any[] = [
    {
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        ...screenshots.map((img) => ({
          type: 'image_url',
          image_url: { url: img },
        })),
      ],
    },
  ];

  const response = await client.chat.completions.create({
    model: model.id,
    messages,
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content || '{}') as DesignOutput;
}
