'use client';

import { useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BiSolidUpArrow } from 'react-icons/bi';
import classNames from 'classnames';
import styles from './dropdown.module.scss';

type DropdownProps = {
  foundWords: string[];
};

export const Dropdown = ({ foundWords }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const recentGuesses = foundWords.slice(0).reverse().join(' ').slice(0, 41).concat('...');

  const guessesList = foundWords
    .slice(0)
    .sort((a, b) => a.slice(0).toLowerCase().localeCompare(b.slice(0).toLowerCase()))
    .join(' ');

  const handleClick = () => setOpen(!open);

  return (
    <div className={styles.dropdown}>
      <button
        className={classNames(styles.dropdownBtn, open && styles.radiusNull)}
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
          {guessesList}
        </div>
      )}
    </div>
  );
};
