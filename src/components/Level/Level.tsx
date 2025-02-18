import Image from 'next/image';
import { assertNextLevel, findLevels } from '@/utils/findLevelHelper';
import { LevelT } from '../Game/Game';
import styles from './level.module.scss';

type LevelProps = {
  curScore: number;
  levels: LevelT[];
};

export const Level = ({ curScore, levels }: LevelProps) => {
  const { curLevel, nextLevel, isLastLevel } = findLevels(levels, curScore);

  //TODO: Indicate that the last level is reached. Maybe prevent user from continuing playing and show a kodama
  return (
    <div className={styles.levelContainer}>
      <p>
        Level {curLevel.level}: {curLevel.levelName}
      </p>

      {isLastLevel ? (
        <p>
          Score: {curScore} <Image src="/assets/mushroom.webp" alt="Pilz" width={20} height={20} />
        </p>
      ) : (
        <p>
          {assertNextLevel(curLevel.nextLevelScore) - curScore}
          <Image src="/assets/mushroom.webp" alt="Pilz" width={48} height={36} />
          bis Level {nextLevel.level}
        </p>
      )}
    </div>
  );
};
