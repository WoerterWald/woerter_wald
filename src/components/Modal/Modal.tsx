import { useRef } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { IoClose } from 'react-icons/io5';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styles from './modal.module.scss';

type ModalProps = {
  handleCloseModal: () => void;
  /*   setGameRules: Dispatch<SetStateAction<boolean>>; */
  children: React.ReactNode;
};

export const Modal = ({ handleCloseModal, /* setGameRules, */ children }: ModalProps) => {
  /* const xRef = useRef(null);

  useOutsideClick(xRef, setGameRules); */

  return (
    <div /* ref={xRef}  */ className={styles.overlay}>
      <div className={styles.modalWrapper}>
        <IoClose className={styles.closeBtn} onClick={handleCloseModal} />

        <div className={styles.modal}>{children}</div>
      </div>
    </div>
  );
};
