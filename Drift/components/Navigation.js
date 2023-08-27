import * as React from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import UploadScreen from "../screens/ItemUploadScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductScreen from "../screens/ProductScreen";
import LoginScreen from "../screens/LoginScreen";
import CartScreen from "../screens/CartScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { IconButton} from "react-native-paper";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AppNavStack =  ({ navigation }) => {
  return (
    <PaperProvider>
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Screen
          name="HomeTabNavStack"
          component={HomeTabNavStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Product" 
          component={ProductScreen} 
          options={{
            headerRight: () => (
              <IconButton
                icon="basket"
                size={20}
                onPress={() => {navigation.navigate('Cart')}}
              />
            ),
          }}
        />
        <Stack.Screen name="Cart" component={CartScreen} options={{
            headerRight: () => (
              <IconButton
                icon="pen"
                size={20}
                onPress={() => {navigation.navigate('Cart')}}
              />
            ),
          }}/>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </PaperProvider>
  );
}

const HomeTabNavStack = ({navigation}) => {
    return (
        <Tab.Navigator initialRouteName="Home">
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
              name="Upload"
              component={UploadScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon
                    name="plus"
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
          </Tab.Navigator>
    );
  };
  
  export default AppNavStack;