import { useEffect, useState } from 'react';

export type UseFetcherArgs<T> = {
  defaultValue?: T;
  setter: (value: T) => void;
  fetcher: () => Promise<T>;
};

export const useFetcher = <T>({ setter, fetcher }: UseFetcherArgs<T>) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setter(await fetcher());
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return isLoading;
};

export type UseStateFetcherArgs<T> = Pick<UseFetcherArgs<T>, 'fetcher'> & {
  defaultValue: T;
};

export const useStateFetcher = <T>({
  defaultValue,
  fetcher,
}: UseStateFetcherArgs<T>) => {
  const [data, setData] = useState<T>(defaultValue);
  const isLoading = useFetcher<T>({ fetcher, setter: setData });

  return { data, setData, isLoading };
};
