export const stringifyObj = <T>(value: T) => {
  return JSON.stringify(value);
};

export const parseStringifiedObj = <T>(value: string | null) => {
  if (!value) {
    return null;
  }

  return JSON.parse(value) as T;
};
