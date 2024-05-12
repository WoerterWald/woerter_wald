import { Schema, model, Document, models } from 'mongoose';

export interface Word extends Document {
  word: string
}

const wordSchema = new Schema<Word>({
  word: {
    type: String,
    required: true
  }
},
  {
    id: false,
    timestamps: true,
  })

export default models.Word || model<Word>("Word", wordSchema);