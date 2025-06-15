// screens/MovieDetailScreen.tsx
import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../types/navigation';

type Props = StackScreenProps<RootStackParamList, 'MovieDetailScreen'>;

export default function MovieDetailScreen({ route }: Props) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.overview}>{item.overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  poster: { width: '100%', height: 300, borderRadius: 8, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  overview: { fontSize: 16, lineHeight: 22 },
});