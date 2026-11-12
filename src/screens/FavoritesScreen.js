import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import RecipeCard from '../components/RecipeCard';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={() => navigation.navigate('RecipeDetail', { id: item.id })} />
        )}
        ListEmptyComponent={
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 48 }}>💔</Text>
            <Text style={{ color: c.subtext, marginTop: 8 }}>No favorites yet. Tap the heart on a recipe!</Text>
          </View>
        }
      />
    </View>
  );
}