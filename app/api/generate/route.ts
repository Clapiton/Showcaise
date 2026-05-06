import { NextResponse } from 'next/server';
import { buildAvailabilityMap } from '@/lib/model-router';
import { runWithFallback } from '@/lib/agent-runner';
import { runCopyAgent } from '@/lib/agents/copy';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { appName, tagline, description, design, modelPreference } = await req.json();
    const availability = await buildAvailabilityMap();
    
    const result = await runWithFallback(
      'copy',
      (model) => runCopyAgent(model, appName, tagline, description, design),
      availability,
      false,
      modelPreference
    );
    
    return NextResponse.json({
      data: result.data,
      modelId: result.modelId
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
