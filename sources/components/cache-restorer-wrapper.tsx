import { useLoadingHandler } from '@/hooks';
import { useConfigStore } from '@/stores';
import { FC, PropsWithChildren, useEffect } from 'react';

export const CacheRestorerWrapper: FC<PropsWithChildren> = ({ children }) => {
  const initConfigStore = useConfigStore(state => state.init);
  const { isLoading, setIsLoading } = useLoadingHandler(true);

  useEffect(() => {
    (async () => {
      try {
        await initConfigStore();
      } catch (e) {
        // TODO: error handler
        console.error('error', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return null; //TODO: loader
  }

  return <>{children}</>;
};
