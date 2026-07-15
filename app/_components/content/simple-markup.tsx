import clsx from 'clsx';

export default function SimpleMarkup(text: string, className?: string): React.ReactNode {
  const RE_MARKUP_FORMAT = /\|(.*?)\|/;
  const components: React.ReactNode[] = [];

  let k = 0;
  let remaining = text;
  let danglingTag = '';
  let extras = '';

  while (true) {
    const match = RE_MARKUP_FORMAT.exec(remaining);

    // No matches left, means:
    // - Bad markup ending with a dangling tag --> error
    // - No more tags remaining, the rest is plain text --> return
    if (!match) {
      if (danglingTag !== '') {
        return <span className={className}>{text}</span>;
      }

      components.push(
        <div key={k} className="inline">{remaining}</div>
      )
      break;
    }

    const tag = match[1];
    const index = remaining.search(RE_MARKUP_FORMAT);
    const tagLength = match[0].length;

    // Yes dangling tag, means:
    // - Current tag does not match the dangling tag --> error
    // - Current and dangling tags match --> process the tag on the relevant text
    if (danglingTag !== '') {
      if (tag !== `/${danglingTag}`) {
        return <span className={className}>{text}</span>;
      }

      const formatText = remaining.slice(0, index);
      components.push(processTag(danglingTag, formatText, k, extras));
      k++;
      danglingTag = '';
      extras = '';

      remaining = remaining.slice(index + tagLength);

      if (remaining.length <= 0) {
        break;
      }
      continue;
    }

    // No dangling tag, means:
    // - Current tag starts with a / --> error
    // - Current tag does not start with a / --> push all text before as plaintext and save tag
    else {
      if (tag.startsWith('/')) {
        return <span className={className}>{text}</span>;
      }

      components.push(
        <div key={k} className="inline">{remaining.slice(0, index)}</div>
      );
      k++;
      const parts = tag.split(':');
      danglingTag = parts[0];
      if (parts.length > 1) {
        extras = parts[1];
      }
      remaining = remaining.slice(index + tagLength);
    }
  }

  // return components;
  return <div className={className}>
    {components}
  </div>;
}

function processTag(tag: string, text: string, index: number, extras: string): React.ReactNode {
  switch (tag) {
    case 'b': {
      return <b key={index} className="inline px-1">
        {text}
      </b>;
    }
    case 'i': {
      return <div key={index} className="inline italic">{text}</div>;
    }
    case 'h': {
      return <div
        key={index}
        className={clsx(
          'relative inline-block px-1',
          'before:absolute before:-inset-1 before:block before:bg-(--highlight-color)/50',
          'before:my-0.5 before:mx-0.5 before:rounded-xs'
        )}
      >
        <span className="relative font-medium">
          {text}
        </span>
      </div>;
    }
    case 'pill': {
      return <div key={index} className={clsx(
        'inline-block px-2 py-0.5 mr-2 rounded-2xl text-sm text-black dark:text-white border',
        COLOR_CLASSES[extras] ?? COLOR_CLASSES.gray
      )}>{text}</div>;
    }
    case 'br': {
      return <div key={index} className="py-2"></div>;
    }
    default: {
      return <div key={index} className="inline px-1">{text}</div>;
    }
  }
}

const COLOR_CLASSES: Record<string, string> = {
  /* DEFAULT */
  gray: 'border-slate-700/50 bg-slate-300 dark:border-slate-300/50 dark:bg-slate-700',

  /* USE THESE COLORS PRIMARILY */
  red: 'border-red-700/50 bg-red-300 dark:border-red-300/50 dark:bg-red-700',
  orange: 'border-orange-700/50 bg-orange-300 dark:border-orange-300/50 dark:bg-orange-700',
  yellow: 'border-yellow-700/50 bg-yellow-300 dark:border-yellow-300/50 dark:bg-yellow-700',
  green: 'border-green-700/50 bg-green-300 dark:border-green-300/50 dark:bg-green-700',
  blue: 'border-blue-700/50 bg-blue-300 dark:border-blue-300/50 dark:bg-blue-700',
  violet: 'border-violet-700/50 bg-violet-300 dark:border-violet-300/50 dark:bg-violet-700'
};
