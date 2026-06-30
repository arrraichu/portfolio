'use client';

import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useActionState, useCallback, useEffect, useState, Dispatch } from 'react';

import { PrimaryButton } from '@/app/_components/buttons/buttons';
import Input from '@/app/_components/input/input';
import Select from '@/app/_components/select/select';
import Title from '@/app/_components/title/title';
import Breadcrumb from '@/app/_components/navigation/breadcrumb';

import { createContent } from '@/app/_forms/content';
import { useThemes } from '@/app/_hooks/theme-provider';

import {
  INITIAL_CONTENT_STATE,
  PLACEHOLDER_CONTENT_TYPE,
  ContentType,
  getUserInput
} from '@/app/_types/content';

const PAGE_BREADCRUMBS = [
  { name: 'Home', location: '/' },
  { name: 'Private', location: '/private' },
  { name: 'Content Management', location: '/private/cms' },
  { name: 'Create', location: '/private/cms/new' }
]

export default function NewContent() {
  const { contentTypes, invalidateContent } = useThemes();
  const [actionState, formAction] = useActionState(createContent, INITIAL_CONTENT_STATE);
  const router = useRouter();

  useEffect(() => {
    if (actionState.status === 200) {
      invalidateContent();
      router.push('/private');
    }
  }, [actionState.status, invalidateContent, router]);

  const [page, setPage] = useState<string>('');
  const [sequence, setSequence] = useState<string>('');

  const [content, setAllContent] = useState<{ [k: string]: unknown }>({});
  const setContent = useCallback((name: string, value: unknown) => {
    const newContent = { ...content };
    newContent[name] = value;
    setAllContent(newContent);
  }, [content, setAllContent]);

  const [selectedContentType, changeContentType] 
    = useState<ContentType | null>(null);
  const setContentType = (type: ContentType) => {
    setAllContent({});
    changeContentType(type);
  };

  const activeContentType = selectedContentType ?? contentTypes[0] ?? PLACEHOLDER_CONTENT_TYPE;

  return (
    <>
      <Breadcrumb crumbs={PAGE_BREADCRUMBS} />

      <Title title="Create new content" subtitle="" />

      <Form action={formAction}>

        <Input
          name="page_path"
          preLabel="Page:"
          placeholder="Enter a page path..."
          error={actionState.errors.page_path}
          value={page}
          setValue={setPage}
        />

        <Select
          name="content_type"
          preLabel="Content type:"
          selected={activeContentType}
          setSelected={setContentType as Dispatch<unknown>}
          allItems={contentTypes}
          getItemString={ i => (i as ContentType).label.toUpperCase() }
          getItemKey={ i => (i as ContentType).code }
        />

        <Input
          name="sequence"
          preLabel="Sequence:"
          placeholder="-1"
          error={actionState.errors.sequence}
          value={sequence}
          setValue={setSequence}
        />

        {activeContentType.reqs && (activeContentType.reqs as string).split(',').map(
          (req: string) => getUserInput(
            req,
            (content[req] as string) ?? '',
            value => setContent(req, value),
            actionState.errors[req]
          )
        )}

        <div className=" py-5 px-8 md:px-12 lg:px-20">
          <PrimaryButton
            type="submit"
            text="Save"
          />
        </div>
      
      </Form>

    </>
  );
}
