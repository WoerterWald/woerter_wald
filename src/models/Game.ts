import { Document, Schema, Types, model, models } from 'mongoose';
import { LevelSchema, levelSchema } from './Level';
import { wordSchema } from './Word';

export interface GameSchema extends Document {
  letters: string[];
  totalScore: number;
  levels: Types.DocumentArray<LevelSchema>;
  matchedWords: Types.ObjectId[];
  panagrams: Types.ObjectId[];
}

const gameSchema = new Schema<GameSchema>(
  {
    letters: {
      type: [String],
      required: true,
      validate: [validateLetters, 'Letters needs to have 7 entries.'],
    },
    levels: {
      type: [levelSchema],
      required: true,
      validate: [validateLevelScores, 'LevelScores needs to have 9 entries.'],
    },
    totalScore: {
      type: Number,
      required: true,
    },
    matchedWords: [wordSchema],
    panagrams: [wordSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

function validateLetters(letters: string[]) {
  return letters.length === 7;
}

function validateLevelScores(levelScores: number[]) {
  return levelScores.length === 9;
}

gameSchema.virtual('mainLetter').get(function () {
  if (!this.letters) return;
  return this.letters[0];
});

export default models.Game || model<GameSchema>('Game', gameSchema);
