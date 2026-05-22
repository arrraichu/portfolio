'use client';

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextFields {
  theme: string;
  flipTheme: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const INITIAL_THEME_CONTEXT : ThemeContextFields = {
  theme: 'light',
  flipTheme: () => {},
  menuOpen: false,
  setMenuOpen: () => {},
};

const ThemeContext = createContext<ThemeContextFields>(INITIAL_THEME_CONTEXT);

export function ThemeProvider({ children }: Readonly<{
  children: React.ReactNode
}>) {
  const [theme, setTheme] = useState<string>('light');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const flipTheme = () => {
    if (theme == 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  const initialContext = {
    ...INITIAL_THEME_CONTEXT,
    theme,
    flipTheme,
    menuOpen,
    setMenuOpen,
  };

  useEffect(() => {
    async function setThemeOnMount() {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(isDark);
    }
    setThemeOnMount();
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('theme-transition');
    document.documentElement.dataset.theme = theme;
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  }, [theme]);

  return (
    <ThemeContext value={initialContext}>
      {children}
    </ThemeContext>
  )
};

export function useThemes() {
  return useContext(ThemeContext);
}
