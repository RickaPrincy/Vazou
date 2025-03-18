export const trimText = (title: string = '', maxLength: number = 25) => {
  const trimed = title.slice(0, maxLength);
  return trimed + (title.length !== trimed.length ? '...' : '');
};
