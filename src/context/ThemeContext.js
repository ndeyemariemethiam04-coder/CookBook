import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '../theme/colors';

const ThemeContext = createContext(null);
const KEY = 'app_theme';

export function ThemeProvider({ children }) {
  const system = useColorScheme();
  const [isDark, setIsDark] = useState(system === 'dark');
  const [ready, setReady] = useState(false);

  // Load the saved preference
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(KEY);
        if (saved !== null) setIsDark(saved === 'dark');
      } catch (e) {
        console.warn('Theme load error', e);
      }
      setReady(true);
    })();
  }, []);

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    try {
      await AsyncStorage.setItem(KEY, next ? 'dark' : 'light');
    } catch (e) {
      console.warn('Theme save error', e);
    }
  };

  const value = useMemo(
    () => ({ isDark, theme: isDark ? darkTheme : lightTheme, toggleTheme }),
    [isDark]
  );

  if (!ready) return null;
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);