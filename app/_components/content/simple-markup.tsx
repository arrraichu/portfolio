import clsx from 'clsx';

export default function SimpleMarkup(text: string, className?: string): React.ReactNode {
  const RE_MARKUP_FORMAT = /\|(.*?)\|/;
  const components: React.ReactNode[] = [];

  let k = 0;
  let remaining = text;
  let danglingTag = '';

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
      components.push(processTag(danglingTag, formatText, k));
      k++;
      danglingTag = '';

      remaining = remaining.slice(index + tagLength);

      if (remaining.length <= 0) {
        return components;
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
      danglingTag = tag;
      remaining = remaining.slice(index + tagLength);
    }
  }

  // return components;
  return <div className={className}>
    {components}
  </div>;
}

function processTag(tag: string, text: string, index: number): React.ReactNode {
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
    default: {
      return <div key={index} className="inline px-1">{text}</div>;
    }
  }
}