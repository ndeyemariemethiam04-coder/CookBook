import React from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import { useTheme } from '../context/ThemeContext';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, marginBottom: 8 }}>
        <Text style={{ fontSize: 40 }}>👨‍🍳</Text>
        <Text style={{ color: c.text, fontSize: 18, fontWeight: '700' }}>Welcome to CookBook</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  const { theme } = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text,
        drawerStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Drawer.Screen
        name="Recipes"
        component={TabNavigator}
        options={{ title: 'CookBook', drawerIcon: ({ color, size }) => <Ionicons name="restaurant-outline" size={size} color={color} /> }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} /> }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} /> }}
      />
    </Drawer.Navigator>
  );
}