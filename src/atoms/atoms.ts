'use client';

import { atom } from 'jotai';

export type ModalAtom = 'rules' | 'welcomeBack' | '';
export const modalAtom = atom<ModalAtom>('');
