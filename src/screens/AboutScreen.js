import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function AboutScreen() {
  const { theme } = useTheme();
  const c = theme.colors;
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: c.background }}>
      <Text style={{ fontSize: 48, textAlign: 'center' }}>🍳</Text>
      <Text style={{ color: c.text, fontSize: 24, fontWeight: '800', textAlign: 'center', marginVertical: 8 }}>
        CookBook v1.0
      </Text>
      <Text style={{ color: c.subtext, textAlign: 'center', lineHeight: 22 }}>
        A cooking recipes app built with React Native & Expo.{'\n'}
        Recipes provided by TheMealDB (themealdb.com).{'\n\n'}
        Made by: NDEYE MARIEME THIAM
      </Text>
    </View>
  );
}