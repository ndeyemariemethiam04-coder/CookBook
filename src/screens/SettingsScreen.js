import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { confirmDialog } from '../utils/dialog';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { favorites, clearAll } = useFavorites();
  const c = theme.colors;

  const confirmClear = () =>
    confirmDialog('Clear favorites', 'Delete all saved recipes?', 'Delete', clearAll);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={[styles.card, styles.row, { backgroundColor: c.card, borderColor: c.border }]}>
        <Text style={{ color: c.text, fontSize: 16 }}>Dark mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} trackColor={{ true: c.primary }} />
      </View>

      <Pressable onPress={confirmClear} style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
        <Text style={{ color: '#D64545', fontSize: 16, fontWeight: '600' }}>
          Clear all favorites ({favorites.length})
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});