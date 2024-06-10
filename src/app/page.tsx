import { getServerCookie } from '@/utils/cookieHelpers';
import { Footer } from '@/components/Footer/Footer';
import { Game } from '@/components/Game/Game';
import { Header } from '@/components/Header/Header';
import { getGame } from './actions/getGame';
import '../styles/reset.scss';

export default async function Home() {
  const game = await getGame();
  const hasCookie = await getServerCookie(game.id);

  return (
    <>
      <Header />
      <Game letters={game.letters} />
      <Footer />
      {hasCookie && <p>Hello you have returned</p>}
    </>
  );
}
