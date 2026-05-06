'use client';

import { useStore } from "@/lib/store";
import { Folder, Plus, Layout, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardClient() {
  const router = useRouter();
  const { portfolios, deletePortfolio, setHtmlData, setFormData } = useStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handlePreview = (portfolio: any) => {
    setHtmlData(portfolio.htmlData);
    setFormData(portfolio.formData);
    router.push(`/preview/${portfolio.id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => (
        <div 
          key={portfolio.id}
          className="group relative bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500"
        >
          <div className="aspect-[4/3] bg-slate-800/50 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Layout className="w-12 h-12 text-slate-700 group-hover:scale-110 group-hover:text-emerald-500/30 transition-all duration-700" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div className="flex gap-2 w-full">
                <button 
                  onClick={() => handlePreview(portfolio)}
                  className="flex-1 bg-white text-black py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Preview
                </button>
                <button 
                  onClick={() => deletePortfolio(portfolio.id)}
                  className="p-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg group-hover:text-emerald-400 transition-colors">{portfolio.name}</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{portfolio.category}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{portfolio.date}</span>
              <div className="flex -space-x-2">
                {portfolio.formData.screenshots.slice(0, 3).map((s, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-black overflow-hidden">
                    <img src={s} alt="screen" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Empty State / Add New */}
      <Link 
        href="/"
        className="flex flex-col items-center justify-center gap-4 aspect-[4/3] border-2 border-dashed border-slate-800 rounded-3xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
      >
        <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Plus className="w-6 h-6 text-slate-500" />
        </div>
        <p className="text-sm font-bold text-slate-500 group-hover:text-emerald-500 transition-colors">Start New Project</p>
      </Link>
    </div>
  );
}
