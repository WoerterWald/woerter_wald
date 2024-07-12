import { Mushroom } from '@/assets/Mushrooms';
import styles from './level.module.scss';

type LevelObj = {
  level: number;
  levelName: string;
  score: number;
};

type LevelProps = {
  curScore: number;
  curLevel: LevelObj;
  nextLevel: LevelObj;
};

export const Level = ({ curScore, curLevel, nextLevel }: LevelProps) => {
  return (
    <div className={styles.levelContainer}>
      <p>Level: {curLevel.levelName}</p>

      {curLevel.level === 9 ? (
        <p>
          Score: {curScore} <Mushroom />
        </p>
      ) : (
        <p>
          {nextLevel.score - curScore} <Mushroom /> bis Level {nextLevel.level}
        </p>
      )}
    </div>
  );
};
