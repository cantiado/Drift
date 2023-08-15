import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StackActions } from '@react-navigation/native';

import theme from "./assets/theme";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import SavedScreen from "./screens/SavedScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import DriftHomeNavigation from "./screens/DriftHomeNavigation";
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
//import { getCurrentUserUID } from "./firebase/authentication";
//import HomeScreen from "./screens/HomeScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const AuthFlow = () => {
  return (
    <Stack.Navigator initalRouteName="Login">
            <Stack.Screen
              name = "Login"
              component = {LoginScreen}
            />
            <Stack.Screen
              name = "Signup"
              component = {SignupScreen}
            />
    </Stack.Navigator>
  );
};
// const AuthStack = createStackNavigator();

// function AuthFlow() {
//   return (
//     <AuthStack.Navigator>
//       <AuthStack.Screen 
//         name="Login" 
//         component={LoginScreen} 
//       />

//       <AuthStack.Screen 
//         name="SignIn"
//         component={SignupScreen}
//       />
//     </AuthStack.Navigator>
//   );
// }



//const Tab = createMaterialBottomTabNavigator();

export default function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // // Function to toggle authentication status (for example purposes)
  // const toggleAuthentication = () => {
  //   setIsAuthenticated((prev) => !prev);
  // };
  //userUID = getCurrentUserUID();

  // if (userUID === null) {
  //   return( 
  //     <PaperProvider>
  //       <SafeAreaProvider>
  //         <NavigationContainer>
  //           <Stack.Navigator initalRouteName="AuthFlow">
  //               <Stack.Screen
  //                 name = "AuthFlow"
  //                 component = {AuthFlow}
  //                 options={{headerShown: false}}
  //                 />
  //           </Stack.Navigator>
  //         </NavigationContainer>
  //       </SafeAreaProvider>
  //     </PaperProvider>
  //   );
  // }
  // else{
  //   return (
  //     <PaperProvider>
  //       <SafeAreaProvider>
  //         <NavigationContainer>
  //           <Stack.Navigator initalRouteName="DriftHomeNavigation">
  //               <Stack.Screen
  //                 name = "DriftHomeNavigation"
  //                 component = {DriftHomeNavigation}
  //                 options={ {headShown: false}}
  //               />
  //           </Stack.Navigator>
  //         </NavigationContainer>
  //       </SafeAreaProvider>
  //     </PaperProvider>
  //   );
  // };
  return (
    <PaperProvider>
       <SafeAreaProvider>
       <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
            <Stack.Navigator initalRouteName="AuthFlow" screenOptions={{
    headerShown: false
  }}>
                <Stack.Screen
                 name = "AuthFlow"
                 component = {AuthFlow}
                  options={{headerShown: false}}
                 />
                <Stack.Screen
                  name = "DriftHomeNavigation"
                  component = {DriftHomeNavigation}
                  options={ {headShown: false}}
               />
           </Stack.Navigator>
         </NavigationContainer>
           </GestureHandlerRootView>
    </SafeAreaProvider>
      </PaperProvider>
  );
}
