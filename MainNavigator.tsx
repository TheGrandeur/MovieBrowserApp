// MainNavigator.tsx
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  RouteProp,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useThemeContext } from './context/ThemeContext';
import FavoritesScreen from './screens/FavoritesScreen';
import HomeScreen from './screens/HomeScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import { RootStackParamList } from './types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  const { theme } = useThemeContext();
  const navTheme = theme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: '🎬 Movie Browser',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Favorites')}
                style={{ marginRight: 16 }}
              >
                <Text style={{ color: 'skyblue', fontSize: 16 }}>❤️ Favorites</Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: '❤️ My Favorites' }}
        />

        <Stack.Screen
          name="MovieDetailScreen"
          component={MovieDetailScreen}
          options={({
            route,
          }: {
            route: RouteProp<RootStackParamList, 'MovieDetailScreen'>; // ✅ updated route type
          }) => ({
            title: route.params?.item?.title ?? 'Movie Detail',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}