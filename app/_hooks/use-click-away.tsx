import { useEffect, useRef } from "react";

export default function useClickAway(
  ignoreRefs: React.RefObject<Element | null>[],
  onAway: () => void
): React.RefObject<HTMLElement | null> {
  const currentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const clickedInsideAnIgnoreRef = ignoreRefs.some(r => r.current?.contains(e.target as Node));

      if (currentRef.current && !currentRef.current.contains(e.target as Node) && !clickedInsideAnIgnoreRef) {
        onAway();
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ignoreRefs, onAway]);

  return currentRef;
}