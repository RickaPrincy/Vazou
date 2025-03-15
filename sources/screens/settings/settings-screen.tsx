import { Switch, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Screen } from '@/components';
import { SettingsItem, SettingsSection } from './components';
import { useTheme, usePalette } from '@/themes';
import { useConfigStore } from '@/stores';
import { NOOP_FN } from '@/utils/noop-fn';

export const SettingsScreen = () => {
  const palette = usePalette();
  const theme = useTheme();
  const toggleTheme = useConfigStore(state => state.toggleTheme);

  return (
    <Screen>
      <ScrollView>
        <SettingsSection title="Appearance">
          <SettingsItem
            icon={<Feather name="moon" size={24} color={palette.primary} />}
            title="Dark Mode"
            right={
              <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: palette.border, true: palette.primary }}
                thumbColor={palette.background}
              />
            }
          />
        </SettingsSection>
        <SettingsSection title="Notifications">
          <SettingsItem
            icon={<Feather name="bell" size={24} color={palette.primary} />}
            title="Push Notifications"
            right={
              <Switch
                value={true}
                onValueChange={NOOP_FN}
                trackColor={{ false: palette.border, true: palette.primary }}
                thumbColor={palette.background}
              />
            }
          />
        </SettingsSection>
        <SettingsSection title="Others">
          <SettingsItem
            icon={<Feather name="music" size={24} color={palette.primary} />}
            title="Music Types"
          />
          <SettingsItem
            icon={<Feather name="eye" size={24} color={palette.primary} />}
            title="Eye config"
          />
        </SettingsSection>
      </ScrollView>
    </Screen>
  );
};
