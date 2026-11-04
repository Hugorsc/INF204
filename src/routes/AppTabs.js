
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Configuracoes from "../screens/Configuracoes";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "#888888"
      }}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Ajustes" component={Configuracoes} />
    </Tab.Navigator>
  );
}
