import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getRecipeById } from '../api/mealApi';
import useFetch from '../hooks/useFetch';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import Loader from '../components/Loader';
import ErrorView from '../components/ErrorView';

export default function RecipeDetailScreen({ route }) {
  const { id } = route.params;
  const { theme } = useTheme();
  const c = theme.colors;
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: recipe, loading, error, reload } = useFetch(() => getRecipeById(id), [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorView message={error} onRetry={reload} />;
  if (!recipe) return <ErrorView message="Recipe not found" />;

  const fav = isFavorite(recipe.id);

  return (
    <ScrollView style={{ backgroundColor: c.background }} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={[styles.hero, { backgroundColor: c.card }]}>
        <Text style={{ fontSize: 90 }}>{recipe.emoji}</Text>
      </View>

      <View style={{ padding: 16 }}>
        <View style={styles.row}>
          <Text style={[styles.title, { color: c.text }]}>{recipe.name}</Text>
          <Pressable
            onPress={() =>
              toggleFavorite({
                id: recipe.id,
                name: recipe.name,
                emoji: recipe.emoji,
                category: recipe.category,
                area: recipe.area,
              })
            }
            hitSlop={10}
          >
            <Ionicons name={fav ? 'heart' : 'heart-outline'} size={32} color={c.primary} />
          </Pressable>
        </View>

        <Text style={{ color: c.subtext, marginBottom: 6 }}>{recipe.category} • {recipe.area}</Text>
        <Text style={{ color: c.text, marginBottom: 20 }}>
          ⏱ {recipe.time}   👥 {recipe.servings} servings
        </Text>

        <Text style={[styles.section, { color: c.primary }]}>Ingredients</Text>
        {recipe.ingredients.map((ing, i) => (
          <Text key={i} style={{ color: c.text, marginBottom: 4, fontSize: 15 }}>• {ing}</Text>
        ))}

        <Text style={[styles.section, { color: c.primary, marginTop: 20 }]}>Instructions</Text>
        {recipe.steps.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={[styles.badge, { backgroundColor: c.primary }]}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>{i + 1}</Text>
            </View>
            <Text style={{ color: c.text, flex: 1, lineHeight: 22, fontSize: 15 }}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 24, fontWeight: '800', flex: 1, marginRight: 10 },
  section: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 10 },
  badge: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
});