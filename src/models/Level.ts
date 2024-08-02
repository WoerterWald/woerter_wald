import { Document, Schema } from 'mongoose';

export interface LevelSchema extends Document {
  level: number;
  levelName: string;
  nextLevelScore: number;
}

export const levelSchema = new Schema<LevelSchema>(
  {
    level: {
      type: Number,
      required: true,
    },
    levelName: {
      type: String,
      required: true,
    },
    nextLevelScore: {
      type: Number,
      required: true,
    },
  },
  {
    id: false,
    timestamps: true,
  }
);
