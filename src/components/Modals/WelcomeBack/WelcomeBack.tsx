import { useEffect, useState } from 'react';
import Image from 'next/image';
import { findLevels } from '@/utils/findLevelHelper';
import { useFindWords } from '@/hooks/useFindWords';
import mushroomIcon from '@/assets/mushroom.webp';
import { Game, Word } from '@/components/Game/Game';
import { Modal } from '@/components/ModalWrapper/ModalWrapper';
import styles from './welcomeBack.module.scss';

type WelcomeBack = {
  game: Game;
  panagrams: Word[];
};

const getSecondsUntilMidnight = () => {
  const now = Date.now();
  const midnight = new Date().setHours(24, 0, 0, 0);

  return Math.max(0, Math.floor((midnight - now) / 1000));
};

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
}

export const WelcomeBack = ({ game, panagrams }: WelcomeBack) => {
  const { foundWords, curScore } = useFindWords(game._id, panagrams);
  const [timeLeft, setTimeLeft] = useState(getSecondsUntilMidnight());
  const { curLevel } = findLevels(game.levels, curScore);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getSecondsUntilMidnight());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Modal isSmall>
      <div className={styles.container}>
        <h2>Willkommen zurück!</h2>
        <p className={styles.summary}>
          Du hast bereits {foundWords.length} {foundWords.length === 1 ? 'Wort' : 'Wörter'} gefunden
          und {curScore}{' '}
          <Image
            src={mushroomIcon}
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
          <p className={styles.countdown}>{formatTime(timeLeft)}</p>
        </div>
      </div>
    </Modal>
  );
};
