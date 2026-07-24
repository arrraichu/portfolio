'use client';

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import {
  API_PATH_CONTENT,
  API_PATH_CONTENT_TYPES,
  Content,
  ContentType
} from '@/app/_types/content';

const THEME_COOKIE_NAME = 'theme';
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getThemeCookie(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${THEME_COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setThemeCookie(value: string) {
  document.cookie = `${THEME_COOKIE_NAME}=${encodeURIComponent(value)}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
}

type LoadContentsFields = {
  fetch_all?: boolean,
  path?: string,
  invalidate_saved_content?: boolean
};

type ThemeContextFields = {
  theme: string,
  flipTheme: () => void,
  menuOpen: boolean,
  setMenuOpen: (open: boolean) => void,
  loadContents: (options: LoadContentsFields) => Promise<Content[]>,
  invalidateContent: () => void,
  contentTypes: ContentType[]
}

const INITIAL_THEME_CONTEXT : ThemeContextFields = {
  theme: 'light',
  flipTheme: () => {},
  menuOpen: false,
  setMenuOpen: () => {},
  loadContents: () => Promise.resolve([]),
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
    const newTheme = theme == 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setThemeCookie(newTheme);
  }

  const [contentTypesLoaded, setContentTypesLoaded] = useState<boolean>(false);
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);

  const [savedContent, setSavedContent] = useState<{[p: string]: Content[]}>({});
  const loadContents = useCallback(
    async (options: LoadContentsFields): Promise<Content[]> => {
      if (!options.path && !options.fetch_all) {
        console.error('A path must be provided and fetch_all is not true.');
        return [];
      }

      if (!options.invalidate_saved_content) {
        if (options.fetch_all) {
          const allContent: Content[] = [];
          for (const pathContents of Object.values(savedContent)) {
            allContent.push(...pathContents);
          }
          return allContent;
        }

        if (savedContent[options.path as string]) {
          return savedContent[options.path as string];
        }
      }

      let contents: Content[] = [];
      try {
        const url = options.fetch_all
          ? `${API_PATH_CONTENT}?fetch_all=true`
          : `${API_PATH_CONTENT}?page_path=${encodeURIComponent(options.path as string)}`;
        const res = await fetch(url);
        if (!res.ok) {
          console.error(`Request failed: ${res.status}.`);
          return [];
        }

        contents = await res.json() as Content[];
      } catch (e) {
        console.error(e);
        return [];
      }

      if (options.fetch_all) {
        const newSavedContent = contents.reduce(
          (acc: {[k: string]: Content[]}, current: Content) => {
            const path: string = current.page_path;
            if (!acc[path]) {
              acc[path] = [] as Content[];
            }
            acc[path].push(current);

            return acc;
          },
          {}
        );
        setSavedContent(newSavedContent);
      } else {
        const newSavedContent = { ...savedContent };
        newSavedContent[options.path as string] = contents;
        setSavedContent(newSavedContent);
      }

      return contents;
    },
    [savedContent]
  );

  const invalidateContent = useCallback(() => {
    setSavedContent({});
  }, [setSavedContent]);

  const initialContext = {
    ...INITIAL_THEME_CONTEXT,
    theme,
    flipTheme,
    menuOpen,
    setMenuOpen,
    loadContents,
    invalidateContent,
    contentTypes
  };

  useEffect(() => {
    async function setThemeOnMount() {
      const savedTheme = getThemeCookie();
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
        return;
      }

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
