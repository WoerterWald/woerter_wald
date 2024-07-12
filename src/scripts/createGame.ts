import dbConnect from '../lib/dbConnect';
import Game from '../models/Game';
import Word, { WordT } from '../models/Word';
import { generateLetters } from '../utils/generateLetters';

const calcLevels = (words: WordT[], panagrams: WordT[]) => {
  let shortWordScore = 0;
  let longWordScore = 0;

  for (const word of words) {
    if (word.word.length === 4) {
      shortWordScore++;
    } else {
      longWordScore += word.word.length;
    }
  }

  const totalWordScore = longWordScore + shortWordScore;
  // const averageWordLength = totalWordLength / words.length
  const panagramScore = panagrams.reduce((acc, curr) => acc + (curr.word.length + 7), 0);

  const score = Math.ceil(
    (totalWordScore + panagramScore) / ((words.length + panagrams.length) * 0.5)
  );
  const levelScores: number[] = [];
  const numberOfLevels = 9;
  const difficultyFactor = 1.75;
  let levelAcc = 0;
  for (let i = 1; i <= numberOfLevels; i++) {
    const nextLevel = Math.round(score * (1 - Math.exp(-i / difficultyFactor)));
    levelAcc += nextLevel;
    levelScores.push(levelAcc);
  }
  const totalScore = levelScores[levelScores.length - 1];

  return { totalScore, levelScores };
};

const createGame = async (iteration = 0): Promise<void> => {
  const letters = generateLetters();
  const split = letters.join('').toLowerCase();
  const regexPattern = new RegExp(`^(?=.*${split[0]})[${split}]+$`, 'i');

  await dbConnect();

  try {
    const words = await Word.aggregate([
      {
        $match: {
          word: { $regex: regexPattern },
        },
      },
    ]);

    const panagrams = words.filter((obj) => {
      const wordLetters = new Set(obj.word.toLowerCase());
      return letters.every((letter) => wordLetters.has(letter.toLowerCase()));
    });

    if (panagrams.length <= 0) {
      const nextIteration = iteration + 1;
      console.log(`No panagrams found starting next iteration: ${nextIteration}`);
      return createGame(nextIteration);
    } else {
      console.log(words[0], panagrams[0]);
      const { totalScore, levelScores } = calcLevels(words, panagrams);

      await Game.create({
        letters,
        totalScore,
        levelScores,
        matchedWords: words,
        panagrams: panagrams,
      });

      console.log(`Successfully created new game 🎉 \n`);
      console.log(
        `Letters: ${letters.join(', ')},\nWords: ${words.length},\nPanagrams: ${panagrams.length}`
      );
    }
  } catch (error) {
    console.error('Failed to create game: ', error);
  }
};

createGame().then(() => process.exit());
