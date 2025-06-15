// App.js

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Movies' }}
        />
        <Stack.Screen
  name="MovieDetailScreen"
  component={MovieDetailScreen}
  options={{ title: 'Details' }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}