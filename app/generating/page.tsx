'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Check, Loader2, Zap, Palette, FileText, Code } from 'lucide-react';

export default function GeneratingPage() {
  const router = useRouter();
  const { formData, setDesignData, setCopyData, setHtmlData } = useStore();
  
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!formData) {
      router.push('/');
      return;
    }

    async function runPipeline() {
      try {
        // Step 1: Analyze Design
        setStep(1);
        const designRes = await fetch('/api/analyze', {
          method: 'POST',
          body: JSON.stringify({
            appName: formData?.appName,
            category: formData?.category,
            screenshots: formData?.screenshots,
          }),
        });
        const design = await designRes.json();
        if (design.error) throw new Error(design.error);
        setDesignData(design);

        // Step 2: Write Copy
        setStep(2);
        const copyRes = await fetch('/api/generate', {
          method: 'POST',
          body: JSON.stringify({
            appName: formData?.appName,
            tagline: formData?.tagline,
            description: formData?.description,
            design,
          }),
        });
        const copy = await copyRes.json();
        if (copy.error) throw new Error(copy.error);
        setCopyData(copy);

        // Step 3: Build HTML
        setStep(3);
        const htmlRes = await fetch('/api/build-html', {
          method: 'POST',
          body: JSON.stringify({
            design,
            copy,
            screenshots: formData?.screenshots,
          }),
        });
        const html = await htmlRes.json();
        if (html.error) throw new Error(html.error);
        setHtmlData(html.html);

        setStep(4);
        setTimeout(() => {
          router.push('/preview/result');
        }, 1500);

      } catch (err: any) {
        setError(err.message);
      }
    }

    runPipeline();
  }, [formData]);

  const steps = [
    { label: 'Initializing Pipeline', icon: Zap },
    { label: 'Analyzing App Design', icon: Palette, model: 'GPT-4o Vision' },
    { label: 'Writing Case Study', icon: FileText, model: 'GPT-4o' },
    { label: 'Building HTML Page', icon: Code, model: 'GPT-4o' },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
            <h2 className="text-xl font-bold mb-2">Generation Failed</h2>
            <p className="text-sm opacity-80">{error}</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="text-emerald-500 hover:underline font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#10b98110,transparent_50%)]" />
      
      <div className="w-full max-w-xl space-y-12 relative">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black tracking-tight">AI is working...</h2>
          <p className="text-slate-500 font-medium italic">"Building unique designs takes a moment of digital thought."</p>
        </div>

        <div className="space-y-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isDone = step > i;
            const isCurrent = step === i;
            
            return (
              <div
                key={i}
                className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-500 ${
                  isCurrent ? 'bg-emerald-500/5 border-emerald-500/20 scale-[1.02] shadow-[0_0_40px_rgba(16,185,129,0.1)]' : 
                  isDone ? 'bg-slate-900/30 border-slate-800 opacity-60' : 'bg-transparent border-transparent opacity-30'
                }`}
              >
                <div className={`p-3 rounded-xl ${isDone ? 'bg-emerald-500 text-black' : isCurrent ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-800 text-slate-500'}`}>
                  {isDone ? <Check className="w-6 h-6" /> : isCurrent ? <Loader2 className="w-6 h-6 animate-spin" /> : <Icon className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <p className={`font-bold text-lg ${isCurrent ? 'text-white' : 'text-slate-400'}`}>{s.label}</p>
                  {s.model && isCurrent && (
                    <p className="text-emerald-500 text-sm font-mono mt-1">Using {s.model}</p>
                  )}
                  {s.model && isDone && (
                    <p className="text-slate-600 text-sm font-mono mt-1">Completed with {s.model}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
