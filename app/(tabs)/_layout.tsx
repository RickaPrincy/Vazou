import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { usePalette } from '@/themes';
import { Header } from '@/components/header';

export default function TabLayout() {
  const palette = usePalette();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 55,
            backgroundColor: palette.background,
            borderColor: palette.border,
          },
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
}
