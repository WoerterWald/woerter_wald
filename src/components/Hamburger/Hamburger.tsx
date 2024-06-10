'use client';

import { useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styles from './hamburger.module.scss';

export const Hamburger = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const open = () => setShowModal(true);
  const close = () => setShowModal(false);

  useOutsideClick(modalRef, close);

  return (
    <div ref={modalRef} className={styles.burgerWrapper}>
      <FaBars onClick={open} className={styles.burgerIcon} />

      {showModal && (
        <div className={styles.modal}>
          <IoClose className={styles.closeBtn} onClick={close} />
          <ul>
            <li>
              <Link href="/rules" onClick={close}>
                Regeln
              </Link>
            </li>
            <li>Ergebnis teilen</li>
          </ul>
        </div>
      )}
    </div>
  );
};
