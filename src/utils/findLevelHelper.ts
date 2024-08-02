import { LevelT } from '@/components/Game/Game';

const createHiddenLevel = (arrLength: number) => ({
  level: arrLength + 1,
  levelName: 'Kodama',
  nextLevelScore: null,
});

export const assertNextLevel = (nextLevel: number | null): number => {
  if (nextLevel === null) throw new Error('Next level is null');
  return nextLevel;
};

const findCurLevelIndex = (levels: LevelT[], curScore: number) =>
  levels.findIndex((level, index, array) => {
    if (index >= array.length - 1) return level;
    return curScore < assertNextLevel(level.nextLevelScore);
  });

export const findLevels = (levels: LevelT[], curScore: number) => {
  const allLevels = [...levels, createHiddenLevel(levels.length)];
  const curLevelIndex = findCurLevelIndex(allLevels, curScore) || 0;
  const curLevel = allLevels[curLevelIndex];
  const nextLevel = levels[curLevelIndex + 1];
  const isLastLevel = curLevelIndex >= levels.length - 1;

  return { curLevel, nextLevel, isLastLevel };
};
