import { FC, useState } from 'react';
import { Image, ImageStyle, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { FlexView } from './flex-view';
import { usePalette, useReversePalette } from '@/themes';

type ImageArtWorkProps = {
  uri?: string;
  size?: number;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
};

export const ImageArtWork: FC<ImageArtWorkProps> = ({
  uri,
  size = 50,
  style,
  imageStyle,
}) => {
  const [error, setError] = useState(false);
  const palette = usePalette();
  const reversePalette = useReversePalette();

  if (error || !uri) {
    return (
      <FlexView
        style={{
          borderRadius: 8,
          padding: size * 0.2,
          backgroundColor: reversePalette.background,
          width: size,
          height: size,
          justifyContent: 'center',
          alignItems: 'center',
          ...style,
        }}
      >
        <Feather
          name="music"
          color={palette.primary}
          style={{ fontSize: size * 0.5 }}
        />
      </FlexView>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={[
        {
          width: size,
          height: size,
          borderRadius: 8,
        },
        imageStyle,
      ]}
      onError={() => setError(true)}
    />
  );
};
