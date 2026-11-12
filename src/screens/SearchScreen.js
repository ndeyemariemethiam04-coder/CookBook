import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { searchRecipes } from '../api/mealApi';
import useDebounce from '../hooks/useDebounce';
import { useTheme } from '../context/ThemeContext';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';

export default function SearchScreen({ navigation }) {
  const { theme } = useTheme();
  const c = theme.colors;
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 400);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!debounced.trim()) {
      setResults([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchRecipes(debounced.trim());
        if (!cancelled) setResults(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [debounced]);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <TextInput
        style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.border }]}
        placeholder="Search a recipe (e.g. pasta, chicken)…"
        placeholderTextColor={c.subtext}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Text style={{ color: c.text, textAlign: 'center' }}>😕 {error}</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeCard recipe={item} onPress={() => navigation.navigate('RecipeDetail', { id: item.id })} />
          )}
          ListEmptyComponent={
            <Text style={{ color: c.subtext, textAlign: 'center', marginTop: 40 }}>
              {debounced ? 'No recipe found' : 'Type something to search 🔎'}
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 14 },
});