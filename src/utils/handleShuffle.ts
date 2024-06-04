/* Durstenfeld shuffle algorithm (optimized version of Fisher-Yates) */
export const handleShuffle = (arr: string[]) => {
  const shuffleArr = arr.slice(1);
  for (let i = shuffleArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]];
  }

  return arr.slice(0, 1).concat(shuffleArr);
};
