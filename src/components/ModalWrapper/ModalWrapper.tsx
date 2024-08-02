'use client';

import { useRef } from 'react';
import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { modalAtom } from '@/atoms/atoms';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styles from './modalWrapper.module.scss';

type ModalProps = {
  isSmall?: boolean;
  children: ReactNode;
};

export const Modal = ({ isSmall = false, children }: ModalProps) => {
  const [, setModalType] = useAtom(modalAtom);
  const ref = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    setModalType('');
  };

  useOutsideClick(ref, handleCloseModal);

  return (
    <div className={styles.modalWrapper}>
      <div ref={ref} className={classNames(styles.modal, isSmall ? styles.small : '')}>
        <IoClose className={styles.closeBtn} onClick={handleCloseModal} />
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};
