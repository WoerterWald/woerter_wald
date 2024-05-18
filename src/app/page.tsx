import { Footer } from '@/components/Footer/Footer';
import { Hamburger } from '@/components/Hamburger/Hamburger';
import { getWord } from './actions/getWord';
import '../styles/reset.scss';

export default async function Home() {
  const data = await getWord('ABBA');
  console.log(data);
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
