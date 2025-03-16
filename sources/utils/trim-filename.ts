export const trimFilename = (filename: string, maxLength: number = 25) => {
  const trimed = filename.slice(0, maxLength);
  return trimed + (filename.length !== trimed.length ? '...' : '');
};
