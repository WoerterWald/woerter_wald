'use client';

import { useState } from 'react';
import { BiShuffle } from 'react-icons/bi';
import { handleShuffle } from '@/utils/handleShuffle';
import { Button } from '../Button/Button';
import { LetterGrid } from '../LetterGrid/LetterGrid';
import styles from './game.module.scss';

type GameProps = {
  letters: string[];
};

export const Game = ({ letters }: GameProps) => {
  const [gameLetters, setGameLetters] = useState(letters);
  const [wordInput, setWordInput] = useState('');

  const submitWord = () => {
    console.log(wordInput);
    setWordInput('');
  };

  const shuffleLetters = () => {
    const shuffled = handleShuffle(gameLetters);
    setGameLetters(shuffled);
  };

  const resetWordInput = () => setWordInput(wordInput.slice(0, -1));

  return (
    <div>
      <p className={styles.currentInput}>{wordInput}</p>
      <LetterGrid gameLetters={gameLetters} setWordInput={setWordInput} />

      <div className={styles.btnsContainer}>
        <Button size="large" onClick={submitWord}>
          Eingabe
        </Button>
        <Button size="small" onClick={shuffleLetters}>
          <BiShuffle />
        </Button>
        <Button size="large" onClick={resetWordInput}>
          Löschen
        </Button>
      </div>
    </div>
  );
};
