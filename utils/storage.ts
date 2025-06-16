import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

export const getStoredFavorites = async (): Promise<number[]> => {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Error reading favorites:', e);
    return [];
  }
};

export const storeFavorites = async (favorites: number[]) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Error storing favorites:', e);
  }
};