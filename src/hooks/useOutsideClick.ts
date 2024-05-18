import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref?.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [ref, setOpen]);
};
