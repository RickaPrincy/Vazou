import { useLoadingHandler } from '@/hooks';
import { useConfigStore, useSongsStore } from '@/stores';
import { FC, PropsWithChildren, useEffect } from 'react';

export const CacheRestorerWrapper: FC<PropsWithChildren> = ({ children }) => {
  const initSongsStore = useSongsStore(state => state.init);
  const initConfigStore = useConfigStore(state => state.init);
  const { isLoading, setIsLoading } = useLoadingHandler(true);

  useEffect(() => {
    try {
      initSongsStore();
      initConfigStore();
    } catch (e) {
      // TODO: error handler
      console.error('error', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return null; //TODO: loader
  }

  return <>{children}</>;
};
