'use client';

import { Dispatch, SetStateAction } from 'react';
import { Toaster } from 'react-hot-toast';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import leaf_BC from '@/assets/leaf_BC.webp';
import leaf_BLR from '@/assets/leaf_BLR.webp';
import leaf_C from '@/assets/leaf_C.webp';
import leaf_TC from '@/assets/leaf_TC.webp';
import leaf_TLR from '@/assets/leaf_TLR.webp';
import { LetterBtn } from '../LetterBtn/LetterBtn';
import styles from './letterGrid.module.scss';

const leaves = [leaf_C, leaf_TC, leaf_TLR, leaf_TLR, leaf_BLR, leaf_BLR, leaf_BC];

type LetterGridProps = {
  gameLetters: string[];
  setWordInput: Dispatch<SetStateAction<string>>;
};

export const LetterGrid = ({ gameLetters, setWordInput }: LetterGridProps) => {
  const isDesktop = useIsDesktop();

  const handleUserInput = (e: any) => {
    setWordInput((prev) => prev + e.target.value);
  };

  return (
    <div className={styles.gridWrapper}>
      <Toaster
        containerStyle={{
          position: 'absolute',
          left: !isDesktop ? '-1rem' : '0',
          right: isDesktop ? '-8rem' : '0',
          top: '-4rem',
        }}
        position={!isDesktop ? 'top-left' : 'top-right'}
        toastOptions={{
          className: styles.toastBase,
        }}
      />
      <div className={styles.gridContainer}>
        {gameLetters.map((letter, i) => {
          const isPrimary = i === 0;
          return (
            <LetterBtn
              variant={isPrimary ? 'primary' : 'secondary'}
              key={letter}
              letter={letter}
              onClick={handleUserInput}
              leaf={leaves[i]}
            />
          );
        })}
      </div>
    </div>
  );
};
