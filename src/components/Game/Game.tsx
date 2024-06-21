'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import { BiShuffle } from 'react-icons/bi';
import classNames from 'classnames';
import Image from 'next/image';
import { handleShuffle } from '@/utils/handleShuffle';
import bgTop from '@/assets/bg_layer_top.webp';
import { Button } from '../Button/Button';
import { LetterGrid } from '../LetterGrid/LetterGrid';
import styles from './game.module.scss';

type Word = {
  word: string;
};

type Game = {
  letters: string[];
  levelScores: number[];
  totalScore: number;
  matchedWords: Word[];
  panagrams: Word[];
};

type GameProps = {
  game: Game;
};

export const Game = ({ game }: GameProps) => {
  const { letters, matchedWords } = game;
  const [gameLetters, setGameLetters] = useState(letters);
  const [wordInput, setWordInput] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isAnimation, setIsAnimation] = useState(false);

  const submitWord = () => {
    const match = matchedWords.find(
      (match) => wordInput.toLowerCase() === match.word.toLowerCase()
    );

    if (wordInput.length < 4) {
      toast.error('Word too short!', { icon: '🦊' });
    } else if (!wordInput.includes(gameLetters[0])) {
      toast.error('Main letter missing!', { icon: '🐛' });
    } else if (!match) {
      toast.error('Not in the list :(', { icon: '🍂' });
    } else {
      toast.success('You found a word!', { icon: '🐸' });
      setIsAnimation(true);
      setFoundWords((prev) => [...prev, wordInput]);
    }

    setWordInput('');
  };

  const shuffleLetters = () => {
    const shuffled = handleShuffle(gameLetters);
    setGameLetters(shuffled);
  };

  const resetWordInput = () => setWordInput(wordInput.slice(0, -1));

  return (
    <>
      <BgLayers isAnimation={isAnimation} setIsAnimation={setIsAnimation} />
      <div className={styles.game}>
        <input className={styles.currentInput} value={wordInput} readOnly />
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
    </>
  );
};

type BgLayersProps = {
  isAnimation: boolean;
  setIsAnimation: Dispatch<SetStateAction<boolean>>;
};

const BgLayers = ({ isAnimation, setIsAnimation }: BgLayersProps) => {
  return (
    <>
      <Image
        src={bgTop}
        alt="bgTop"
        className={classNames(styles.bgTop, isAnimation ? styles.topAnimation : '')}
        fill
      />
      <div className={classNames(styles.bgCenter, isAnimation ? styles.centerAnimation : '')} />
      <div
        className={classNames(styles.bgMain, isAnimation ? styles.mainAnimation : '')}
        onAnimationEnd={() => setIsAnimation(false)}
      />
    </>
  );
};
