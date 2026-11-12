import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

const icons = {
  Home: ['home', 'home-outline'],
  Search: ['search', 'search-outline'],
  Favorites: ['heart', 'heart-outline'],
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // the Drawer already shows the header
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={icons[route.name][focused ? 0 : 1]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}