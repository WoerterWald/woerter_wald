'use client';

import { useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BiSolidUpArrow } from 'react-icons/bi';
import classNames from 'classnames';
import { Word } from '../Game/Game';
import styles from './dropdown.module.scss';

type DropdownProps = {
  foundWords: string[];
  panagrams: Word[];
};

export const Dropdown = ({ foundWords, panagrams }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const recentGuesses = foundWords.slice(0).reverse().join(' ').slice(0, 41).concat('...');

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
            <span>{`Du hast ${foundWords.length} Wörter gefunden`}</span>
            <BiSolidUpArrow className={styles.arrowBtn} />
          </>
        )}
      </button>

      {open && (
        <div className={styles.dropdownContent} onClick={handleClick}>
          {foundWords
            .sort((a, b) => a.slice(0).toLowerCase().localeCompare(b.slice(0).toLowerCase()))
            .map((word) => {
              const panagram = panagrams.find((elem) => elem.word === word);

              return panagram ? <p className={styles.panagram}>{word}</p> : <p>{word}</p>;
            })}
        </div>
      )}
    </div>
  );
};
