import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';

type ButtonProps = {
  size: 'small' | 'large';
  onClick: () => void;
  children: ReactNode;
  ariaLabel?: string;
};

export const Button = ({ size, onClick, children, ariaLabel }: ButtonProps) => {
  return (
    <button
      className={classNames(styles.btn, size === 'large' ? styles.btnLarge : styles.btnSmall)}
      onClick={onClick}
      aria-label={ariaLabel ? ariaLabel : ''}
    >
      {children}
    </button>
  );
};
