import { Word } from '@/components/Game/Game';

export const calcScore = (wordInput: string, panagrams: Word[]) => {
  const isPanagram = panagrams.some((obj) => obj.word.toLowerCase() === wordInput.toLowerCase());
  if (wordInput.length === 4) {
    return 1;
  } else if (isPanagram) {
    return wordInput.length + 7;
  } else {
    return wordInput.length;
  }
};
