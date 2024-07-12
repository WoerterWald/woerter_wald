import Image from 'next/image';
import mushroom from '@/assets/Mushroom.webp';
import styles from './level.module.scss';

type LevelObj = {
  level: number;
  levelName: string;
  score: number;
};

type LevelProps = {
  curScore: number;
  levels: LevelObj[];
};

const findLevel = (levels: LevelObj[], curScore: number) =>
  levels.findIndex((level, index, array) => {
    if (index >= array.length - 1) return level;
    return curScore >= level.score && curScore < array[index + 1].score;
  });

export const Level = ({ curScore, levels }: LevelProps) => {
  const curLevelIndex = findLevel(levels, curScore) || 0;
  const nextLevelIndex = curLevelIndex + 1;
  const isLastLevel = curLevelIndex === levels.length - 1;

  return (
    <div className={styles.levelContainer}>
      <p>Level: {levels[curLevelIndex].levelName}</p>

      {isLastLevel ? (
        <p>
          Score: {curScore} <Image src={mushroom} alt="Pilz" width={20} height={20} />
        </p>
      ) : (
        <p>
          {levels[nextLevelIndex].score - curScore}
          <Image src={mushroom} alt="Pilz" width={20} height={20} />
          bis Level {levels[nextLevelIndex].level}
        </p>
      )}
    </div>
  );
};
