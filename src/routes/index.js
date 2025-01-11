import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import Home from '../pages/Home';
import Financeiro from '../pages/Financeiro';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#121212', // Cor de fundo do tab bar
          height: 60, // Altura do tab bar
          borderTopColor: "transparent", // Remove a linha superior
        },
        tabBarActiveTintColor: '#ffffff', // Cor do ícone ativo
        tabStyle: {
            paddingBottom: 5, // Espaçamento interno
            paddinTop: 5, // Espaçamento interno     
        }
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Financeiro" component={Financeiro} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen 
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
        listeners={{
          focus: () => setIsLoggedIn(true), // Quando o usuário se autentica
        }}
      />

      <Stack.Screen 
        name="Home"
        component={isLoggedIn ? BottomTabs : Home}  // Condicional para Home com ou sem o BottomTab
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
