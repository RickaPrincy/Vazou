import {} from '@react-navigation/native';
import { createPersistedStore } from './utils';

export type Theme = 'light' | 'dark';
export type ConfigStore = {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const CONFIG_STORE_NAME = 'CONFIG-STORE';
export const useConfigStore = createPersistedStore<ConfigStore>({
  name: CONFIG_STORE_NAME,
  state: (set, get) => ({
    theme: null,
    toggleTheme: () => {
      set({ theme: get().theme === 'dark' ? 'light' : 'dark' });
    },
    setTheme: theme => set({ theme }),
  }),
});
