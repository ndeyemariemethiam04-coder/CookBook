import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ErrorView({ message, onRetry }) {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ color: theme.colors.text, fontSize: 16, textAlign: 'center', marginBottom: 12 }}>
        😕 {message}
      </Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          style={{ backgroundColor: theme.colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Try again</Text>
        </Pressable>
      )}
    </View>
  );
}