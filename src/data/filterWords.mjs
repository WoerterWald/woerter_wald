import fs from 'fs'
import words from './words_source.json' with { type: "json" }

const filterWords = () => {
  const filtered = words.map(word => {
    const regex = new RegExp(/^[A-Za-z]+$/)
    if (regex.test(word) && word.length > 3) {
      return { word }
    }
   
  }).filter(Boolean)

  fs.writeFileSync("./src/data/words_clean.json", JSON.stringify(filtered))
}

filterWords()