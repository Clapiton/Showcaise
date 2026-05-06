'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Check, Loader2, Zap, Palette, FileText, Code, RefreshCcw, Layout as LayoutIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GeneratingPage() {
  const router = useRouter();
  const { formData, designData, copyData, setDesignData, setCopyData, setHtmlData } = useStore();
  
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [models, setModels] = useState<Record<number, string>>({
    1: 'GPT-4o Vision',
    2: 'GPT-4o',
    3: 'DeepSeek Chat'
  });

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
        const designJson = await designRes.json();
        if (designJson.error) throw new Error(designJson.error);
        
        setDesignData(designJson.data);
        setModels(prev => ({ ...prev, 1: designJson.modelId }));

        // Step 2: Write Copy
        setStep(2);
        const copyRes = await fetch('/api/generate', {
          method: 'POST',
          body: JSON.stringify({
            appName: formData?.appName,
            tagline: formData?.tagline,
            description: formData?.description,
            design: designJson.data,
          }),
        });
        const copyJson = await copyRes.json();
        if (copyJson.error) throw new Error(copyJson.error);
        
        setCopyData(copyJson.data);
        setModels(prev => ({ ...prev, 2: copyJson.modelId }));

        // Step 3: Build HTML
        setStep(3);
        const htmlRes = await fetch('/api/build-html', {
          method: 'POST',
          body: JSON.stringify({
            design: designJson.data,
            copy: copyJson.data,
            screenshotCount: formData?.screenshots?.length || 0,
          }),
        });
        const htmlJson = await htmlRes.json();
        if (htmlJson.error) throw new Error(htmlJson.error);
        
        let finalHtml = htmlJson.html;
        setModels(prev => ({ ...prev, 3: htmlJson.modelId }));

        // Client-side placeholder replacement
        if (formData?.screenshots) {
          formData.screenshots.forEach((url, i) => {
            const placeholder = `PLACEHOLDER_SCREENSHOT_${i}`;
            finalHtml = finalHtml.split(placeholder).join(url);
          });
        }

        setHtmlData(finalHtml);

        // Save to persistent storage
        const currentFormData = formData;
        if (currentFormData) {
          const addPortfolio = useStore.getState().addPortfolio;
          addPortfolio({
            id: Date.now().toString(),
            name: currentFormData.appName,
            category: currentFormData.category,
            date: new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            }),
            htmlData: htmlJson.html,
            formData: currentFormData
          });
        }

        setStep(4);
        setTimeout(() => {
          router.push('/preview/result');
        }, 2000);

      } catch (err: any) {
        console.error('Pipeline error:', err);
        setError(err.message);
      }
    }

    runPipeline();
  }, [formData]);

  const steps = [
    { id: 0, label: 'Initializing Pipeline', icon: Zap },
    { id: 1, label: 'Analyzing App Design', icon: Palette },
    { id: 2, label: 'Writing Case Study', icon: FileText },
    { id: 3, label: 'Building HTML Page', icon: Code },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <RefreshCcw className="w-10 h-10 text-red-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white">Generation Failed</h2>
            <p className="text-slate-400 font-medium italic">"Sometimes the AI gets lost in the pixels."</p>
          </div>
          <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl text-red-400 text-sm font-mono text-left overflow-auto max-h-40">
            {error}
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-full transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            Go Back & Edit Input
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-20 flex flex-col lg:flex-row gap-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#10b98110,transparent_50%)] pointer-events-none" />
      
      {/* Left Column: Progress Steps */}
      <div className="flex-1 space-y-12 relative z-10">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black tracking-tight"
          >
            AI is working...
          </motion.h2>
          <p className="text-slate-500 font-medium italic text-lg">"Building unique designs takes a moment of digital thought."</p>
        </div>

        <div className="space-y-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isDone = step > i;
            const isCurrent = step === i;
            const modelName = models[s.id as keyof typeof models];
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-500 ${
                  isCurrent ? 'bg-emerald-500/5 border-emerald-500/20 scale-[1.02] shadow-[0_0_40px_rgba(16,185,129,0.1)]' : 
                  isDone ? 'bg-slate-900/30 border-slate-800/50 opacity-60' : 'bg-transparent border-transparent opacity-30'
                }`}
              >
                <div className={`p-3 rounded-xl ${isDone ? 'bg-emerald-500 text-black' : isCurrent ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-800 text-slate-500'}`}>
                  {isDone ? <Check className="w-6 h-6" /> : isCurrent ? <Loader2 className="w-6 h-6 animate-spin" /> : <Icon className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <p className={`font-bold text-lg ${isCurrent ? 'text-white' : 'text-slate-400'}`}>{s.label}</p>
                  <AnimatePresence mode="wait">
                    {modelName && (isCurrent || isDone) && (
                      <motion.p 
                        key={modelName}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${isDone ? 'text-slate-600' : 'text-emerald-500'} text-xs font-mono mt-1 uppercase tracking-wider`}
                      >
                        {isDone ? 'Completed with' : 'Using'} {modelName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Visual Canvas */}
      <div className="flex-[1.2] min-h-[500px] relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="sticky top-20 w-full aspect-[4/5] bg-slate-900/50 rounded-[32px] border border-slate-800 overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Toolbar */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
              </div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest ml-2">Live Build Canvas</span>
            </div>
            <div className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
              {step === 3 ? 'RENDERING HTML' : step === 2 ? 'WRITING CONTENT' : step === 1 ? 'EXTRACTING STYLE' : 'INITIALIZING'}
            </div>
          </div>

          {/* Canvas Content */}
          <div className="flex-1 p-8 relative overflow-hidden transition-colors duration-1000" style={{ 
            backgroundColor: designData?.bg_color || '#0a0a0a',
            fontFamily: designData?.font_pairing?.body || 'inherit'
          }}>
            <AnimatePresence>
              {!designData && (
                <motion.div 
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-slate-700"
                >
                  <LayoutIcon className="w-16 h-16 mb-4 opacity-20 animate-pulse" />
                  <p className="text-sm font-mono tracking-tighter uppercase opacity-40">Awaiting visual language...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {designData && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8 h-full"
              >
                {/* Hero Shell */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ 
                      backgroundColor: `${designData.primary_color}20`, 
                      color: designData.primary_color,
                      borderColor: `${designData.primary_color}40`,
                      borderWidth: 1
                    }}>
                      {formData?.category}
                    </div>
                    <div className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/5 text-white/40 border border-white/10">
                      {designData.mood}
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-black leading-tight" style={{ 
                    color: designData.text_color,
                    fontFamily: designData.font_pairing?.display
                  }}>
                    {copyData?.hero_headline || formData?.appName || 'Generating Title...'}
                  </h1>
                  
                  <p className="text-sm opacity-60 leading-relaxed max-w-[80%]" style={{ color: designData.text_color }}>
                    {copyData?.hero_subheadline || formData?.tagline || 'Crafting the perfect narrative for your product...'}
                  </p>
                </div>

                {/* Mockup Shell */}
                <div className="relative aspect-video rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-xl">
                  {formData?.screenshots?.[0] ? (
                    <img 
                      src={formData.screenshots[0]} 
                      className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" 
                      alt="preview"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Palette className="w-12 h-12 text-white/5" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 15, repeat: Infinity }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>

                {/* Grid Shell */}
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map(i => (
                    <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/5 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-white/5" />
                      <div className="h-3 w-2/3 bg-white/10 rounded" />
                      <div className="h-2 w-full bg-white/5 rounded" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ 
              backgroundImage: `radial-gradient(circle at 1px 1px, ${designData?.text_color || 'white'} 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
