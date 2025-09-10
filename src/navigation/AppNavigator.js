import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MenuScreen from "../screens/MenuScreen";
import IngredientScreen from "../screens/IngredientScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Ingredients" component={IngredientScreen} />
    </Stack.Navigator>
  );
}