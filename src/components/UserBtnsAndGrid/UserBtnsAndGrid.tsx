'use client';

import { useState } from 'react';
import { BiShuffle } from 'react-icons/bi';
import { LetterGrid } from '../LetterGrid/LetterGrid';
import styles from './userBtnsAndGrid.module.scss';

type UserBtnsAndGridProps = {
  letters: string[];
};

export const UserBtnsAndGrid = ({ letters }: UserBtnsAndGridProps) => {
  const [gameLetters, setGameLetters] = useState(letters);
  const [wordInput, setWordInput] = useState('');

  const resetWordInput = () => setWordInput(wordInput.slice(0, -1));

  /* Durstenfeld shuffle algorithm (optimized version of Fisher-Yates) */
  const handleShuffle = (arr: string[]) => {
    const shuffleArr = arr.slice(1);
    for (let i = shuffleArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]];
    }
    setGameLetters(arr.slice(0, 1).concat(shuffleArr));
  };

  console.log(wordInput);

  return (
    <div>
      <p className={styles.currentInput}>{wordInput}</p>
      <LetterGrid gameLetters={gameLetters} setWordInput={setWordInput} />

      <div className={styles.btnsContainer}>
        <button className={styles.btnBig}>Eingabe</button>
        <button className={styles.btnSmall} onClick={() => handleShuffle(letters)}>
          <BiShuffle className={styles.shuffleIcon} />
        </button>
        <button className={styles.btnBig} onClick={resetWordInput}>
          Löschen
        </button>
      </div>
    </div>
  );
};
