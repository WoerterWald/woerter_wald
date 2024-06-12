import { MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './letterBtn.module.scss';

type LetterBtnProps = {
  variant: string;
  letter: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
};

export const LetterBtn = ({ variant, letter, onClick }: LetterBtnProps) => {
  return (
    <div className={styles.flex}>
      <button
        className={classNames(
          styles.flex,
          styles.letter,
          variant === 'primary' && styles.primaryBtn
        )}
        value={letter}
        onClick={onClick}
      >
        {letter}
      </button>
    </div>
  );
};
