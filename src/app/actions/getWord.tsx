import dbConnect from '@/lib/dbConnect';
import Word from '../../models/Word';

export const getWord = async (word: string) => {
  await dbConnect();
  return Boolean(await Word.exists({ word }));
};
