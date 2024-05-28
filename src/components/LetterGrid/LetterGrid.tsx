import styles from './letterGrid.module.scss';

const classNames = require('classnames');

export const LetterGrid = () => {
  return (
    <div className={styles.gridContainer}>
      <div className={classNames(styles.top, styles.flex)}>
        <button className={classNames(styles.letter, styles.secondaryLetters, styles.flex)}>
          R
        </button>
      </div>
      <div className={classNames(styles.topLeft, styles.flex)}>
        <button className={classNames(styles.letter, styles.secondaryLetters, styles.flex)}>
          H
        </button>{' '}
      </div>
      <div className={classNames(styles.bottomLeft, styles.flex)}>
        <button className={classNames(styles.letter, styles.secondaryLetters, styles.flex)}>
          G
        </button>
      </div>
      <div className={classNames(styles.center, styles.flex)}>
        <button className={classNames(styles.letter, styles.mainLetter, styles.flex)}>E</button>
      </div>
      <div className={classNames(styles.topRight, styles.flex)}>
        <button className={classNames(styles.letter, styles.secondaryLetters, styles.flex)}>
          W
        </button>
      </div>
      <div className={classNames(styles.bottomRight, styles.flex)}>
        <button className={classNames(styles.letter, styles.secondaryLetters, styles.flex)}>
          A
        </button>
      </div>
      <div className={classNames(styles.bottom, styles.flex)}>
        <button className={classNames(styles.letter, styles.secondaryLetters, styles.flex)}>
          M
        </button>
      </div>
    </div>
  );
};
