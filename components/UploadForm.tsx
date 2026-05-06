'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, ChevronRight, Layout, Type, Palette } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function UploadForm() {
  const router = useRouter();
  const setFormData = useStore((state) => state.setFormData);
  const resetCurrent = useStore((state) => state.resetCurrent);
  
  const [appName, setAppName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Marketplace');
  const [platform, setPlatform] = useState('Mobile');
  const [screenshots, setScreenshots] = useState<File[]>([]);

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
    resetCurrent();
    
    // Convert files to base64 with compression
    const compressImage = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            
            // Max 1200px width/height
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
            
            // Compress to JPEG 0.7
            resolve(canvas.toDataURL('image/jpeg', 0.7));
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    };

    const base64Screenshots = await Promise.all(screenshots.map(compressImage));

    setFormData({
      appName,
      tagline,
      description,
      category,
      platform,
      screenshots: base64Screenshots,
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

      <div className="space-y-4">
        <label className="text-sm font-medium text-slate-400">Screenshots (Up to 8)</label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
            isDragActive ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 hover:border-slate-700'
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
            {screenshots.map((file, index) => (
              <div key={index} className="relative group aspect-[9/16] rounded-lg overflow-hidden border border-slate-800">
                <img
                  src={URL.createObjectURL(file)}
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
