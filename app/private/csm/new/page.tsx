'use client';

import Form from 'next/form';
import { useActionState, useCallback, useEffect, useState, Dispatch } from 'react';

import { PrimaryButton } from '@/app/_components/buttons/buttons';
import Input from '@/app/_components/input/input';
import Select from '@/app/_components/select/select';
import Title from '@/app/_components/title/title';

import { createContent } from '@/app/_forms/content';

import {
  API_PATH_CONTENT_TYPES,
  INITIAL_CONTENT_STATE,
  ContentType,
  PLACEHOLDER_CONTENT_TYPE,
  getUserInput
} from '@/app/_types/content';

export default function NewContent() {
  const [actionState, formAction] = useActionState(createContent, INITIAL_CONTENT_STATE);

  const [page, setPage] = useState<string>('');
  const [sequence, setSequence] = useState<string>('');

  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  // const [loadingTypes, setLoadingTypes] = useState<boolean>(true);
  const [selectedContentType, changeContentType] = useState<ContentType>(
    PLACEHOLDER_CONTENT_TYPE
  );
  const setContentType = (type: ContentType) => {
    setAllContent({});
    changeContentType(type);
  };

  const [content, setAllContent] = useState<{ [k: string]: unknown }>({});
  const setContent = useCallback((name: string, value: unknown) => {
    const newContent = { ...content };
    newContent[name] = value;
    setAllContent(newContent);
  }, [content, setAllContent]);

  useEffect(() => {

    let ignoreAfterUnmount = false;

    async function load() {
      try {
        const res = await fetch(API_PATH_CONTENT_TYPES);
        if (!res.ok) throw new Error(`Request failed: ${res.status}.`);
        if (!ignoreAfterUnmount) {
          const types : ContentType[] = await res.json();

          setContentTypes(types);
          setContentType(types[0]);
        }
      } catch (err) {
        if (!ignoreAfterUnmount) {
          console.error(err);
        }
      } finally {
        if (!ignoreAfterUnmount) {
          // setLoadingTypes(false);
        }
      }
    }

    load();

    return () => { ignoreAfterUnmount = true; }

  }, []);

  return (
    <>
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
          preLabel="Content Type:"
          selected={selectedContentType}
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

        {selectedContentType.reqs && (selectedContentType.reqs as string).split(',').map(
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
