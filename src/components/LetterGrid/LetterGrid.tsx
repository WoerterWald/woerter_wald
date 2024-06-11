'use client';

import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import styles from './letterGrid.module.scss';

type LetterGridProps = {
  gameLetters: string[];
  setWordInput: Dispatch<SetStateAction<string>>;
};

export const LetterGrid = ({ gameLetters, setWordInput }: LetterGridProps) => {
  const handleUserInput = (e: any) => {
    setWordInput((prev) => prev + e.target.value);
  };

  return (
    <div className={styles.gridContainer}>
      {gameLetters.map((letter) => (
        <div className={styles.flex} key={letter}>
          <button
            className={classNames(styles.letter, styles.flex)}
            value={letter}
            onClick={handleUserInput}
          >
            {letter}
          </button>
        </div>
      ))}
    </div>
  );
};
