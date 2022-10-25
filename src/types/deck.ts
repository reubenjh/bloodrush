import { Deck, DeckCard } from '@prisma/client';
import { CardType } from './card';
import { UserType } from './user';

export const DECK_PREVIEW_WIDTH = 556;
export const DECK_PREVIEW_HEIGHT = 200;

export enum DeckVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum DeckFormat {
  CONSTRUCTED = 'constructed',
  BLITZ = 'blitz',
}

// todo tidy up this messy type system with includes

export type DeckType = Deck & {
  // enums
  format: DeckFormat;
  visibility: DeckVisibility;
  // fks
  user: UserType;
  hero: CardType;
  feature: CardType;
  decklist: DeckCardType[];
};

export type DeckCardType = DeckCard;
