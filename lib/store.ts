import { create } from 'zustand';

interface FormData {
  appName: string;
  tagline: string;
  description: string;
  category: string;
  platform: string;
  screenshots: string[];
}

interface PortfolioStore {
  formData: FormData | null;
  designData: any | null;
  copyData: any | null;
  htmlData: string | null;
  setFormData: (data: FormData) => void;
  setDesignData: (data: any) => void;
  setCopyData: (data: any) => void;
  setHtmlData: (data: string) => void;
}

export const useStore = create<PortfolioStore>((set) => ({
  formData: null,
  designData: null,
  copyData: null,
  htmlData: null,
  setFormData: (formData) => set({ formData }),
  setDesignData: (designData) => set({ designData }),
  setCopyData: (copyData) => set({ copyData }),
  setHtmlData: (htmlData) => set({ htmlData }),
}));
