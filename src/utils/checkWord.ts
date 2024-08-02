import { Document, ObjectId, PopulatedDoc } from 'mongoose';
import { GameSchema } from '@/models/Game';
import { WordSchema } from '@/models/Word';

interface PopulatedGame extends GameSchema {
  panagrams: PopulatedDoc<Document<ObjectId> & WordSchema>[];
  matchedWords: PopulatedDoc<Document<ObjectId> & WordSchema>[];
}

export const checkWord = (game: PopulatedGame, word: string) => {
  const matchedPanagram = game.panagrams.find((match: WordSchema) => match.word === word);
  if (matchedPanagram) return 'Panagram found';
  const match = game.matchedWords.find((match: WordSchema) => match.word === word);
  if (match) return 'Match found';
  return 'No match found';
};
