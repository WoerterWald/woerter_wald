import { MouseEvent } from 'react';
import classNames from 'classnames';
import Image, { StaticImageData } from 'next/image';
import styles from './letterBtn.module.scss';

type LetterBtnProps = {
  variant: 'primary' | 'secondary';
  letter: string;
  leaf?: StaticImageData;
  onClick: (event: MouseEvent<HTMLElement>) => void;
};

export const LetterBtn = ({ variant, letter, onClick, leaf }: LetterBtnProps) => {
  return (
    <div className={styles.flex}>
      {leaf && <Image className={styles.leaf} src={leaf} alt="leaf" width={300} height={600} />}
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
