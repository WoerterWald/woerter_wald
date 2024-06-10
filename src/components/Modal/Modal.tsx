'use client';

import { useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styles from './modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => router.back();

  useOutsideClick(ref, handleCloseModal);

  return (
    <div className={styles.modalWrapper}>
      <div ref={ref} className={styles.modal}>
        <IoClose className={styles.closeBtn} onClick={handleCloseModal} />
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};
