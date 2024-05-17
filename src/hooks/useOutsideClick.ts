import { useEffect } from 'react';

export default function useOutsideClick(ref: any, callback: Function) {
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchend', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchend', handleOutsideClick);
    };
  }, [ref, callback]);

  return ref;
}
