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

const getRecentGuesses = (foundWords: string[], panagrams: Word[]) => {
  return foundWords.toReversed().map((word, index, arr) => {
    const isPanagram = panagrams.some((panagram) => panagram.word === word);
    const isLastWord = index === arr.length - 1;
    return (
      <Fragment key={`guess-${word}`}>
        {isPanagram ? <span className={styles.panagram}>{word}</span> : word}
        {!isLastWord && ', '}
      </Fragment>
    );
  });
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
            <span className={styles.dropdownBtnContent}>{recentGuesses}</span>
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

              return (
                <p key={`content-${word}`} className={panagram ? styles.panagram : ''}>
                  {word}
                </p>
              );
            })}
        </div>
      )}
    </div>
  );
};
