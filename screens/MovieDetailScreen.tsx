import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../types/navigation';

type Props = StackScreenProps<RootStackParamList, 'MovieDetailScreen'>;

export default function MovieDetailScreen({ route }: Props) {
  const { item } = route.params;

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>No movie data available</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.title}</Text>
      {item.vote_average && (
        <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)} / 10</Text>
      )}
      {item.release_date && (
        <Text style={styles.meta}>📅 Released: {item.release_date}</Text>
      )}
      {item.genres && item.genres.length > 0 && (
        <Text style={styles.meta}>
          🎭 Genres: {item.genres.map((g: { id: number; name: string }) => g.name).join(', ')}
        </Text>
      )}
      <Text style={styles.overview}>{item.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000',
    flexGrow: 1,
  },
  poster: {
    width: '100%',
    height: 350,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  rating: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 6,
  },
  meta: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 6,
  },
  overview: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 10,
    lineHeight: 22,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});