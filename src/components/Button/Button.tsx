import { ReactNode } from 'react';
import styles from './button.module.scss';

const classNames = require('classnames');

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
