'use client';

import clsx from 'clsx';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Form from 'next/form';
import Link from 'next/link';
import { useActionState, useCallback, useEffect, useState, Dispatch } from 'react';

import { XCircleIcon } from '@heroicons/react/24/solid';

import { updateContent } from '@/app/_forms/content';
import { useThemes } from '@/app/_hooks/theme-provider';
import {
  API_PATH_CONTENT,
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

enum CMSPageDialogState {
  INACTIVE = 0,
  EDIT = 1,
  DELETE = 2
};

const PAGE_BREADCRUMBS = [
  { name: 'Home', location: '/' },
  { name: 'Private', location: '/private' },
  { name: 'Content Management', location: '/private/cms' }
];

export default function CMSPage() {
  const { contentTypes, loadContents: fetchContent, invalidateContent } = useThemes();
  const [actionState, formAction] = useActionState(updateContent, INITIAL_CONTENT_STATE);

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [lastFormUpdate, setLastFormUpdate] = useState<string>('');

  const [contents, setContents] = useState<Content[]>([]);

  const [activeContentId, setActiveContentId] = useState<number>(-1);
  const [activeContent, setActiveContent] = useState<{[k: string]: unknown}>({});
  const clearActiveContent = () => {
    setActiveContentId(-1);
    setActiveContent({});
  };
  const editActiveContent = useCallback((key: string, value: unknown) => {
    const newContent = { ...activeContent };
    newContent[key] = value;
    setActiveContent(newContent);
  }, [activeContent, setActiveContent]);

  const [dialogState, privateSetDialogState] = useState<CMSPageDialogState>(CMSPageDialogState.INACTIVE);
  const closeDialog = () => {
    privateSetDialogState(CMSPageDialogState.INACTIVE);
    setActiveContentId(-1);
    setActiveContent({});
  };
  const setDialogEditState = useCallback((contentId: number) => {
    if (contentId < 0 || contentId >= contents.length) {
      return;
    }

    setActiveContent({ ...contents[contentId] });
    setActiveContentId(contentId);
    privateSetDialogState(CMSPageDialogState.EDIT);
  }, [contents]);
  const setDialogDeleteState = useCallback((contentId: number) => {
    if (contentId < 0 || contentId >= contents.length) {
      return;
    }

    setActiveContent({ ...contents[contentId] });
    setActiveContentId(contentId);
    privateSetDialogState(CMSPageDialogState.DELETE);
  }, [contents]);
  const commitDelete = useCallback(
    async () => {
      const { id } = activeContent;

      const res = await fetch(
        `${API_PATH_CONTENT}/${id}`,
        {
          method: 'DELETE'
        }
      );
      if (!res.ok) {
        console.error('could not get successful response');
      }
      const response = await res.json();
      if (response?.last_updated && response?.last_updated !== lastFormUpdate) {
        setLastFormUpdate(response.last_updated);
      }

      closeDialog();
    },
    [activeContent, lastFormUpdate]
  );

  const [selectedContentType, privateSetContentType]
    = useState<ContentType | null>(null);
  const clearContentType = () => {
    privateSetContentType(null);
  };
  const setContentType = useCallback((type: ContentType) => {
    if (activeContentId < 0 || activeContentId >= contents.length) {
      setActiveContent({});
      privateSetContentType(type);
      return;
    }
    const newContent: Content = {
      id: contents[activeContentId].id,
      page_path: contents[activeContentId].page_path,
      type: contents[activeContentId].type,
      index: contents[activeContentId].index
    };

    setActiveContent(newContent);
    privateSetContentType(type);
  }, [activeContentId, contents]);
  const activeContentType: ContentType
    = selectedContentType ?? contentTypes[0] ?? PLACEHOLDER_CONTENT_TYPE;
  
  const resetAll = useCallback(async () => {
    invalidateContent();

    clearContentType();
    closeDialog();
    clearActiveContent();

    setContents([]);
  }, [invalidateContent]);

  const loadContents = useCallback(async () => {
    const res: Content[] = await fetchContent({
      invalidate_saved_content: true,
      fetch_all: true
    });

    setContents(res);
    setIsInitialized(true);
  }, [fetchContent]);

  useEffect(() => {
    if (isInitialized) return;

    async function load() {
      await loadContents();
    }
    load();
  }, [isInitialized, loadContents]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    if (actionState.status !== 200) {
      return;
    }
    if (!actionState.last_updated || actionState.last_updated === lastFormUpdate) {
      return;
    }

    async function resetAndReload() {
      setLastFormUpdate(actionState.last_updated as string);

      await resetAll();
      await loadContents();
    }
    resetAndReload();
  }, [actionState, isInitialized, resetAll, loadContents, lastFormUpdate])

  return (
    <>
      <Dialog
        className="relative z-50 outline-none"
        open={dialogState !== CMSPageDialogState.INACTIVE}
        onClose={() => closeDialog()}
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
              {dialogState === CMSPageDialogState.DELETE && (
                <>
                  <StandardWrapper>
                    <span className="text-3xl font-bold">
                      Are you sure you want to delete content with id={ activeContent.id as string } ?
                    </span>
                  </StandardWrapper>

                  <div className="flex flex-row py-2 px-8 md:px-12 lg:px-20 gap-2 md:gap-4 lg:gap-6">
                    <SecondaryButton text="Cancel" onClick={() => closeDialog()} />
                    <PrimaryButton text="Confirm" onClick={() => commitDelete()} />
                  </div>
                </>
              )}

              {dialogState === CMSPageDialogState.EDIT && (
                <>
                  <StandardWrapper>
                    <span className="text-3xl font-bold">Editing content with id={activeContent.id as string}...</span>
                  </StandardWrapper>

                  <Form action={formAction}>

                    <input
                      type="hidden"
                      name="id"
                      value={activeContent.id as string}
                    />

                    <Input
                      name="page_path"
                      preLabel="Page:"
                      placeholder="Enter a page path..."
                      error={actionState.errors.page_path}
                      value={activeContent['page_path'] as string}
                      setValue={value => editActiveContent('page_path', value)}
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
                      value={activeContent['index'] as string}
                      setValue={value => editActiveContent('index', value)}
                    />

                    {activeContentType.reqs && (activeContentType.reqs as string).split(',').map(
                      (req: string) => getUserInput(
                        req,
                        (activeContent[req] as string) ?? '',
                        value => editActiveContent(req, value),
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
        <Link href="/private/cms/new">
          <PrimaryButton text="Create new" />
        </Link>
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
                    onClick={() => setDialogEditState(i)}
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
                        onClick={async (e) => {
                          e.stopPropagation();
                          setDialogDeleteState(i);
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
