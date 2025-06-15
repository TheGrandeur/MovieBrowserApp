// screens/FavoritesScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';
import { getMovieById } from '../services/api'; // we’ll create this
import type { Movie } from '../types/navigation';

export default function FavoritesScreen() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  // Load favorites from AsyncStorage
  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await AsyncStorage.getItem('favorites');
      const ids = data ? JSON.parse(data) : [];
      setFavoriteIds(ids);

      const movieDetails = await Promise.all(
        ids.map((id: number) => getMovieById(id))
      );
      setFavoriteMovies(movieDetails);
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = async (id: number) => {
    const updatedIds = favoriteIds.includes(id)
      ? favoriteIds.filter((fid) => fid !== id)
      : [...favoriteIds, id];

    setFavoriteIds(updatedIds);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedIds));

    const updatedMovies = await Promise.all(
      updatedIds.map((fid) => getMovieById(fid))
    );
    setFavoriteMovies(updatedMovies);
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.image}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.overview.slice(0, 60)}...</Text>
      </View>

      <TouchableOpacity
        onPress={() => toggleFavorite(item.id)}
        style={styles.favoriteIcon}
      >
        <Ionicons
          name={favoriteIds.includes(item.id) ? 'heart' : 'heart-outline'}
          size={24}
          color={favoriteIds.includes(item.id) ? 'red' : isDark ? '#fff' : '#333'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {favoriteMovies.length === 0 ? (
        <Text style={styles.emptyText}>You have no favorites yet.</Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000' : '#fff',
      padding: 20
    },
    cardWrapper: {
      position: 'relative',
      flex: 1,
      maxWidth: '48%',
      margin: 5
    },
    card: {
      backgroundColor: isDark ? '#111' : '#fff',
      padding: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 3
    },
    image: {
      width: '100%',
      height: 180,
      borderRadius: 10,
      marginBottom: 10
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000'
    },
    description: {
      fontSize: 12,
      color: isDark ? '#ccc' : '#666'
    },
    favoriteIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 2,
      backgroundColor: 'rgba(0,0,0,0.4)',
      borderRadius: 20,
      padding: 4
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 18,
      color: isDark ? '#888' : '#444'
    }
  });