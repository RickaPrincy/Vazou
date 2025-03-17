import { useCallback, useEffect, useRef } from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BackHandler, Dimensions, ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useSheetModal } from '@/stores';
import { sheetModalStyles } from './style';
import { usePalette } from '@/themes';

export const SheetModal = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { isOpen, close, containerStyle, content, panClose } = useSheetModal();
  const palette = usePalette();

  useEffect(() => {
    const onBackPress = () => {
      if (isOpen) {
        close();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );
    return () => subscription.remove();
  }, [isOpen]);

  useEffect(() => {
    isOpen
      ? bottomSheetModalRef.current?.present()
      : bottomSheetModalRef.current?.dismiss();
  }, [isOpen]);

  const height: ViewStyle = isOpen
    ? sheetModalStyles.fullHeight
    : { height: 0, display: 'none' };
  const handleSheetChanges = useCallback((index: number) => {
    if (index !== 0) close();
  }, []);

  const { height: screenHeight } = Dimensions.get('screen');

  return (
    <GestureHandlerRootView
      style={{ ...sheetModalStyles.container, ...height }}
    >
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          enableContentPanningGesture={panClose}
          enablePanDownToClose={panClose}
        >
          <BottomSheetView
            style={[
              {
                ...sheetModalStyles.contentContainer,
                minHeight: screenHeight * 0.5,
                backgroundColor: palette.background,
                ...containerStyle,
              },
            ]}
          >
            {content}
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
