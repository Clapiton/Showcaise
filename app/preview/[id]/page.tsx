'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Download, FileText, Image as ImageIcon, Archive, RefreshCw, ChevronLeft, Layout, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import JSZip from 'jszip';

export default function PreviewPage() {
  const router = useRouter();
  const { htmlData, formData } = useStore();
  const [exporting, setExporting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!htmlData) {
    if (typeof window !== 'undefined') router.push('/');
    return null;
  }

  const exportPDF = async () => {
    setExporting(true);
    try {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow) return;
      
      const doc = iframe.contentWindow.document;
      const element = doc.body;
      
      const imgData = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${formData?.appName || 'case-study'}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  const exportHero = async () => {
    setExporting(true);
    try {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow) return;
      
      const doc = iframe.contentWindow.document;
      const hero = doc.querySelector('.hero') || doc.body;
      
      const dataUrl = await toPng(hero as HTMLElement, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `${formData?.appName || 'app'}-hero.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  const exportZip = async () => {
    setExporting(true);
    try {
      const zip = new JSZip();
      
      // Add HTML
      zip.file('index.html', htmlData);
      
      // Add Hero Image
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        const doc = iframe.contentWindow.document;
        const hero = doc.querySelector('.hero') || doc.body;
        const dataUrl = await toPng(hero as HTMLElement, { pixelRatio: 2 });
        const base64Data = dataUrl.split(',')[1];
        zip.file('hero-banner.png', base64Data, { base64: true });
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `${formData?.appName || 'app'}-portfolio.zip`;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.push('/')}
            className="p-2 hover:bg-white/5 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="font-bold text-lg">{formData?.appName} Case Study</h1>
            <p className="text-xs text-slate-500 font-mono">Status: Ready to Export</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </button>
          <div className="h-6 w-[1px] bg-white/10 mx-2" />
          <div className="flex gap-2">
            <button
              onClick={exportPDF}
              disabled={exporting}
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-all disabled:opacity-50"
            >
              <FileText className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={exportZip}
              disabled={exporting}
              className="flex items-center gap-2 bg-emerald-500 text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-400 transition-all disabled:opacity-50"
            >
              <Archive className="w-4 h-4" />
              Export ZIP
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-80 border-r border-white/5 p-6 space-y-8 bg-black/20 overflow-y-auto hidden lg:block">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Asset Export</h3>
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={exportHero}
                className="flex items-center gap-3 w-full p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group text-left"
              >
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Hero Banner</p>
                  <p className="text-xs text-slate-500">1600x900 PNG</p>
                </div>
              </button>
              
              <button className="flex items-center gap-3 w-full p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group text-left opacity-50 cursor-not-allowed">
                <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Device Mockups</p>
                  <p className="text-xs text-slate-500">Individual Screens</p>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Case Study Info</h3>
            <div className="p-5 bg-white/5 rounded-2xl space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Category</p>
                <p className="font-medium">{formData?.category}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Platform</p>
                <p className="font-medium">{formData?.platform}</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-[#111] relative group">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <div className="bg-black/80 backdrop-blur px-4 py-2 rounded-full border border-white/10 text-xs text-slate-400">
              Preview Mode
            </div>
          </div>
          <iframe
            ref={iframeRef}
            srcDoc={htmlData}
            className="w-full h-full border-none"
            title="Preview"
          />
        </main>
      </div>

      {exporting && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-2xl font-black">Exporting your masterpiece...</p>
              <p className="text-slate-400 mt-2">Generating high-resolution assets</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
