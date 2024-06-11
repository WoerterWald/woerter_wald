import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';

type ButtonProps = {
  size: 'small' | 'large';
  onClick: () => void;
  children: ReactNode;
};

export const Button = ({ size, onClick, children }: ButtonProps) => {
  return (
    <button
      className={classNames(styles.btn, size === 'large' ? styles.btnLarge : styles.btnSmall)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
