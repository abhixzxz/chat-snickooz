'use client';

import { useThemeStore, themeColors } from '@/app/store/theme-store';
import { createContext, useContext, useEffect } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const colors = themeColors[theme];
    if (!colors) return;

    // Apply theme colors to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--foreground', colors.text);
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--muted', colors.muted);
    root.style.setProperty('--muted-foreground', colors['muted-foreground']);

    // Update body background and text color
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};