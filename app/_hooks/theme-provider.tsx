'use client';

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { API_PATH_CONTENT, Content } from '@/app/_types/content';

interface ThemeContextFields {
  theme: string;
  flipTheme: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  fetchContent: (path: string) => Promise<Content[]>;
}

const INITIAL_THEME_CONTEXT : ThemeContextFields = {
  theme: 'light',
  flipTheme: () => {},
  menuOpen: false,
  setMenuOpen: () => {},
  fetchContent: () => Promise.resolve([]),
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

  const [savedContent, setSavedContent] = useState<{[p: string]: Content[]}>({});
  const fetchContent = useCallback(async (path: string): Promise<Content[]> => {
    if (savedContent[path]) {
      return savedContent[path];
    }

    let contents : Content[] = [];
    try {
      const res = await fetch(`${API_PATH_CONTENT}?page_path=${encodeURIComponent(path)}`);
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}.`);
      }

      contents = await res.json() as Content[];
    } catch (err) {
      console.error(err);
      return [];
    }

    const newSavedContent = { ...savedContent };
    newSavedContent[path] = contents;
    setSavedContent(newSavedContent);

    return contents;
  }, [savedContent, setSavedContent]);

  const initialContext = {
    ...INITIAL_THEME_CONTEXT,
    theme,
    flipTheme,
    menuOpen,
    setMenuOpen,
    fetchContent,
  };

  useEffect(() => {
    async function setThemeOnMount() {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(isDark);
    }
    setThemeOnMount();
  }, []);

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
