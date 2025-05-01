import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeType = 'default' | 'dark-night' | 'red-blood' | 'blue-ocean'

interface ThemeState {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

interface ThemeColors {
  [key: string]: {
    background: string
    text: string
    primary: string
    secondary: string
    accent: string
    muted: string
    'muted-foreground': string
  }
}

export const themeColors: ThemeColors = {
  default: {
    background: 'white',
    text: 'black',
    primary: '#0ea5e9',
    secondary: '#64748b',
    accent: '#f59e0b',
    muted: '#f1f5f9',
    'muted-foreground': '#64748b'
  },
  'dark-night': {
    background: '#121212',
    text: 'white',
    primary: '#1DB954',
    secondary: '#535353',
    accent: '#1DB954',
    muted: '#282828',
    'muted-foreground': '#a3a3a3'
  },
  'red-blood': {
    background: '#0a0a0a',
    text: 'white',
    primary: '#dc2626',
    secondary: '#450a0a',
    accent: '#b91c1c',
    muted: '#1c1917',
    'muted-foreground': '#a3a3a3'
  },
  'blue-ocean': {
    background: '#0c0c2b',
    text: 'white',
    primary: '#2563eb',
    secondary: '#1e3a8a',
    accent: '#3b82f6',
    muted: '#1e1b4b',
    'muted-foreground': '#a3a3a3'
  }
}

export const useThemeStore = create<ThemeState>(
  persist(
    (set) => ({
      theme: 'default' as ThemeType,
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'theme-storage'
    }
  )
)