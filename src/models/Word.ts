import { Schema, model, Document, models, Types } from 'mongoose';

export interface WordT extends Document {
  word: string,
  gameWords: Types.ObjectId[];
  gamePanagrams: Types.ObjectId[];
}

export const wordSchema = new Schema<WordT>({
  word: {
    type: String,
    required: true
  }
},
  {
    id: false,
    timestamps: true,
  })

export default models.Word || model<WordT>("Word", wordSchema);