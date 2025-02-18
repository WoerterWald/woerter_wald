import { FaGithub as Github } from 'react-icons/fa';
import Link from 'next/link';
import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.githubLinks}>
        <Link href="https://github.com/druckmax" target="_blank">
          <Github /> druckmax
        </Link>
        <a href="https://github.com/pozniej-znajde-wolne-haslo" target="_blank">
          <Github /> pozniej-znajde-wolne-haslo
        </a>
      </div>
      <div className="flexGap" />
      <div className={styles.freepikLinks}>
        <span>Images by freepik: </span>
        <Link
          href="https://www.freepik.com/free-vector/hand-drawn-flat-design-forest-landscape_19964703.htm#fromView=search&page=1&position=4&uuid=533a0ec0-1993-4903-936d-38005704b3d4"
          target="_blank"
        >
          forest background
        </Link>
        <span>, </span>
        <Link
          href="https://www.freepik.com/free-vector/flat-autumn-forest-leaves-collection_5116726.htm#fromView=search&page=1&position=0&uuid=790c7f2f-d372-4607-a627-2f38927c57fa"
          target="_blank"
        >
          leaf collection
        </Link>
      </div>
    </div>
  );
};
