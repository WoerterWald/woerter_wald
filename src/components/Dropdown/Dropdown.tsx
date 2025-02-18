'use client';

import { Fragment, useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BiSolidUpArrow } from 'react-icons/bi';
import classNames from 'classnames';
import { Word } from '../Game/Game';
import styles from './dropdown.module.scss';

type DropdownProps = {
  foundWords: string[];
  panagrams: Word[];
};

const getRecentGuesses = (foundWords: string[], pangrams: Word[]) => {
  return foundWords
    .toReversed()
    .map((word) => {
      const isPangram = pangrams.some((pangram) => pangram.word === word);
      return (
        <Fragment key={word}>
          {isPangram ? <span className={styles.panagram}>{word}</span> : word}
          {', '}
        </Fragment>
      );
    })
    .concat(<span>...</span>);
};
export const Dropdown = ({ foundWords, panagrams }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const recentGuesses = getRecentGuesses(foundWords, panagrams);

  const handleClick = () => setOpen(!open);

  return (
    <div className={styles.dropdown}>
      <button
        className={classNames(styles.dropdownBtn, open && styles.active)}
        onClick={handleClick}
      >
        {!open ? (
          <>
            <span>{recentGuesses}</span>
            <BiSolidDownArrow className={styles.arrowBtn} />
          </>
        ) : (
          <>
            <span>{`Du hast ${foundWords.length} ${foundWords.length === 1 ? 'Wort' : 'Wörter'} gefunden`}</span>
            <BiSolidUpArrow className={styles.arrowBtn} />
          </>
        )}
      </button>

      {open && (
        <div className={styles.dropdownContent} onClick={handleClick}>
          {foundWords
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            .map((word) => {
              const panagram = panagrams.find((elem) => elem.word === word);

              return panagram ? <p className={styles.panagram}>{word}</p> : <p>{word}</p>;
            })}
        </div>
      )}
    </div>
  );
};
