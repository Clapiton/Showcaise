import UploadForm from '@/components/UploadForm';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#10b98120,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-20 relative">
        <div className="text-center space-y-6 mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered Case Study Generator
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Turn your app into a <br />
            <span className="text-emerald-500">Masterpiece.</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Upload screenshots and let our multi-agent AI pipeline design, write, 
            and build a stunning editorial case study in seconds.
          </p>
        </div>

        <UploadForm />
      </div>
      
      <footer className="border-t border-slate-900 py-12 mt-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>© 2024 Showcaise. Built with GPT-4o, Gemini & DeepSeek.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
