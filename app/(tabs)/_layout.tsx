import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import { usePalette } from '@/themes';
import { Header } from '@/components/header';
import { useEffect } from 'react';

const TabLayout = () => {
  const palette = usePalette();

  useEffect(() => {
    (async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 65,
            marginLeft: 8,
            marginRight: 8,
            borderRadius: 20,
            marginBottom: 8,
            backgroundColor: palette.card,
            borderColor: palette.card,
          },
          tabBarIconStyle: { marginTop: 5 },
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: palette.secondary,
          header: props => <Header {...props} />,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlist/index"
          options={{
            title: 'PlayList',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Feather name="list" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Feather name="search" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Feather name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabLayout;
