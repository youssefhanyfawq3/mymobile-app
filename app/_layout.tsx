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
        animation: 'fade', // Use fade animation for smoother transitions
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          contentStyle: {
            backgroundColor: '#1a202c',
          },
        }} 
      />
      <Stack.Screen
        name="Istighfar"
        options={{
          title: 'استغفار',
          headerShown: true,
          headerBackTitle: 'رجوع',
          contentStyle: {
            backgroundColor: '#1a202c',
          },
        }}
      />
    </Stack>
  );
}