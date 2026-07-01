'use client';

import { useEffect, useState } from 'react';

import MapContent from '../_components/content/map-content';
import { useThemes } from '../_hooks/theme-provider';
import { Content } from '../_types/content';

const PAGE_PATH = '/portfolio';

export default function Portfolio() {
  const { fetchContent } = useThemes();
  const [contentsLoaded, setContentsLoaded] = useState<boolean>(false);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    if (contentsLoaded) return;

    async function loadContents() {
      const res: Content[] = await fetchContent(PAGE_PATH);
      setContents(res);
      setContentsLoaded(true);
    }
    loadContents();
  }, [contentsLoaded, fetchContent]);

  return (
    <>
      {contents
        .sort((a: Content, b: Content) => {
          return (a.index ?? 1000) < (b.index ?? 1000) ? -1 : 1;
        })
        .map((content: Content, i: number) => <MapContent key={`${i}-${content.type}`} content={content}/>)
      }
    </>
  );
}