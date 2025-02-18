import Image from 'next/image';
import KodamaBody from '../assets/kodama_body.webp';
import KodamaHead from '../assets/kodama_head.webp';
import '../styles/notFound.scss';

export default function NotFound() {
  return (
    <div className="notFoundWrapper">
      <div className="bgTop" />
      <div className="bgCenter" />
      <div className="bgMain" />
      <div className="notFound__content">
        <h1>Nicht gefunden!</h1>
        <h2>Oh nein! Diese Seite konnten die Waldgeister nicht finden!</h2>
      </div>
      <div className="notFound__kodama">
        <Image
          className="notFound__kodama--head"
          src={KodamaHead}
          alt="Ein Kodama Kopf"
          width={180}
          height={180}
        />
        <Image
          className="notFound__kodama--body"
          src={KodamaBody}
          alt="Der Körper eines Kodamas"
          width={180}
          height={180}
        />
      </div>
    </div>
  );
}
