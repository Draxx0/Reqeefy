export const generateExpirationDate = (expiresInMilliseconds: number): Date => {
  const currentDate = new Date();
  const localTimeOffset = currentDate.getTimezoneOffset() * 60 * 1000;

  return new Date(
    currentDate.getTime() + expiresInMilliseconds - localTimeOffset,
  );
};
