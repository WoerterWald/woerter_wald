import { assert } from 'console';
import next from 'next';
import Image from 'next/image';
import mushroom from '@/assets/Mushroom.webp';
import { LevelT } from '../Game/Game';
import styles from './level.module.scss';

type LevelProps = {
  curScore: number;
  levels: LevelT[];
  totalScore: number;
};

const hiddenLevel = {
  level: 10,
  levelName: 'Kodama',
  nextLevelScore: null,
};

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

export const Level = ({ curScore, levels, totalScore }: LevelProps) => {
  const curLevelIndex = findLevel([...levels, hiddenLevel], curScore) || 0;
  const nextLevelIndex = curLevelIndex + 1;
  const isLastLevel = curLevelIndex >= levels.length - 1;
  //TODO: Indicate that the last level is reached. Maybe prevent user from continuing playing and show a kodama
  const isHiddenLevel = curScore >= totalScore;

  const levelName = isHiddenLevel ? hiddenLevel.levelName : levels[curLevelIndex].levelName;

  return (
    <div className={styles.levelContainer}>
      <p>Level: {levelName}</p>

      {isLastLevel ? (
        <p>
          Score: {curScore} <Image src={mushroom} alt="Pilz" width={20} height={20} />
        </p>
      ) : (
        <p>
          {assertNextLevel(levels[curLevelIndex].nextLevelScore) - curScore}
          <Image src={mushroom} alt="Pilz" width={20} height={20} />
          bis Level {levels[nextLevelIndex].level}
        </p>
      )}
    </div>
  );
};
