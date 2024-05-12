import { Footer } from '@/components/Footer/Footer';
import { getWord } from './actions/getWord';
import '../styles/reset.scss';

export default async function Home() {
  const data = await getWord('ABBA');
  console.log(data);
  return (
    <>
      <h1>Hello from WörterWald</h1>
      <Footer />
    </>
  );
}
