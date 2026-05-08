import { OpenAI } from 'openai';

export type Role = 'design' | 'copy' | 'html';

export interface ModelConfig {
  id: string;
  provider: 'openai' | 'deepseek';
  capabilities: Role[];
  supportsVision: boolean;
  priority: Record<Role, number>;
}

export const MODEL_REGISTRY: Record<string, ModelConfig> = {
  'gpt-5.5': {
    id: 'gpt-5.5',
    provider: 'openai',
    capabilities: ['design', 'copy', 'html'],
    supportsVision: true,
    priority: { design: -1, copy: -1, html: -1 },
  },
  'gpt-5.4': {
    id: 'gpt-5.4',
    provider: 'openai',
    capabilities: ['design', 'copy', 'html'],
    supportsVision: true,
    priority: { design: 0, copy: 0.1, html: 0.1 },
  },
  'gpt-4o': {
    id: 'gpt-4o',
    provider: 'openai',
    capabilities: ['design', 'copy', 'html'],
    supportsVision: true,
    priority: { design: 1, copy: 2, html: 3 },
  },
  'gpt-4o-mini': {
    id: 'gpt-4o-mini',
    provider: 'openai',
    capabilities: ['copy', 'html'],
    supportsVision: true,
    priority: { design: 2, copy: 3, html: 4 },
  },
  'gpt-5-nano': {
    id: 'gpt-5-nano',
    provider: 'openai',
    capabilities: ['copy', 'html'],
    supportsVision: false,
    priority: { design: 5, copy: 0.5, html: 2 },
  },
  'deepseek-v4-pro': {
    id: 'deepseek-v4-pro',
    provider: 'deepseek',
    capabilities: ['copy', 'html'],
    supportsVision: false,
    priority: { design: 3, copy: 0, html: 0 },
  },
  'deepseek-v4-flash': {
    id: 'deepseek-v4-flash',
    provider: 'deepseek',
    capabilities: ['copy', 'html'],
    supportsVision: false,
    priority: { design: 4, copy: 1, html: 1 },
  },
};

export type AvailabilityMap = Record<'openai' | 'deepseek', boolean>;

export async function buildAvailabilityMap(): Promise<AvailabilityMap> {
  const openaiKey = process.env.OPENAI_API_KEY;
  const deepseekKey = process.env.DEEPSEEK_API_KEY;

  return {
    openai: !!openaiKey,
    deepseek: !!deepseekKey,
  };
}

export function pickModel(
  role: Role,
  availability: AvailabilityMap,
  hasImages: boolean = false,
  userPreference?: string
): ModelConfig {
  if (userPreference && MODEL_REGISTRY[userPreference]) {
    const config = MODEL_REGISTRY[userPreference];
    if (availability[config.provider]) {
      return config;
    }
  }

  const candidates = Object.values(MODEL_REGISTRY)
    .filter((config) => {
      const isAvailable = availability[config.provider];
      const canDoRole = config.capabilities.includes(role);
      const satisfiesVision = role === 'design' && hasImages ? config.supportsVision : true;
      return isAvailable && canDoRole && satisfiesVision;
    })
    .sort((a, b) => a.priority[role] - b.priority[role]);

  if (candidates.length === 0) {
    throw new Error(`No available models for role: ${role}`);
  }

  return candidates[0];
}

export function getClient(provider: 'openai' | 'deepseek') {
  if (provider === 'openai') {
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  } else {
    return new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: 'https://api.deepseek.com',
    });
  }
}
