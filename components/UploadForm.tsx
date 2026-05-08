'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, ChevronRight, Layout, Type, Palette, Zap, FileText, Code } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function UploadForm() {
  const router = useRouter();
  const { setFormData, resetCurrent, formData: savedData, modelPrefs, setModelPrefs } = useStore();

  const [appName, setAppName] = useState(savedData?.appName || '');
  const [tagline, setTagline] = useState(savedData?.tagline || '');
  const [description, setDescription] = useState(savedData?.description || '');
  const [category, setCategory] = useState(savedData?.category || 'Marketplace');
  const [platform, setPlatform] = useState(savedData?.platform || 'Mobile');
  const [themePreference, setThemePreference] = useState(savedData?.themePreference || 'auto');

  // screenshots can be a mix of Files (new) and base64 strings (restored)
  const [screenshots, setScreenshots] = useState<(File | string)[]>(savedData?.screenshots || []);

  const onDrop = (acceptedFiles: File[]) => {
    setScreenshots((prev) => [...prev, ...acceptedFiles].slice(0, 8));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 8,
  });

  const removeImage = (index: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // We don't call resetCurrent here because we want to preserve input if they go back
    // resetCurrent(); 

    // Convert files to base64 with compression
    const processImage = (item: File | string): Promise<string> => {
      if (typeof item === 'string') return Promise.resolve(item);

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            const MAX_SIZE = 1200;
            if (width > height) {
              if (width > MAX_SIZE) {
                height *= MAX_SIZE / width;
                width = MAX_SIZE;
              }
            } else {
              if (height > MAX_SIZE) {
                width *= MAX_SIZE / height;
                height = MAX_SIZE;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.7));
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(item);
      });
    };

    const base64Screenshots = await Promise.all(screenshots.map(processImage));

    setFormData({
      appName,
      tagline,
      description,
      category,
      platform,
      screenshots: base64Screenshots,
      themePreference,
    });

    router.push('/generating');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">App Name</label>
            <input
              required
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="e.g. ServiceConnect"
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Tagline</label>
            <input
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Find local services in seconds"
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
            >
              {['Marketplace', 'Health', 'Finance', 'Social', 'Productivity', 'IoT', 'Education', 'Other'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Theme Preference</label>
            <select
              value={themePreference}
              onChange={(e) => setThemePreference(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
            >
              <option value="auto">✨ AI Automatic (Recommended)</option>
              <option value="classic-modern">Classic Modern</option>
              <option value="editorial">Editorial Dark</option>
              <option value="magazine">Magazine Editorial</option>
              <option value="minimal-clean">Minimal Clean</option>
              <option value="vibrant-energetic">Vibrant Energetic</option>
              <option value="bold-impact">Bold Impact</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell the AI about your app's core value, the problem it solves, and its main features..."
              rows={8}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* Advanced Model Selection */}
      <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-emerald-500 mb-2">
          <Zap size={20} />
          <h3 className="font-semibold text-lg">AI Pipeline Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Palette size={14} /> Design Agent
            </label>
            <select
              value={modelPrefs.design}
              onChange={(e) => setModelPrefs({ ...modelPrefs, design: e.target.value })}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
            >
              <option value="gpt-5.5">GPT-5.5 (Supreme Vision)</option>
              <option value="gpt-5">GPT-5 (Standard)</option>
              <option value="gpt-5-turbo">GPT-5 Turbo (Responsive)</option>
              <option value="gpt-4o">GPT-4o (Legacy Pro)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <FileText size={14} /> Copy Agent
            </label>
            <select
              value={modelPrefs.copy}
              onChange={(e) => setModelPrefs({ ...modelPrefs, copy: e.target.value })}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
            >
              <option value="gpt-5.5">GPT-5.5 (Supreme Creative)</option>
              <option value="gpt-5">GPT-5 (Analytical)</option>
              <option value="gpt-5-nano">GPT-5 Nano (Fastest)</option>
              <option value="gpt-5-turbo">GPT-5 Turbo (Balanced)</option>
              <option value="deepseek-v4-pro">DeepSeek V4 Pro (Reasoning)</option>
              <option value="deepseek-v4-flash">DeepSeek V4 Flash (Fast)</option>
              <option value="gpt-4o">GPT-4o (Standard)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Code size={14} /> HTML Agent
            </label>
            <select
              value={modelPrefs.html}
              onChange={(e) => setModelPrefs({ ...modelPrefs, html: e.target.value })}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
            >
              <option value="gpt-5.5">GPT-5.5 (Master Architect)</option>
              <option value="gpt-5">GPT-5 (Pro Design)</option>
              <option value="gpt-5-turbo">GPT-5 Turbo (Advanced)</option>
              <option value="deepseek-v4-pro">DeepSeek V4 Pro (Complex)</option>
              <option value="gpt-4o">GPT-4o (Standard)</option>
              <option value="gpt-4o-mini">GPT-4o Mini (Budget)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-slate-400">Screenshots (Up to 8)</label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${isDragActive ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 hover:border-slate-700'
            }`}
        >
          <input {...getInputProps()} />
          <div className="p-4 bg-slate-800 rounded-full">
            <Upload className="w-8 h-8 text-slate-400" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">Click or drag screenshots here</p>
            <p className="text-sm text-slate-500">Supports JPG, PNG (Max 8 files)</p>
          </div>
        </div>

        {screenshots.length > 0 && (
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {screenshots.map((item, index) => (
              <div key={index} className="relative group aspect-[9/16] rounded-lg overflow-hidden border border-slate-800">
                <img
                  src={typeof item === 'string' ? item : URL.createObjectURL(item)}
                  className="w-full h-full object-cover"
                  alt="preview"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center pt-8">
        <button
          type="submit"
          className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
        >
          Generate Case Study
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
