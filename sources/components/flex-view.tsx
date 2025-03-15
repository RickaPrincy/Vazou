import { FC } from 'react';
import { View, ViewProps } from 'react-native';

export const FlexView: FC<ViewProps> = ({ children, style = {}, ...props }) => (
  <View
    {...props}
    style={[
      {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      style,
    ]}
  >
    {children}
  </View>
);
