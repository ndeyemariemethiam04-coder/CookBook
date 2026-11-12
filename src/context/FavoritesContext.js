import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as db from '../database/db';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    db.getFavorites().then(setFavorites).catch((e) => console.warn('DB error', e));
  }, []);

  const ids = useMemo(() => new Set(favorites.map((f) => f.id)), [favorites]);
  const isFavorite = useCallback((id) => ids.has(id), [ids]);

  const toggleFavorite = useCallback(
    async (recipe) => {
      if (ids.has(recipe.id)) {
        await db.removeFavorite(recipe.id);
      } else {
        await db.addFavorite(recipe);
      }
      setFavorites(await db.getFavorites());
    },
    [ids]
  );

  const clearAll = useCallback(async () => {
    await db.clearFavorites();
    setFavorites([]);
  }, []);

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, clearAll }),
    [favorites, isFavorite, toggleFavorite, clearAll]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export const useFavorites = () => useContext(FavoritesContext);