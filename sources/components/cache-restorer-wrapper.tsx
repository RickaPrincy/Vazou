import { useLoadingHandler } from '@/hooks';
import { songsProvider } from '@/providers';
import { useConfigStore, useFavoritesStore, usePlayListStore } from '@/stores';
import { FC, PropsWithChildren, useEffect } from 'react';

export const CacheRestorerWrapper: FC<PropsWithChildren> = ({ children }) => {
  const initConfigStore = useConfigStore(state => state.init);
  const initPlayListStore = usePlayListStore(state => state.init);
  const initFavoritesStore = useFavoritesStore(state => state.init);
  const { isLoading, setIsLoading } = useLoadingHandler(true);

  useEffect(() => {
    (async () => {
      try {
        await songsProvider.getFromSource();
        await initConfigStore();
        await initPlayListStore();
        await initFavoritesStore();
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
