'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BiShuffle } from 'react-icons/bi';
import { handleShuffle } from '@/utils/handleShuffle';
import { GameT } from '@/models/Game';
import { Button } from '../Button/Button';
import { LetterGrid } from '../LetterGrid/LetterGrid';
import styles from './game.module.scss';

type GameProps = {
  game: GameT;
};

export const Game = ({ game }: GameProps) => {
  const { letters, matchedWords } = game;
  const [gameLetters, setGameLetters] = useState(letters);
  const [wordInput, setWordInput] = useState('');

  const submitWord = () => {
    if (wordInput.length < 4) {
      toast.error('Word too short!', { icon: '🦊' });
    } else if (!wordInput.includes(gameLetters[0])) {
      toast.error('Main letter missing!', { icon: '🐛' });
    }
    // add toast for success && 'nicht in der liste"

    setWordInput('');
  };

  const shuffleLetters = () => {
    const shuffled = handleShuffle(gameLetters);
    setGameLetters(shuffled);
  };

  const resetWordInput = () => setWordInput(wordInput.slice(0, -1));

  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: { marginTop: '3rem', background: '#F4F4F4', border: '1px solid #333333' },
        }}
      />
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
