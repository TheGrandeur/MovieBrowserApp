import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Movies' }} />
      <Stack.Screen name="MovieDetailScreen" options={{ title: 'Movie Details' }} />
    </Stack>
  );
}