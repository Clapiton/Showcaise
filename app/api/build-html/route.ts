import { NextResponse } from 'next/server';
import { buildAvailabilityMap, MODEL_REGISTRY, pickModel } from '@/lib/model-router';
import { runWithFallback } from '@/lib/agent-runner';
import { runHtmlAgent, streamHtmlAgent } from '@/lib/agents/html';

export const runtime = 'edge';

export async function POST(req: Request) {
  console.log('--- API/BUILD-HTML: START ---');
  try {
    const { design, copy, screenshotCount, modelPreference } = await req.json();
    console.log('--- API/BUILD-HTML: BODY PARSED ---');
    const availability = await buildAvailabilityMap();

    // Dynamically pick the model based on preference
    const model = pickModel('html', availability, false, modelPreference);
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
