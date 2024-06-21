import { Hamburger } from '../Hamburger/Hamburger';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="flexGap" />
      <h1>WörterWald</h1>
      <Hamburger />
    </header>
  );
};
