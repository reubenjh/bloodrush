export const getCardImageUrl = (identifier: string, size?: string): string => {
  return `todo/${encodeURIComponent(identifier)}${size ? `-${size}` : ''}.png`;
};
