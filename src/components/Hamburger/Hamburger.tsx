'use client';

import { useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styles from './hamburger.module.scss';

export const Hamburger = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => setShowModal(!showModal);

  useOutsideClick(modalRef, setShowModal);

  return (
    <div ref={modalRef} className={styles.burgerWrapper}>
      <FaBars onClick={toggleModal} className={styles.burgerIcon} />

      {showModal && (
        <div className={styles.modal}>
          <IoClose className={styles.closeBtn} onClick={toggleModal} />
          <ul>
            <li>Regeln</li>
            <li>Ergebnis teilen</li>
          </ul>
        </div>
      )}
    </div>
  );
};
