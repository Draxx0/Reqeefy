export const truncateOverTwentyCharacters = (text: string) => {
  return text.length > 20 ? text.slice(0, 20) + '...' : text;
};
