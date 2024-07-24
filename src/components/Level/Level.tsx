import Image from 'next/image';
import mushroom from '@/assets/Mushroom.webp';
import { LevelT } from '../Game/Game';
import styles from './level.module.scss';

type LevelProps = {
  curScore: number;
  levels: LevelT[];
};

const createHiddenLevel = (arrLength: number) => ({
  level: arrLength + 1,
  levelName: 'Kodama',
  nextLevelScore: null,
});

/* Got this from Martin, it's called assertion functions. Usually used to assert that a value is of a certain type, see assertIsNotNull function.
Martin used it like assertNextLevel, where we can rule out that nextLevel is null, but is certainly a number, by doing this check in an extra function, but also return the value.
This satisfies typescript and does not show an error. */

// function assertIsNotNull<T>(value: T | null): asserts value is T {
//   if (value === null) {
//     throw new Error('Value is null');
//   }
// }

const assertNextLevel = (nextLevel: number | null): number => {
  if (nextLevel === null) throw new Error('Next level is null');
  return nextLevel;
};

const findLevel = (levels: LevelT[], curScore: number) =>
  levels.findIndex((level, index, array) => {
    if (index >= array.length - 1) return level;
    return curScore < assertNextLevel(level.nextLevelScore);

    // We could alternatively do it like this:
    // assertIsNotNull(level.nextLevelScore)
    // return curScore < level.nextLevelScore;
  });

export const Level = ({ curScore, levels }: LevelProps) => {
  const allLevels = [...levels, createHiddenLevel(levels.length)];
  const curLevelIndex = findLevel(allLevels, curScore) || 0;
  const curLevel = allLevels[curLevelIndex];
  const isLastLevel = curLevelIndex >= levels.length - 1;

  //TODO: Indicate that the last level is reached. Maybe prevent user from continuing playing and show a kodama
  return (
    <div className={styles.levelContainer}>
      <p>
        Level {curLevel.level}: {curLevel.levelName}
      </p>

      {isLastLevel ? (
        <p>
          Score: {curScore} <Image src={mushroom} alt="Pilz" width={20} height={20} />
        </p>
      ) : (
        <p>
          {assertNextLevel(curLevel.nextLevelScore) - curScore}
          <Image src={mushroom} alt="Pilz" width={20} height={20} />
          bis Level {levels[curLevelIndex + 1].level}
        </p>
      )}
    </div>
  );
};
