import toast from 'react-hot-toast';
import Image from 'next/image';
import Mushroom from '../../assets/mushroom.webp';
import styles from './customToasts.module.scss';

export const showErrorToast = (message: string, icon?: string) => {
  toast(
    <div className={styles.toastContent}>
      <span>{message}</span>
      {icon}
    </div>,
    {
      className: styles.errorToast,
    }
  );
};

export const showSuccessToast = (score: number) => {
  toast(
    <div className={styles.toastContent}>
      <span>+{score}</span>
      <Image src={Mushroom} alt="Ein roter Pilz" width={20} height={20} />
    </div>,
    {
      className: styles.successToast,
    }
  );
};
