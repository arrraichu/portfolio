'use client';

import { useState, Dispatch } from 'react';
import { z } from 'zod';

import Input from '@/app/_components/input/input';
import Select from '@/app/_components/select/select';
import Title from '@/app/_components/title/title';
import Textarea from '@/app/_components/input/textarea';


interface ContentType {
  code: string,
  label: string
};

const contentTypes: ContentType[] = [
  { code: 'title', label: 'title' },
  { code: 'standard', label: 'standard' }
];

const ContentSchema = z.object({

});
type ContentForm = z.infer<typeof ContentSchema>;

export default function NewContent() {
  const [selectedContentType, setContentType] = useState<ContentType>(contentTypes[0]);
  const [sequence, setSequence] = useState<string>('');
  const [text, setText] = useState<string>('');

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

      <Input
        preLabel="Sequence:"
        placeholder="-1"
        value={sequence}
        setValue={setSequence}
      />

      <Textarea
        preLabel="Text:"
        rows={4}
        value={text}
        setValue={setText}
      />

    </>
  );
}