'use client';

import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import styles from './hamburger.module.scss';

export const Hamburger = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <div className={styles.burgerWrapper}>
        <FaBars onClick={toggleModal} className={styles.burgerIcon} />
      </div>

      {!showModal && (
        <div className={styles.overlay} onClick={toggleModal}>
          <div className={styles.modal}>
            <IoMdClose className={styles.closeBtn} onClick={toggleModal} />
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
