import { View } from 'react-native';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            paddingVertical: 15,
          },
          headerShown: false,
          tabBarActiveTintColor: '#6B3FA0',
          tabBarInactiveTintColor: '#888',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
