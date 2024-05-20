import { Schema, model, Document, models, Types, Query } from 'mongoose';
import { wordSchema } from './Word';

export interface GameT extends Document {
  letters: string[],
  levelScores: number[],
  totalScore: number,
  matchedWords: Types.ObjectId[],
  panagrams: Types.ObjectId[],
}

const gameSchema = new Schema<GameT>({
  letters: {
    type: [String],
    required: true,
    validate: [validateLetters, "Letters needs to have 7 entries."]
  },
  levelScores: {
    type: [Number],
    required: true,
    validate: [validateLevelScores, "LevelScores needs to have 9 entries."]
  },
  totalScore: {
    type: Number,
    required: true,
  },
  matchedWords: [wordSchema],
  panagrams: [wordSchema]
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })

function validateLetters(letters: string[]) {
  return letters.length === 7;
}

function validateLevelScores(levelScores: number[]) {
  return levelScores.length === 9;
}

gameSchema.virtual("mainLetter").get(function () {
  if (!this.letters) return
  return this.letters[0]
})

export default models.Game || model<GameT>("Game", gameSchema);