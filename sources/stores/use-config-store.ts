import debounce from 'debounce';

import { CLICK_BUTTON_DEBOUNCE_MS } from '@/utils/debounce';
import { createPersistedStore } from './utils';

export type Theme = 'light' | 'dark';
export type User = {
  avatarUri: any;
  firstName: string;
  lastName: string;
};

export type ConfigStore = {
  theme: Theme | null;
  mainColor: string | null;
  user: User;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setMainColor: (color: string) => void;
};

export const CONFIG_STORE_NAME = 'CONFIG-STORE';
export const useConfigStore = createPersistedStore<ConfigStore>({
  name: CONFIG_STORE_NAME,
  state: (set, get) => ({
    theme: null,
    mainColor: null,
    toggleTheme: () => {
      set({ theme: get().theme === 'dark' ? 'light' : 'dark' });
    },
    setTheme: debounce(theme => set({ theme }), CLICK_BUTTON_DEBOUNCE_MS),
    setMainColor: debounce(
      mainColor => set({ mainColor }),
      CLICK_BUTTON_DEBOUNCE_MS
    ),
    user: {
      avatarUri: require('../assets/images/default-image.jpg'),
      lastName: 'John Doe',
      firstName: 'Villa billy',
    },
  }),
});
