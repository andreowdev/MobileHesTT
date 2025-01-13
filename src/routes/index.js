import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import Home from '../pages/Home';
import Products from '../pages/Products';
import Financeiro from '../pages/Financier';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

// Criando o Stack e Tab Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#121212', // Cor de fundo do tab bar
          height: 60, // Altura do tab bar
          borderTopColor: 'transparent', // Remove a linha superior
        },
        tabBarActiveTintColor: '#ffffff', // Cor do ícone ativo
        tabStyle: {
          paddingBottom: 5, // Espaçamento interno
          paddingTop: 5, // Espaçamento interno
        },
      }}
    >
      <Tab.Screen
        name="Menu Inicial"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Financeiro"
        component={Financeiro}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="finance" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
      name="Produtos"
      component={Products}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="cart" size={size} color={color} />
        ),
      }}/>
    </Tab.Navigator>
  );
}

export default function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator>
      {/* Tela Welcome */}
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      
      { <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
        listeners={{
          focus: () => setIsLoggedIn(true), // Quando o usuário se autentica
        }}
      /> }

      {/* Condicional para mostrar o BottomTabs quando logado */}
      <Stack.Screen
        name="Home"
        component={isLoggedIn ? BottomTabs : Home}  // Usando BottomTabs se logado
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
