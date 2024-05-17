'use client';

import { useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import useOutsideClick from '../../hooks/useOutsideClick';
import styles from './hamburger.module.scss';

export const Hamburger = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => setShowModal(!showModal);

  const handleCloseModal = () => {
    toggleModal();
  };

  useOutsideClick(modalRef, handleCloseModal);

  return (
    <>
      <div className={styles.burgerWrapper}>
        <FaBars onClick={toggleModal} className={styles.burgerIcon} />
      </div>

      {showModal && (
        <div className={styles.overlay}>
          <div className={styles.modal} ref={modalRef}>
            <IoClose className={styles.closeBtn} onClick={toggleModal} />
            <ul>
              <li>Regeln</li>
              <li>Ergebnis teilen</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
