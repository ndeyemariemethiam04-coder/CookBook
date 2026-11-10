# 🍳 CookBook – Recipes Mobile App

A React Native (Expo) mobile app to discover, search and save cooking recipes.

## Features
- Login with session saved in **SecureStore**
- Browse recipes by category, random recipe, search with debounce
- Recipe details (ingredients + instructions)
- Favorites stored locally with **SQLite**
- Dark / Light theme saved with **AsyncStorage**
- **Drawer** (Recipes, Settings, About, Logout) + **Bottom Tabs** (Home, Search, Favorites)

## Tech Stack
React Native, Expo, React Navigation (Drawer, Tabs, Native Stack), Context API,
expo-sqlite, expo-secure-store, AsyncStorage, TheMealDB REST API

## Concepts used
| Concept | Where |
|---|---|
| Context API | ThemeContext, AuthContext, FavoritesContext |
| Hooks | useState, useEffect, useCallback, useMemo, useFetch, useDebounce |
| Backend API | src/api/mealApi.js (TheMealDB) |
| SQLite | src/database/db.js |
| Key-value storage | ThemeContext (AsyncStorage) |
| Secure storage | AuthContext (SecureStore) |

## Installation
git clone https://github.com/YOUR_USERNAME/CookBook.git
cd CookBook
npm install
npx expo start

## Screenshots
(add screenshots of Login, Home, Details, Favorites, Dark mode, Drawer)

## Author
YOUR NAME – Class / Year# CookBook
