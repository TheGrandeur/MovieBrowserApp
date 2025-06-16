// MainNavigator.tsx
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';

import FavoritesScreen from './screens/FavoritesScreen';
import HomeScreen from './screens/HomeScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import type { RootStackParamList } from './types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: '🎬 MovieHub',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Favorites')}
                style={{ marginRight: 16 }}
              >
                <Text style={{ color: 'skyblue', fontWeight: 'bold' }}>❤️ Favorites</Text>
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
          options={({ route }) => ({
            title: route.params?.item?.title ?? 'Movie Details',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}