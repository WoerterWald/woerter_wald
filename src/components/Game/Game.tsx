'use client';

import { useState } from 'react';
import { BiShuffle } from 'react-icons/bi';
import { handleShuffle } from '@/utils/handleShuffle';
import { LetterGrid } from '../LetterGrid/LetterGrid';
import styles from './game.module.scss';

type GameProps = {
  letters: string[];
};

export const Game = ({ letters }: GameProps) => {
  const [gameLetters, setGameLetters] = useState(letters);
  const [wordInput, setWordInput] = useState('');

  const resetWordInput = () => setWordInput(wordInput.slice(0, -1));

  const shuffleLetters = () => {
    const shuffled = handleShuffle(gameLetters);
    setGameLetters(shuffled);
  };

  return (
    <div>
      <p className={styles.currentInput}>{wordInput}</p>
      <LetterGrid gameLetters={gameLetters} setWordInput={setWordInput} />

      <div className={styles.btnsContainer}>
        <button className={styles.btnBig}>Eingabe</button>
        <button className={styles.btnSmall} onClick={shuffleLetters}>
          <BiShuffle className={styles.shuffleIcon} />
        </button>
        <button className={styles.btnBig} onClick={resetWordInput}>
          Löschen
        </button>
      </div>
    </div>
  );
};
