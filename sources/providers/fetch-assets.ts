import { getAssetsAsync } from 'expo-music-library';

export const fetchAssets = async () => {
  let assets: any[] = [];
  let hasNextPage = true;
  let after = undefined;
  const pageSize = 100;

  while (hasNextPage && assets.length < 120) {
    const audios = await getAssetsAsync({ first: pageSize, after });
    assets = [...assets, ...audios.assets];

    hasNextPage = audios.hasNextPage;
    after = audios.assets[audios.assets.length - 1]?.id;
  }

  return assets;
};
