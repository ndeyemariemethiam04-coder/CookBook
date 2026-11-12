import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { theme } = useTheme();

  const navTheme = {
    ...DefaultTheme,
    dark: theme.dark,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Recipe' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}