'use client';

import { useState } from 'react';
import styles from './letterGrid.module.scss';

const classNames = require('classnames');

export const LetterGrid = () => {
  const [wordInput, setWordInput] = useState('');

  const handleUserInput = (id: string) => {
    const chosenLetter = document.getElementById(id);
    setWordInput((prev) => prev + chosenLetter?.innerHTML);
  };

  console.log(wordInput);

  return (
    <div className={styles.gridContainer}>
      <div className={classNames(styles.top, styles.flex)}>
        <button
          className={classNames(styles.letter, styles.secondaryLetters, styles.flex)}
          id="letter1"
          onClick={() => handleUserInput('letter1')}
        >
          R
        </button>
      </div>
      <div className={classNames(styles.topLeft, styles.flex)}>
        <button
          className={classNames(styles.letter, styles.secondaryLetters, styles.flex)}
          id="letter2"
          onClick={() => handleUserInput('letter2')}
        >
          H
        </button>
      </div>
      <div className={classNames(styles.bottomLeft, styles.flex)}>
        <button
          className={classNames(styles.letter, styles.secondaryLetters, styles.flex)}
          id="letter3"
          onClick={() => handleUserInput('letter3')}
        >
          G
        </button>
      </div>
      <div className={classNames(styles.center, styles.flex)}>
        <button
          className={classNames(styles.letter, styles.mainLetter, styles.flex)}
          id="letter4"
          onClick={() => handleUserInput('letter4')}
        >
          E
        </button>
      </div>
      <div className={classNames(styles.topRight, styles.flex)}>
        <button
          className={classNames(styles.letter, styles.secondaryLetters, styles.flex)}
          id="letter5"
          onClick={() => handleUserInput('letter5')}
        >
          W
        </button>
      </div>
      <div className={classNames(styles.bottomRight, styles.flex)}>
        <button
          className={classNames(styles.letter, styles.secondaryLetters, styles.flex)}
          id="letter6"
          onClick={() => handleUserInput('letter6')}
        >
          A
        </button>
      </div>
      <div className={classNames(styles.bottom, styles.flex)}>
        <button
          className={classNames(styles.letter, styles.secondaryLetters, styles.flex)}
          id="letter7"
          onClick={() => handleUserInput('letter7')}
        >
          M
        </button>
      </div>
    </div>
  );
};
