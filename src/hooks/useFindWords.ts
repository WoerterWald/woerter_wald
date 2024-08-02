import { useEffect, useMemo, useState } from 'react';
import { calcScore } from '@/utils/calcScore';
import { getCookie, setCookie } from '@/utils/cookieHelpers';
import { Word } from '@/components/Game/Game';

export const useFindWords = (gameId: string, panagrams: Word[]) => {
  const [foundWords, setFoundWords] = useState<string[]>(getCookie(gameId)?.split('|') ?? []);

  const curScore = useMemo(
    () => foundWords.map((word) => calcScore(word, panagrams)).reduce((a, b) => a + b, 0),
    [panagrams, foundWords]
  );

  useEffect(() => {
    if (foundWords.length <= 0) return;
    setCookie(gameId, foundWords[foundWords.length - 1]);
  }, [gameId, foundWords]);

  return { foundWords, setFoundWords, curScore };
};
