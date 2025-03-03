'use client';

import { useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useAtom } from 'jotai';
import { modalAtom } from '@/atoms/atoms';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styles from './hamburger.module.scss';

export const Hamburger = () => {
  const [, setModalType] = useAtom(modalAtom);
  const [showNavigation, setShowNavigation] = useState(false);
  const modalRef = useRef(null);

  const open = () => setShowNavigation(true);
  const close = () => {
    setShowNavigation(false);
  };

  useOutsideClick(modalRef, close);

  return (
    <div ref={modalRef} className={styles.burgerWrapper}>
      <FaBars onClick={open} className={styles.burgerIcon} />

      {showNavigation && (
        <div className={styles.modal}>
          <IoClose className={styles.closeBtn} onClick={close} />
          <ul>
            <li>
              <button
                onClick={() => {
                  close();
                  setModalType('rules');
                }}
              >
                Regeln
              </button>
            </li>
            <li>Ergebnis teilen</li>
          </ul>
        </div>
      )}
    </div>
  );
};
