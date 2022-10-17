import { Card, Variant } from '@prisma/client';

export const CARD_PREVIEW_WIDTH = 358;
export const CARD_PREVIEW_HEIGHT = 500;

export type CardType = Card & { variants: Variant[] };
