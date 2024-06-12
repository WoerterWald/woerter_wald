'use client';

import { Dispatch, SetStateAction } from 'react';
import { Toaster } from 'react-hot-toast';
import { LetterBtn } from '../LetterBtn/LetterBtn';
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
    <div className={styles.gridWrapper}>
      <Toaster
        containerStyle={{ position: 'absolute', left: '100%', top: '0' }}
        toastOptions={{
          className: styles.toastBase,
        }}
      />
      <div className={styles.gridContainer}>
        {gameLetters.map((letter) =>
          letter === gameLetters[0] ? (
            <LetterBtn variant="primary" key={letter} letter={letter} onClick={handleUserInput} />
          ) : (
            <LetterBtn variant="secondary" key={letter} letter={letter} onClick={handleUserInput} />
          )
        )}
      </div>
    </div>
  );
};
