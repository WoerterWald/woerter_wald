'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import { BiShuffle } from 'react-icons/bi';
import classNames from 'classnames';
import { handleShuffle } from '@/utils/handleShuffle';
import { showConfetti } from '@/utils/showConfetti';
import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { LetterGrid } from '../LetterGrid/LetterGrid';
import { Level } from '../Level/Level';
import styles from './game.module.scss';

type Word = {
  word: string;
};

export type LevelT = {
  level: number;
  levelName: string;
  nextLevelScore: number | null;
};

type Game = {
  letters: string[];
  levels: LevelT[];
  totalScore: number;
  matchedWords: Word[];
  panagrams: Word[];
};

type GameProps = {
  game: Game;
};

export const Game = ({ game }: GameProps) => {
  const { letters, levels, matchedWords, panagrams } = game;
  const [gameLetters, setGameLetters] = useState(letters);
  const [wordInput, setWordInput] = useState('');

  // TODO: Derive state from cookie
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isAnimation, setIsAnimation] = useState(false);
  // TODO: Derive score from cookie. Create function that calculates score based on words stored in cookie
  const [curScore, setCurScore] = useState(0);

  const triggerAnimation = () => {
    setIsAnimation(true);
    showConfetti();
  };

  const submitWord = () => {
    const match = matchedWords.find(
      (match) => wordInput.toLowerCase() === match.word.toLowerCase()
    );

    if (wordInput.length < 4) {
      toast.error('Wort zu kurz', { icon: '🦊' });
    } else if (!wordInput.includes(gameLetters[0])) {
      toast.error('Hauptbuchstabe fehlt', { icon: '🐛' });
    } else if (!match) {
      toast.error('Nicht in der Liste :(', { icon: '🍂' });
    } else if (match) {
      const alreadyFound = foundWords.find(
        (word) => match.word.toLowerCase() === word.toLowerCase()
      );
      if (alreadyFound) {
        toast.error('Bereits gefunden', { icon: '🦉' });
      } else {
        triggerAnimation();
        const panagram = panagrams.find(
          (obj) => obj.word.toLowerCase() === wordInput.toLowerCase()
        );

        if (wordInput.length === 4) {
          setCurScore((prev) => prev + 1);
          toast.success('+1', { icon: '🐸' });
        } else if (panagram) {
          setCurScore((prev) => prev + wordInput.length + 7);
          toast.success(`+${wordInput.length + 7}`, { icon: '🐸' });
        } else {
          setCurScore((prev) => prev + wordInput.length);
          toast.success(`+${wordInput.length}`, { icon: '🐸' });
        }

        setFoundWords((prev) => [...prev, match.word]);
      }
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
        <Level curScore={curScore} levels={levels} />
        <Dropdown foundWords={foundWords} />
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
      <div className={classNames(styles.bgTop, isAnimation ? styles.topAnimation : '')} />
      <div className={classNames(styles.bgCenter, isAnimation ? styles.centerAnimation : '')} />
      <div
        className={classNames(styles.bgMain, isAnimation ? styles.mainAnimation : '')}
        onAnimationEnd={() => setIsAnimation(false)}
      />
    </>
  );
};
