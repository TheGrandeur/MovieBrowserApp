// screens/HomeScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme
} from 'react-native';
import { getPopularMovies, searchMovies } from '../services/api';
import type { Movie, RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const styles = getStyles(isDark);

  const fetchMovies = async (reset = false) => {
    const results = searchQuery
      ? await searchMovies(searchQuery)
      : await getPopularMovies(reset ? 1 : page);

    setMovies(reset ? results : [...movies, ...results]);
  };

  useEffect(() => {
    fetchMovies(true);
  }, [page]);

  useEffect(() => {
    AsyncStorage.getItem('favorites').then((data) => {
      if (data) {
        const ids: number[] = JSON.parse(data);
        setFavorites(ids);
      }
    });

    AsyncStorage.getItem('searchHistory').then((data) => {
      if (data) {
        setSearchHistory(JSON.parse(data));
      }
    });
  }, []);

  const toggleFavorite = async (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fid) => fid !== id)
      : [...favorites, id];
    setFavorites(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await searchMovies(searchQuery);
      setMovies(results);

      if (!searchHistory.includes(searchQuery)) {
        const updatedHistory = [searchQuery, ...searchHistory].slice(0, 5);
        setSearchHistory(updatedHistory);
        await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      }
    } else {
      const popular = await getPopularMovies(1);
      setMovies(popular);
    }
    setPage(1); // Reset pagination on search
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('MovieDetailScreen', { item })} // ✅ FIXED HERE
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.image}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.overview.slice(0, 60)}...</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => toggleFavorite(item.id)}
        style={styles.favoriteIcon}
      >
        <Ionicons
          name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
          size={24}
          color={favorites.includes(item.id) ? 'red' : isDark ? '#fff' : '#333'}
        />
      </TouchableOpacity>
    </View>
  );

  const handleEndReached = () => {
    if (!searchQuery) setPage((prev) => prev + 1);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search movies..."
          placeholderTextColor={isDark ? '#aaa' : '#555'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />

        {searchHistory.length > 0 && searchQuery.length === 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Recent Searches:</Text>
            {searchHistory.map((query, index) => (
              <TouchableOpacity key={index} onPress={() => { setSearchQuery(query); handleSearch(); }}>
                <Text style={styles.historyItem}>🔍 {query}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <FlatList
          data={movies}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000' : '#fff',
      padding: 20
    },
    searchBar: {
      backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0',
      color: isDark ? '#fff' : '#000',
      padding: 10,
      borderRadius: 8,
      marginBottom: 15
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
    historyContainer: {
      marginBottom: 10
    },
    historyTitle: {
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000'
    },
    historyItem: {
      color: isDark ? '#ccc' : '#444',
      marginVertical: 2
    },
    favoriteIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 2,
      backgroundColor: 'rgba(0,0,0,0.4)',
      borderRadius: 20,
      padding: 4
    }
  });