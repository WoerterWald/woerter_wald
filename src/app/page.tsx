import { Footer } from '@/components/Footer/Footer';
import { Hamburger } from '@/components/Hamburger/Hamburger';
import { getGame } from './actions/getGame';
import '../styles/reset.scss';

export default async function Home() {
  const game = await getGame();
  console.log(game);

  return (
    <>
      <header>
        <div className="flexGap" />
        <h1>WörterWald</h1>
        <Hamburger />
      </header>

      <Footer />
    </>
  );
}
