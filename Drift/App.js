import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StackActions } from '@react-navigation/native';

import theme from "./assets/theme";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import DriftHomeNavigation from "./screens/DriftHomeNavigation";
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getCurrentUserUID } from "./firebase/authentication";

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
  userUID = getCurrentUserUID();





  

  return (
    <PaperProvider>
    <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initalRouteName="AuthFlow">
            (userUID === null) ? (
              <>
                <Stack.Screen
                  name = "AuthFlow"
                  component = {AuthFlow}
                  options={{headerShown: false}}
                  />
              </>

            ) : (
              <>
                <Stack.Screen
                  name = "DriftHomeNavigation"
                  component = {DriftHomeNavigation}
                  options={ {headShown: false}}
                />
              </>
            );
           
            
          </Stack.Navigator>
          {/* <Stack.Navigator initalRouteName="Login">
            <Stack.Screen
              name = "Login"
              component = {LoginScreen}
            />

            <Stack.Screen
              name = "Signup"
              component = {SignupScreen}
            />
          </Stack.Navigator> */}
          {/* <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon
                    name="home"
                    //size={size} color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Saved"
              component={SavedScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon
                    name="star"
                    //size={size} color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Messages"
              component={MessagesScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon
                    name="envelope"
                    size={size} color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon
                    name="user"
                    size={size} color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Login"
              component={LoginScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon
                    name="user"
                    size={size} color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon
                    name="user"
                    size={size} color={color}
                  />
                ),
              }}
            />
          </Tab.Navigator> */}
        </NavigationContainer>
    </SafeAreaProvider>
    </PaperProvider>

  );
}
