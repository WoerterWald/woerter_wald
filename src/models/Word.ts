import { Document, Schema, Types, model, models } from 'mongoose';

export interface WordSchema extends Document {
  word: string;
  gameWords: Types.ObjectId[];
  gamePanagrams: Types.ObjectId[];
}

export const wordSchema = new Schema<WordSchema>(
  {
    word: {
      type: String,
      required: true,
    },
  },
  {
    id: false,
    timestamps: true,
  }
);

export default models.Word || model<WordSchema>('Word', wordSchema);
