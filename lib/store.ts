import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface FormData {
  appName: string;
  tagline: string;
  description: string;
  category: string;
  platform: string;
  screenshots: string[];
}

export interface Portfolio {
  id: string;
  name: string;
  category: string;
  date: string;
  htmlData: string;
  formData: FormData;
}

interface PortfolioStore {
  formData: FormData | null;
  designData: any | null;
  copyData: any | null;
  htmlData: string | null;
  portfolios: Portfolio[];
  setFormData: (data: FormData) => void;
  setDesignData: (data: any) => void;
  setCopyData: (data: any) => void;
  setHtmlData: (data: string) => void;
  addPortfolio: (portfolio: Portfolio) => void;
  deletePortfolio: (id: string) => void;
  resetCurrent: () => void;
}

export const useStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      formData: null,
      designData: null,
      copyData: null,
      htmlData: null,
      portfolios: [],
      setFormData: (formData) => set({ formData }),
      setDesignData: (designData) => set({ designData }),
      setCopyData: (copyData) => set({ copyData }),
      setHtmlData: (htmlData) => set({ htmlData }),
      addPortfolio: (portfolio) => set((state) => ({ 
        portfolios: [portfolio, ...state.portfolios] 
      })),
      deletePortfolio: (id) => set((state) => ({ 
        portfolios: state.portfolios.filter(p => p.id !== id) 
      })),
      resetCurrent: () => set({
        formData: null,
        designData: null,
        copyData: null,
        htmlData: null,
      }),
    }),
    {
      name: 'showcaise-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
