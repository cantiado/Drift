import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "./assets/theme";
import HomeScreen from "./screens/HomeScreen";
import SavedScreen from "./screens/SavedScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const AuthStack = createStackNavigator();

function AuthFlow() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignIn" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Saved"
            component={SavedScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="star" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Messages"
            component={MessagesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="mdiEmailOutline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="account" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
