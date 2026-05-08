import { NextResponse } from 'next/server';
import { buildAvailabilityMap } from '@/lib/model-router';
import { runWithFallback } from '@/lib/agent-runner';
import { runDesignAgent } from '@/lib/agents/design';

export const runtime = 'edge';
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { appName, category, screenshots, modelPreference } = await req.json();
    const availability = await buildAvailabilityMap();
    
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // 1. Start a keep-alive timer
        const keepAlive = setInterval(() => {
          controller.enqueue(encoder.encode(' ')); // Send a space as a heartbeat
        }, 15000);

        try {
          // 2. Run the heavy AI task
          const result = await runWithFallback(
            'design',
            (model) => runDesignAgent(model, appName, category, screenshots),
            availability,
            true,
            modelPreference
          );

          // 3. Clear timer and send the real data
          clearInterval(keepAlive);
          controller.enqueue(encoder.encode(JSON.stringify({ 
            data: result.data, 
            modelId: result.modelId 
          })));
        } catch (e: any) {
          clearInterval(keepAlive);
          controller.enqueue(encoder.encode(JSON.stringify({ error: e.message })));
        } finally {
          controller.close();
        }
      },
    });
    
    return new Response(stream, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
