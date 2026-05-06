import { Role, ModelConfig, AvailabilityMap, pickModel } from './model-router';

export interface AgentResult {
  role: Role;
  modelId: string;
  data: any;
  duration: number;
}

export type StatusCallback = (event: {
  type: 'model_start' | 'model_switch' | 'model_done' | 'pipeline_done';
  role?: Role;
  modelId?: string;
  from?: string;
  to?: string;
  reason?: string;
  duration?: number;
  totalDuration?: number;
}) => void;

export async function runWithFallback<T>(
  role: Role,
  task: (model: ModelConfig) => Promise<T>,
  availability: AvailabilityMap,
  hasImages: boolean = false,
  onStatus?: StatusCallback
): Promise<T> {
  const model = pickModel(role, availability, hasImages);
  
  onStatus?.({ type: 'model_start', role, modelId: model.id });
  
  const start = Date.now();
  try {
    const result = await task(model);
    const duration = Date.now() - start;
    onStatus?.({ type: 'model_done', role, modelId: model.id, duration });
    return result;
  } catch (error: any) {
    console.error(`Error with model ${model.id}:`, error);
    // In a real app, we would retry with another candidate here
    throw error;
  }
}
