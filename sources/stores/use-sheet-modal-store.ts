import { create } from 'zustand';
import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type SheetModalState = {
  content: ReactNode;
  isOpen: boolean;
  containerStyle: ViewStyle;
  panClose: boolean;
};

export type SheetModalOptions = {
  containerStyle?: ViewStyle;
  panClose?: boolean;
};

export type SheetModalAction = {
  open: (content: ReactNode, options?: SheetModalOptions) => void;
  close: () => void;
};

export type TSheetModalStore = SheetModalState & SheetModalAction;

export const useSheetModal = create<TSheetModalStore>()(set => ({
  isOpen: false,
  content: null,
  containerStyle: {},
  panClose: true,
  close() {
    set({ isOpen: false, content: null });
  },
  open(content, options) {
    set({
      isOpen: true,
      content,
      containerStyle: options?.containerStyle || {},
      panClose: options?.panClose !== false,
    });
  },
}));
