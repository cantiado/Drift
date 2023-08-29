import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import ThemeContext, { theme } from "./assets/theme";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import DriftNavigation from "./components/Navigation";
import React, { createContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();
const AuthFlow = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [loaded] = useFonts({
    "CherryBombOne-Regular": require("./assets/fonts/CherryBombOne-Regular.ttf"),
  });
  if (!loaded) return null;
  return (
    <ThemeContext.Provider value={theme}>
      <PaperProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="AuthFlow"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="AuthFlow"
                  component={AuthFlow}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DriftNavigation"
                  component={DriftNavigation}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
