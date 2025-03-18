import { Switch, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ColorPicker, { Swatches, Preview } from 'reanimated-color-picker';
import { runOnJS } from 'react-native-reanimated';

import { FlexView, Screen, ThemedText } from '@/components';
import { SettingsItem, SettingsSection } from './components';
import { useTheme, usePalette } from '@/themes';
import { useConfigStore, useSheetModal } from '@/stores';
import { NOOP_FN } from '@/utils/noop-fn';

export const SettingsScreen = () => {
  const palette = usePalette();
  const theme = useTheme();
  const toggleTheme = useConfigStore(state => state.toggleTheme);
  const setMainColor = useConfigStore(state => state.setMainColor);
  const openSheetModal = useSheetModal(state => state.open);

  const onSelectColor = ({ hex }: { hex: string }) => {
    'worklet';
    runOnJS(() => setMainColor(hex))();
  };

  const openColorPicker = () =>
    openSheetModal(
      <>
        <FlexView style={{ justifyContent: 'space-between' }}>
          <ThemedText
            style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}
          >
            Pick your favourite color
          </ThemedText>
        </FlexView>
        <ColorPicker
          style={{ flex: 1 }}
          value={palette.primary}
          onComplete={onSelectColor}
        >
          <Preview hideText style={{ marginTop: 20, marginBottom: 20 }} />
          <Swatches
            colors={[
              '#4287f5',
              '#64a360',
              '#8f3960',
              '#d17341',
              '#becf40',
              '#ae42bd',
              '#db2c46',
            ]}
          />
        </ColorPicker>
      </>,
      { containerStyle: { height: 300, maxHeight: 300, minHeight: 300 } }
    );

  return (
    <Screen>
      <ScrollView>
        <ThemedText
          style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}
        >
          Settings
        </ThemedText>
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
            icon={
              <Feather name="check-square" size={24} color={palette.primary} />
            }
            onPress={openColorPicker}
            title="Application Color"
          />
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
