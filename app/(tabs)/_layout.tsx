import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { usePalette } from '@/themes';

const TabLayout = () => {
  const palette = usePalette();

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            marginBottom: 10,
            marginLeft: 6,
            marginRight: 5,
            height: 60,
            borderRadius: 35,
            backgroundColor: palette.card,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 5,
            borderColor: palette.card,
          },
          headerShown: false,
          tabBarIconStyle: { marginTop: 10 },
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: palette.secondary,
        }}
      >
        <Tabs.Screen
          name="library"
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <Feather name="list" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <Feather name="search" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: '',
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 65,
                  height: 65,
                  backgroundColor: focused
                    ? palette.primary
                    : palette.secondary,
                  borderRadius: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 4 },
                  marginBottom: 20,
                }}
              >
                <Feather name="home" size={25} color="#fff" />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="url"
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <Feather name="bell" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <Feather name="settings" size={22} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabLayout;
