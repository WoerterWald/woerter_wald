'use client';

import { Dispatch, SetStateAction } from 'react';
import styles from './letterGrid.module.scss';

const classNames = require('classnames');

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
