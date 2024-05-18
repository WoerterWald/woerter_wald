import { GameT } from "@/models/Game";
import { WordT } from "@/models/Word";
import { Document, ObjectId, PopulatedDoc } from "mongoose";

interface PopulatedGame extends GameT {
  panagrams: PopulatedDoc<Document<ObjectId> & WordT>[],
  matchedWords: PopulatedDoc<Document<ObjectId> & WordT>[]
}

export const checkWord = (game: PopulatedGame, word: string) => {
  const matchedPanagram = game.panagrams.find((match: WordT) => match.word === word);
  if (matchedPanagram) return 'Panagram found';
  const match = game.matchedWords.find((match: WordT) => match.word === word);
  if (match) return 'Match found';
  return 'No match found';

}