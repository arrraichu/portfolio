'use client';

import { useState, Dispatch } from 'react';

import Title from '@/app/_components/title/title';
import Select from '@/app/_components/select/select';

interface ContentType {
  code: string,
  label: string
};

const contentTypes: ContentType[] = [
  { code: 'title', label: 'title' },
  { code: 'standard', label: 'standard' }
];

export default function NewContent() {
  const [selectedContentType, setContentType] = useState<ContentType>(contentTypes[0]);

  return (
    <>
      <Title title="Create new content" subtitle="" />

      <Select
        preLabel="Content Type:"
        selected={selectedContentType}
        setSelected={setContentType as Dispatch<unknown>}
        allItems={contentTypes}
        getItemString={ i => (i as ContentType).label.toUpperCase() }
        getItemKey={ i => (i as ContentType).code }
      />
      
    </>
  );
}