'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiShuffle } from 'react-icons/bi';
import classNames from 'classnames';
import Image from 'next/image';
import { handleShuffle } from '@/utils/handleShuffle';
import bgTop from '@/assets/bg_layer_top.webp';
import { Button } from '../Button/Button';
import { LetterGrid } from '../LetterGrid/LetterGrid';
import { Level } from '../Level/Level';
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

const levelNames = [
  'Ameise',
  'Regenwurm',
  'Laubfrosch',
  'Salamander',
  'Hase',
  'Fuchs',
  'Waldschrat',
  'Bär',
  'Waldfee',
];

export const Game = ({ game }: GameProps) => {
  const { letters, totalScore, /* levelScores, */ matchedWords, panagrams } = game;
  const levelScores = [0, 7, 19, 33, 48, 64, 80, 97, 114, 190];

  const [gameLetters, setGameLetters] = useState(letters);
  const [wordInput, setWordInput] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isAnimation, setIsAnimation] = useState(false);
  const [curScore, setCurScore] = useState(0);
  const levels = levelScores.map((score, i) => ({ level: i + 1, levelName: levelNames[i], score }));
  const [curLevel, setCurLevel] = useState(levels[0]);

  const nextLevel =
    curLevel.level < 8
      ? levels[curLevel.level]
      : { level: 9, levelName: levelNames[-1], score: levelScores[8] };

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
        setIsAnimation(true);
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

        setFoundWords((prev) => [...prev, wordInput]);
      }
    }

    setWordInput('');
  };

  useEffect(() => {
    for (let i = 0; i < levels.length; i++) {
      if (curScore >= levels[i].score && curScore < levels[i + 1].score) {
        setCurLevel(levels[i]);
        break;
      }
    }
  }, [curScore]);

  const shuffleLetters = () => {
    const shuffled = handleShuffle(gameLetters);
    setGameLetters(shuffled);
  };

  const resetWordInput = () => setWordInput(wordInput.slice(0, -1));

  return (
    <>
      <BgLayers isAnimation={isAnimation} setIsAnimation={setIsAnimation} />
      <div className={styles.game}>
        <Level curScore={curScore} curLevel={curLevel} nextLevel={nextLevel} />
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
