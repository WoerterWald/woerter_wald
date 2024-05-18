import dbConnect from '@/lib/dbConnect';
import Game from '@/models/Game';

export const getGame = async () => {
  try {
    await dbConnect();
    return await Game.findOne({}).sort({ createdAt: -1 }).populate('matchedWords panagrams');
  } catch (error) {
    console.error(error);
    //TODO: Do something here like redirect to an error or not-found page
  }
};
