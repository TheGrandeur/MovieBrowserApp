// App.js
import { ThemeProvider } from './context/useThemeContext'; // ✅ make sure this path is correct
import MainNavigator from './MainNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <MainNavigator />
    </ThemeProvider>
  );
}