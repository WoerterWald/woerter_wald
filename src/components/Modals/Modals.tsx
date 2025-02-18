'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { getCookie } from '@/utils/cookieHelpers';
import { modalAtom } from '@/atoms/atoms';
import { Game, Word } from '../Game/Game';
import { Rules } from './Rules/Rules';
import { WelcomeBack } from './WelcomeBack/WelcomeBack';

type Modals = {
  game: Game;
  panagrams: Word[];
};

export const Modals = ({ game, panagrams }: Modals) => {
  const [modalType, setModalType] = useAtom(modalAtom);

  useEffect(() => {
    if (getCookie(game._id)) {
      setModalType('welcomeBack');
    }
  }, [game._id, setModalType]);

  switch (modalType) {
    case 'rules':
      return <Rules />;
    case 'welcomeBack':
      return <WelcomeBack game={game} panagrams={panagrams} />;
    default:
      return null;
  }
};
