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

export const WelcomeBack = ({ game, panagrams }: WelcomeBack) => {
  const { foundWords, curScore } = useFindWords(game.id, panagrams);
  const { curLevel } = findLevels(game.levels, curScore);

  return (
    <Modal isSmall>
      <div className={styles.container}>
        <h2>Willkommen zurück!</h2>
        <p className={styles.summary}>
          Du hast bereits {foundWords.length} Wörter gefunden und {curScore}{' '}
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
          <p className={styles.countdown}>7h 12m 45s</p>
        </div>
      </div>
    </Modal>
  );
};
