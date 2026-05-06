import { NextResponse } from 'next/server';
import { buildAvailabilityMap } from '@/lib/model-router';
import { runWithFallback } from '@/lib/agent-runner';
import { runHtmlAgent } from '@/lib/agents/html';

export async function POST(req: Request) {
  console.log('--- API/BUILD-HTML: START ---');
  try {
    const body = await req.json();
    console.log('--- API/BUILD-HTML: BODY PARSED ---');
    const { design, copy, screenshots } = body;
    const availability = await buildAvailabilityMap();
    
    console.log('--- API/BUILD-HTML: RUNNING AGENT ---');
    const result = await runWithFallback(
      'html',
      (model) => runHtmlAgent(model, design, copy, screenshots),
      availability
    );
    
    console.log('--- API/BUILD-HTML: DONE ---');
    return NextResponse.json({ 
      html: result.data, 
      modelId: result.modelId 
    });
  } catch (error: any) {
    console.error('--- API/BUILD-HTML: ERROR ---', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
