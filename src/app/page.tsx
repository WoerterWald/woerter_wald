import { getServerCookie } from '@/utils/cookieHelpers';
import { Footer } from '@/components/Footer/Footer';
import { Hamburger } from '@/components/Hamburger/Hamburger';
import { UserBtnsAndGrid } from '@/components/UserBtnsAndGrid/UserBtnsAndGrid';
import { getGame } from './actions/getGame';
import '../styles/reset.scss';

export default async function Home() {
  const game = await getGame();
  const hasCookie = await getServerCookie(game.id);
  console.log(game);

  return (
    <>
      <header>
        <div className="flexGap" />
        <h1>WörterWald</h1>
        <Hamburger />
      </header>

      <UserBtnsAndGrid letters={game.letters} />
      <Footer />
      {hasCookie && <p>Hello you have returned</p>}
    </>
  );
}
