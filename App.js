import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import RootNavigator from './src/navigation/RootNavigator';

function ThemedStatusBar() {
  const { isDark } = useTheme();
  return <StatusBar style={isDark ? 'light' : 'dark'} />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <FavoritesProvider>
          <RootNavigator />
          <ThemedStatusBar />
        </FavoritesProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}