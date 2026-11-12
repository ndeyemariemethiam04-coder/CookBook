import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';

export default function RecipeCard({ recipe, onPress }) {
  const { theme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(recipe.id);
  const c = theme.colors;

  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
      <View style={[styles.thumb, { backgroundColor: c.background }]}>
        <Text style={styles.emoji}>{recipe.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text numberOfLines={2} style={[styles.title, { color: c.text }]}>{recipe.name}</Text>
        <Text style={{ color: c.subtext, marginTop: 4 }}>
          {recipe.category}{recipe.area ? ` • ${recipe.area}` : ''}
        </Text>
      </View>
      <Pressable onPress={() => toggleFavorite(recipe)} hitSlop={10} style={styles.heart}>
        <Ionicons name={fav ? 'heart' : 'heart-outline'} size={26} color={c.primary} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 14, marginBottom: 12, overflow: 'hidden' },
  thumb: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 40 },
  info: { flex: 1, padding: 12 },
  title: { fontSize: 16, fontWeight: '700' },
  heart: { paddingHorizontal: 14 },
});