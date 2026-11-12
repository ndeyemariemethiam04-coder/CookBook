import React, { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getCategories, getRandomRecipe, getRecipes } from '../api/mealApi';
import useFetch from '../hooks/useFetch';
import { useTheme } from '../context/ThemeContext';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import ErrorView from '../components/ErrorView';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const c = theme.colors;
  const [selected, setSelected] = useState('All');

  const categories = useFetch(getCategories, []);
  const recipes = useFetch(() => getRecipes(selected), [selected]);
  const chips = ['All', ...(categories.data ?? [])];

  const surprise = async () => {
    try {
      const r = await getRandomRecipe();
      navigation.navigate('RecipeDetail', { id: r.id });
    } catch (e) {
      console.warn(e);
    }
  };

  const header = (
    <View>
      <Pressable onPress={surprise} style={[styles.surprise, { backgroundColor: c.primary }]}>
        <Text style={styles.surpriseText}>🎲 Surprise me with a random recipe</Text>
      </Pressable>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
        {chips.map((cat) => {
          const active = cat === selected;
          return (
            <Pressable
              key={cat}
              onPress={() => setSelected(cat)}
              style={[
                styles.chip,
                { backgroundColor: active ? c.primary : c.card, borderColor: active ? c.primary : c.border },
              ]}
            >
              <Text style={{ color: active ? '#fff' : c.text, fontWeight: '600' }}>{cat}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {recipes.loading && !recipes.data ? (
        <Loader />
      ) : recipes.error ? (
        <ErrorView message={recipes.error} onRetry={recipes.reload} />
      ) : (
        <FlatList
          data={recipes.data}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={header}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <RecipeCard recipe={item} onPress={() => navigation.navigate('RecipeDetail', { id: item.id })} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  surprise: { padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 14 },
  surpriseText: { color: '#fff', fontWeight: '700' },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, marginRight: 8 },
});