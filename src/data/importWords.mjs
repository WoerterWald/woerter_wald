import { Word } from '../models/Word'
import words from './words_clean.json' with { type: "json" }

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI).then(() => console.log("DB connection successful!"));

try {
  await Word.create(words)
  console.log("Words successfully imported!")
} catch (error) {
  console.log("Error during import: ", error)
}

process.exit()