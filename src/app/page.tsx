import dynamic from 'next/dynamic';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { getGame } from './actions/getGame';
import '../styles/reset.scss';

const Game = dynamic(() => import('@/components/Game/Game').then((mod) => mod.Game), {
  ssr: false,
});

export default async function Home() {
  const game = await getGame();

  return (
    <>
      <Header />
      <Game game={game} />
      <Footer />
    </>
  );
}
