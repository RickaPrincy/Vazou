export const stringifyObj = <T>(value: T) => {
  return JSON.stringify(value);
};

export const parseStringifiedObj = <T>(value: string) => {
  return JSON.parse(value) as T;
};
