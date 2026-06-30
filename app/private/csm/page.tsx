'use client';

import clsx from 'clsx';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Form from 'next/form';
import { useActionState, useCallback, useEffect, useState, Dispatch } from 'react';

import { XCircleIcon } from '@heroicons/react/24/solid';

import { updateContent } from '@/app/_forms/content';
import { useThemes } from '@/app/_hooks/theme-provider';
import {
  INITIAL_CONTENT_STATE,
  PLACEHOLDER_CONTENT_TYPE,
  Content,
  ContentType,
  getUserInput
} from '@/app/_types/content';

import Breadcrumb from '@/app/_components/navigation/breadcrumb';
import StandardWrapper from '@/app/_components/wrappers/standard-wrapper';
import Title from '@/app/_components/title/title';
import Input from '@/app/_components/input/input';
import Select from '@/app/_components/select/select';
import { PrimaryButton, SecondaryButton } from '@/app/_components/buttons/buttons';

const PAGE_BREADCRUMBS = [
  { name: 'Home', location: '/' },
  { name: 'Private', location: '/private' },
  { name: 'Content Management', location: '/private/cms' }
];

export default function CMSPage() {
  const { contentTypes, fetchContent, invalidateContent } = useThemes();
  const [actionState, formAction] = useActionState(updateContent, INITIAL_CONTENT_STATE);

  const [contentsLoaded, setContentsLoaded] = useState<boolean>(false);
  const [contents, setContents] = useState<Content[]>([]);

  const [content, setContentValues] = useState<{ [k: string]: unknown }>({});
  const setContent = useCallback((name: string, value: unknown) => {
    const newContent = { ...content };
    newContent[name] = value;
    setContentValues(newContent);
  }, [content, setContentValues]);

  const [dialogSetIndex, setDialogSetIndex] = useState<number>(-1);

  const [selectedContentType, changeContentType]
    = useState<ContentType | null>(null);
  const setContentType = useCallback((type: ContentType) => {
    const newContent: Content = {
      id: contents[dialogSetIndex].id,
      page_path: contents[dialogSetIndex].page_path,
      type: contents[dialogSetIndex].type,
      index: contents[dialogSetIndex].index
    };

    setContentValues(newContent);
    changeContentType(type);
  }, [contents, dialogSetIndex]);
  const activeContentType: ContentType
    = selectedContentType ?? contentTypes[0] ?? PLACEHOLDER_CONTENT_TYPE;

  const setDialogIndex = useCallback((i: number) => {
    if (i == dialogSetIndex) return;
    if (i >= contents.length) return;

    const c  = contents[i] as { [k: string]: unknown };
    setContentValues(c);

    if (c?.type) {
      const contentType = contentTypes.find(t => t.code === c.type);
      if (contentType) {
        changeContentType(contentType);
      }
    }

    setDialogSetIndex(i);
  }, [dialogSetIndex, contents, contentTypes]);

  useEffect(() => {
    if (actionState.status === 200) {
      async function resetActiveContent() {
        invalidateContent();
        setContentsLoaded(false);
        setContents([]);
        setDialogSetIndex(-1);
      }
      resetActiveContent();
    }
  }, [actionState.status, invalidateContent]);

  useEffect(() => {
    if (contentsLoaded) return;

    console.log('contents loaded:', contentsLoaded);

    async function loadContents() {
      const res: Content[] = await fetchContent('', true);
      console.log('reload contents', res);
      setContents(res);
      setContentsLoaded(true);
    }
    loadContents();
  }, [contentsLoaded, fetchContent]);

  return (
    <>
      <Dialog
        className="relative z-50 outline-none"
        open={dialogSetIndex >= 0}
        onClose={() => setDialogIndex(-1)}
      >
        <DialogBackdrop transition className="fixed inset-0 bg-(--line-color)/80 transition duration-150 ease-in-out data-closed:opacity-0" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className={clsx(
              'md:min-w-xl lg:min-w-3xl rounded-lg border-8 border-(--accent-color) bg-(--site-color) pb-8',
              'max-h-3/4 overflow-y-auto',
              'transition duration-150 ease-in-out data-closed:opacity-0'
            )}
          >
            <StandardWrapper>
              {dialogSetIndex < 0 && (
                <h1>No content selected...</h1>
              )}

              {dialogSetIndex >= 0 && (
                <>
                  <StandardWrapper>
                    <span className="text-3xl font-bold">Editing content with id={content.id as string}...</span>
                  </StandardWrapper>

                  <Form action={formAction}>

                    <input
                      type="hidden"
                      name="id"
                      value={content.id as string}
                    />

                    <Input
                      name="page_path"
                      preLabel="Page:"
                      placeholder="Enter a page path..."
                      error={actionState.errors.page_path}
                      value={content['page_path'] as string}
                      setValue={value => setContent('page_path', value)}
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
                      value={content['index'] as string}
                      setValue={value => setContent('index', value)}
                    />

                    {activeContentType.reqs && (activeContentType.reqs as string).split(',').map(
                      (req: string) => getUserInput(
                        req,
                        (content[req] as string) ?? '',
                        value => setContent(req, value),
                        actionState.errors[req]
                      )
                    )}

                    <div className="flex flex-row py-5 px-8 md:px-12 lg:px-20 gap-2">
                      <SecondaryButton type="reset" text="Cancel" />
                      <PrimaryButton type="submit" text="Submit" />
                    </div>

                  </Form>
                </>
              )}
            </StandardWrapper>
          </DialogPanel>
        </div>
        
      </Dialog>

      <Breadcrumb crumbs={PAGE_BREADCRUMBS} />

      <Title
        title="Your contents"
        subtitle=""
      />

      <section className="py-2 md:py-3 lg:py-4 px-7 md:px-12 lg:px-20 gap-2">
        <PrimaryButton text="Create new" />
      </section>

      <section
        className={clsx(
          'py-8 md:py-10 lg:py-12 px-7 md:px-12 lg:px-20 gap-2'
        )}
      >
        <div
          className={clsx(
            'rounded-md pt-4 pb-2',
            'bg-(--boss-color) deboss-edges'
          )}
        >
          <div className="w-full table table-auto max-h-1/2 border-collapse text-sm">
            <div className="table-header-group">
              <div className="table-row">
                <div className="table-cell font-bold text-left border-b-[1.5px] border-b-(--line-color) p-4 pl-8">ID</div>
                <div className="table-cell font-bold text-left border-b-[1.5px] border-b-(--line-color) p-4">Path</div>
                <div className="table-cell font-bold text-left border-b-[1.5px] border-b-(--line-color) p-4">Type</div>
                <div className="table-cell font-bold text-left border-b-[1.5px] border-b-(--line-color) p-4">Seq.</div>
                <div className="table-cell font-bold text-left border-b-[1.5px] border-b-(--line-color) p-4">Header</div>
                <div className="table-cell font-bold text-left border-b-[1.5px] border-b-(--line-color) p-4 pr-8">Delete</div>
              </div>
            </div>
            <div className="table-row-group">
              {contents
                .sort((a: Content, b: Content) => {
                  if (a.page_path !== b.page_path) {
                    if (a.page_path.length !== b.page_path.length) {
                      return a.page_path.length < b.page_path.length ? -1 : 1;
                    }

                    const localecmp = a.page_path.localeCompare(b.page_path);
                    if (localecmp !== 0) {
                      return localecmp < 0 ? -1 : 1;
                    }
                  }

                  if (a.index !== b.index) {
                    return a.index < b.index ? -1 : 1;
                  }

                  return a.id < b.id ? -1 : 1;
                })
                .map((content: Content, i: number) => (
                  <div key={content.id} 
                    onClick={() => setDialogIndex(i)}
                    className="table-row hover:bg-(--accent-color)/40 hover:emboss-edges"
                  >
                    <div className="table-cell align-middle p-4 pl-8">{content.id}</div>
                    <div className="table-cell align-middle p-4">{content.page_path}</div>
                    <div className="table-cell align-middle p-4">{content.type}</div>
                    <div className="table-cell align-middle p-4">{content.index}</div>
                    <div className="table-cell align-middle p-4">{content.header}</div>
                    <div className="table-cell align-middle p-4 pr-8">
                      <XCircleIcon
                        className="size-6 font-normal hover:font-black text-red-600 dark:text-red-400 opacity-50 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('DELETE CLICKED!', content);
                        }}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
