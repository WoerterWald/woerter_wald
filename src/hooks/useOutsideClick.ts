import { RefObject, useEffect } from 'react';

export const useOutsideClick = (ref: RefObject<HTMLElement>, close: () => void) => {
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref?.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [ref, close]);
};
