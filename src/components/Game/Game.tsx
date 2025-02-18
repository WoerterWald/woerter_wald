'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiShuffle } from 'react-icons/bi';
import classNames from 'classnames';
import Image from 'next/image';
import { calcScore } from '@/utils/calcScore';
import { handleShuffle } from '@/utils/handleShuffle';
import { useFindWords } from '@/hooks/useFindWords';
import { useShowConfetti } from '@/hooks/useShowConfetti';
import { Button } from '../Button/Button';
import { showErrorToast, showSuccessToast } from '../CustomToasts/CustomToasts';
import { Dropdown } from '../Dropdown/Dropdown';
import { LetterGrid } from '../LetterGrid/LetterGrid';
import { Level } from '../Level/Level';
import { Modals } from '../Modals/Modals';
import styles from './game.module.scss';

export type Word = {
  word: string;
};

export type LevelT = {
  level: number;
  levelName: string;
  nextLevelScore: number | null;
};

export type Game = {
  _id: string;
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
  const showConfetti = useShowConfetti();
  const [isAnimation, setIsAnimation] = useState(false);

  const { foundWords, setFoundWords, curScore } = useFindWords(game._id, panagrams);

  const triggerAnimation = () => {
    setIsAnimation(true);
    showConfetti();
  };

  const submitWord = () => {
    const match = matchedWords.find(
      (match) => wordInput.toLowerCase() === match.word.toLowerCase()
    );

    if (wordInput.length < 4) {
      showErrorToast('Wort zu kurz');
    } else if (!wordInput.includes(gameLetters[0])) {
      showErrorToast('Hauptbuchstabe fehlt');
    } else if (!match) {
      showErrorToast('Nicht in der Liste');
    } else if (match) {
      const isAlreadyFound = foundWords.some(
        (word) => match.word.toLowerCase() === word.toLowerCase()
      );
      if (isAlreadyFound) {
        toast.error('Bereits gefunden', { icon: '🦉' });
      } else {
        triggerAnimation();
        const scoreToAdd = calcScore(wordInput, panagrams);
        showSuccessToast(scoreToAdd);
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
    <main>
      <BgLayers isAnimation={isAnimation} setIsAnimation={setIsAnimation} />
      <div className={styles.game}>
        <Level curScore={curScore} levels={levels} />
        <Dropdown foundWords={foundWords} panagrams={panagrams} />
        <input
          className={styles.currentInput}
          value={wordInput}
          readOnly
          aria-label="Aktuelle Eingabe"
        />
        <LetterGrid gameLetters={gameLetters} setWordInput={setWordInput} />

        <div className={styles.btnsContainer}>
          <Button size="large" onClick={submitWord}>
            Eingabe
          </Button>
          <Button size="small" onClick={shuffleLetters} ariaLabel="Buchstaben neu mischen">
            <BiShuffle />
          </Button>
          <Button size="large" onClick={resetWordInput}>
            Löschen
          </Button>
        </div>
      </div>
      <Modals game={game} panagrams={panagrams} />
    </main>
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
        src="/assets/bg_layer_top.webp"
        alt="Baumkronen am oberen Bildschirmrand"
        fill
        priority
        placeholder="blur"
        blurDataURL="/assets/bg_layer_top_lowres.webp"
        className={classNames(styles.bgTop, isAnimation ? styles.topAnimation : '')}
      />
      <Image
        src="/assets/bg_layer_center.webp"
        alt="Wald Vordergrund"
        fill
        className={classNames(styles.bgCenter, isAnimation ? styles.centerAnimation : '')}
      />
      <Image
        src="/assets/bg_layer_background.webp"
        alt="Wald Hintergrund"
        fill
        className={classNames(styles.bgMain, isAnimation ? styles.mainAnimation : '')}
        onAnimationEnd={() => setIsAnimation(false)}
      />
    </>
  );
};
