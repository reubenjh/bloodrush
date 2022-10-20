import { Deck, DeckCard } from '@prisma/client';

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

export type DeckType = Deck & {
  visibility: DeckVisibility;
  DeckFormat: DeckFormat;
  cards: DeckCard[];
};

export type DeckCardType = DeckCard;
