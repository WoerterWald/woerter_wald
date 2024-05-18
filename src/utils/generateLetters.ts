const letterFrequencies = [
  { letter: 'A', frequency: 5.58 },
  { letter: 'Ä', frequency: 0.54 },
  { letter: 'B', frequency: 1.96 },
  { letter: 'C', frequency: 3.16 },
  { letter: 'D', frequency: 4.98 },
  { letter: 'E', frequency: 16.93 },
  { letter: 'F', frequency: 1.49 },
  { letter: 'G', frequency: 3.02 },
  { letter: 'H', frequency: 4.98 },
  { letter: 'I', frequency: 8.02 },
  { letter: 'J', frequency: 0.24 },
  { letter: 'K', frequency: 1.32 },
  { letter: 'L', frequency: 3.60 },
  { letter: 'M', frequency: 2.55 },
  { letter: 'N', frequency: 10.53 },
  { letter: 'O', frequency: 2.24 },
  { letter: 'Ö', frequency: 0.30 },
  { letter: 'P', frequency: 0.67 },
  { letter: 'Q', frequency: 0.02 },
  { letter: 'R', frequency: 6.89 },
  { letter: 'S', frequency: 6.42 },
  { letter: 'T', frequency: 5.79 },
  { letter: 'U', frequency: 3.83 },
  { letter: 'Ü', frequency: 0.65 },
  { letter: 'V', frequency: 0.84 },
  { letter: 'W', frequency: 1.78 },
  { letter: 'X', frequency: 0.05 },
  { letter: 'Y', frequency: 0.05 },
  { letter: 'Z', frequency: 1.21 }
];

const vowelRegex = new RegExp(/[AEIOUÖÄÜ]/);
const totalFrequency = letterFrequencies.reduce((sum, { frequency }) => sum + frequency, 0)

export const generateLetters = (result: string[] = [], vowelCount = 0): string[] => {

  if (result.length === 7) return result

  const randomNumber = Math.random() * totalFrequency
  let cumulativeFreq = 0

  for (const { letter, frequency } of letterFrequencies) {
    if (!result.includes(letter))
      cumulativeFreq += frequency;
    if (randomNumber <= cumulativeFreq) {
      if (vowelRegex.test(letter) && vowelCount < 3) {
        return generateLetters([...result, letter], vowelCount + 1);
      } else {
        return generateLetters([...result, letter], vowelCount);
      }
    }
  }
  return generateLetters()
}
