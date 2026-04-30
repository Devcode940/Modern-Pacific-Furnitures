// Powered by OnSpace.AI
import { Stack } from 'expo-router';
import { WishlistProvider } from '@/contexts/MarketContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <WishlistProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="product/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
        </Stack>
      </WishlistProvider>
    </SafeAreaProvider>
  );
}
