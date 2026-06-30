'use client';

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import {
  API_PATH_CONTENT,
  API_PATH_CONTENT_TYPES,
  Content,
  ContentType
} from '@/app/_types/content';

interface ThemeContextFields {
  theme: string;
  flipTheme: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  fetchContent: (path: string, fetchAll?: boolean) => Promise<Content[]>;
  invalidateContent: () => void;
  contentTypes: ContentType[]
}

const INITIAL_THEME_CONTEXT : ThemeContextFields = {
  theme: 'light',
  flipTheme: () => {},
  menuOpen: false,
  setMenuOpen: () => {},
  fetchContent: () => Promise.resolve([]),
  invalidateContent: () => {},
  contentTypes: []
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

  const [contentTypesLoaded, setContentTypesLoaded] = useState<boolean>(false);
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);

  const [savedContent, setSavedContent] = useState<{[p: string]: Content[]}>({});
  const fetchContent = useCallback(async (path: string, fetchAll?: boolean): Promise<Content[]> => {
    if (savedContent[path]) {
      return savedContent[path];
    }

    let contents : Content[] = [];
    try {
      const url = fetchAll
        ? `${API_PATH_CONTENT}?fetch_all=true`
        : `${API_PATH_CONTENT}?page_path=${encodeURIComponent(path)}`;
      const res = await fetch(url);
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

  const invalidateContent = useCallback(() => {
    setSavedContent({});
  }, [setSavedContent]);

  const initialContext = {
    ...INITIAL_THEME_CONTEXT,
    theme,
    flipTheme,
    menuOpen,
    setMenuOpen,
    fetchContent,
    invalidateContent,
    contentTypes
  };

  useEffect(() => {
    async function setThemeOnMount() {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(isDark);
    }
    setThemeOnMount();
  }, []);

  useEffect(() => {
    if (contentTypesLoaded) return;

    async function loadContentTypes() {
      try {
        const res = await fetch(API_PATH_CONTENT_TYPES);
        if (!res.ok) throw new Error(`Fetch content types request failed: ${res.status}`);

        const types: ContentType[] = await res.json();

        setContentTypesLoaded(true);
        setContentTypes(types);
      } catch (err) {
        console.error(err);
      }
    }
    loadContentTypes();
  }, [contentTypesLoaded]);

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
