import { NextResponse } from 'next/server';
import { buildAvailabilityMap } from '@/lib/model-router';
import { runWithFallback } from '@/lib/agent-runner';
import { runDesignAgent } from '@/lib/agents/design';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { appName, category, screenshots } = await req.json();
    const availability = await buildAvailabilityMap();
    
    const result = await runWithFallback(
      'design',
      (model) => runDesignAgent(model, appName, category, screenshots),
      availability,
      true
    );
    
    return NextResponse.json({ 
      data: result.data, 
      modelId: result.modelId 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
