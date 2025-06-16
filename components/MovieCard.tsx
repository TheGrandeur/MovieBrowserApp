// components/MovieCard.tsx
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Movie } from '../types/navigation';

interface Props {
  movie: Movie;
  onPress?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function MovieCard({ movie, onPress, isFavorite, onToggleFavorite }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text numberOfLines={2} style={styles.overview}>{movie.overview}</Text>
      </View>
      {onToggleFavorite && (
        <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteIcon}>
          <Text style={{ fontSize: 20 }}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 6,
    backgroundColor: '#222',
    borderRadius: 10,
    alignItems: 'center',
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overview: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  favoriteIcon: {
    marginLeft: 10,
  },
});