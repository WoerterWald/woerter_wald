import { Schema, model } from 'mongoose';

const wordSchema = new Schema({
  word: {
    type: String,
    required: true
  }
},
  {
    id: false,
    timestamps: true,
  })

const Word = model("Word", wordSchema)

export default Word;