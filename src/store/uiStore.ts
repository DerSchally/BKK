import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  crisisMode: boolean;
  language: 'de' | 'en';
  highContrast: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  toggleCrisisMode: () => void;
  setCrisisMode: (active: boolean) => void;
  setLanguage: (lang: 'de' | 'en') => void;
  toggleHighContrast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  sidebarCollapsed: false,
  crisisMode: false,
  language: 'de',
  highContrast: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebarCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleCrisisMode: () => set((state) => ({ crisisMode: !state.crisisMode })),
  setCrisisMode: (active) => set({ crisisMode: active }),
  setLanguage: (lang) => set({ language: lang }),
  toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
}));
