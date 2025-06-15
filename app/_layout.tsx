import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'MovieHub | Made by Vaibhav Gupta | CSE + Blockchain Student | Open to contributions! Resources' }} />
      <Stack.Screen name="MovieDetailScreen" options={{ title: 'Movie Details' }} />
    </Stack>
  );
}