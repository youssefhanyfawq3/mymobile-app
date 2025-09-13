import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Inter-Black': require('../assets/fonts/Inter-Black.otf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a202c',
        },
        headerTintColor: '#38a169',
        contentStyle: {
          backgroundColor: '#1a202c',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerBackTitleStyle: {
          fontSize: 16,
        },
        headerShadowVisible: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen
        name="Istighfar"
        options={{
          title: '',
          headerShown: true,
          headerBackTitle: 'رجوع',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'الإعدادات',
          headerShown: true,
          headerBackTitle: 'رجوع',
        }}
      />
      <Stack.Screen
        name="statistics"
        options={{
          title: '',
          headerShown: true,
          headerBackTitle: 'رجوع',
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: '',
          headerShown: true,
          headerBackTitle: 'رجوع',
        }}
      />
    </Stack>
  );
}