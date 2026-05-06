import { NextResponse } from 'next/server';
import { buildAvailabilityMap, MODEL_REGISTRY } from '@/lib/model-router';
import { runWithFallback } from '@/lib/agent-runner';
import { runHtmlAgent, streamHtmlAgent } from '@/lib/agents/html';

export const runtime = 'edge';

export async function POST(req: Request) {
  console.log('--- API/BUILD-HTML: START ---');
  try {
    const body = await req.json();
    console.log('--- API/BUILD-HTML: BODY PARSED ---');
    const { design, copy, screenshotCount } = body;
    const availability = await buildAvailabilityMap();
    
    // For now, we'll use gpt-4o-mini directly for streaming to ensure reliability
    const model = MODEL_REGISTRY['gpt-5'];
    const stream = await streamHtmlAgent(model, design, copy, screenshotCount);
    
    const encoder = new TextEncoder();
    const customStream = new ReadableStream({
      async start(controller) {
        for await (const text of stream) {
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(customStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Model-Id': model.id,
      },
    });
  } catch (error: any) {
    console.error('--- API/BUILD-HTML: ERROR ---', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
