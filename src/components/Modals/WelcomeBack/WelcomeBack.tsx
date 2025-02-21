import { useEffect, useState } from 'react';
import Image from 'next/image';
import { findLevels } from '@/utils/findLevelHelper';
import { useCountdown } from '@/hooks/useCountdown';
import { useFindWords } from '@/hooks/useFindWords';
import { Game, Word } from '@/components/Game/Game';
import { Modal } from '@/components/ModalWrapper/ModalWrapper';
import styles from './welcomeBack.module.scss';

type WelcomeBack = {
  game: Game;
  panagrams: Word[];
};

export const WelcomeBack = ({ game, panagrams }: WelcomeBack) => {
  const { foundWords, curScore } = useFindWords(game._id, panagrams);
  const { curLevel } = findLevels(game.levels, curScore);
  const formattedTimeLeft = useCountdown();

  return (
    <Modal isSmall>
      <div className={styles.container}>
        <h2>Willkommen zurück!</h2>
        <p className={styles.summary}>
          Du hast bereits {foundWords.length} {foundWords.length === 1 ? 'Wort' : 'Wörter'} gefunden
          und {curScore}{' '}
          <Image
            src="/assets/mushroom.webp"
            className={styles.mushrrom}
            alt={'Pilz'}
            width={18}
            height={18}
          />{' '}
          gesammelt. Damit hast du{' '}
          <strong>
            Level {curLevel.level}: {curLevel.levelName}
          </strong>{' '}
          erreicht.
        </p>
        <div>
          <p>Wie viele Wörter findest du noch bis zum nächsten Rätsel in:</p>
          <p className={styles.countdown}>{formattedTimeLeft}</p>
        </div>
      </div>
    </Modal>
  );
};
