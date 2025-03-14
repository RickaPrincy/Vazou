import { useLoadingHandler } from '@/hooks';
import { useSongsStore } from '@/stores';
import { FC, PropsWithChildren, useEffect } from 'react';

export const CacheRestorerWrapper: FC<PropsWithChildren> = ({ children }) => {
  const initSongsStore = useSongsStore(state => state.init);
  const { isLoading, setIsLoading } = useLoadingHandler(true);

  useEffect(() => {
    try {
      initSongsStore();
    } catch (e) {
      console.error('error', e);
      // TODO: error handler
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return null; //TODO: loader
  }

  return <>{children}</>;
};
