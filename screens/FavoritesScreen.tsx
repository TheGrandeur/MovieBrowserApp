// screens/FavoritesScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, useColorScheme } from 'react-native';
import MovieCard from '../components/MovieCard';
import { getMovieDetailsById } from '../services/api';
import { Movie } from '../types/navigation';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const ids = await AsyncStorage.getItem('favorites');
        if (ids) {
          const parsed: number[] = JSON.parse(ids);
          const movieObjs: Movie[] = await Promise.all(parsed.map(id => getMovieDetailsById(id)));
          setFavorites(movieObjs.filter(Boolean));
        }
      } catch (err) {
        console.error('Error loading favorites:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  if (loading) {
    return <View style={[styles.center, { backgroundColor: isDark ? '#000' : '#fff' }]}><ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} /></View>;
  }

  if (favorites.length === 0) {
    return <View style={[styles.center, { backgroundColor: isDark ? '#000' : '#fff' }]}><Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>No favorites yet 💔</Text></View>;
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MovieCard movie={item} />}
      contentContainerStyle={[styles.list, { backgroundColor: isDark ? '#000' : '#fff' }]}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
  list: { padding: 10 }
});
