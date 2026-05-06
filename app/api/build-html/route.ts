import { NextResponse } from 'next/server';
import { buildAvailabilityMap } from '@/lib/model-router';
import { runWithFallback } from '@/lib/agent-runner';
import { runHtmlAgent } from '@/lib/agents/html';

export async function POST(req: Request) {
  try {
    const { design, copy, screenshots } = await req.json();
    const availability = await buildAvailabilityMap();
    
    const result = await runWithFallback(
      'html',
      (model) => runHtmlAgent(model, design, copy, screenshots),
      availability
    );
    
    return NextResponse.json({ html: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
