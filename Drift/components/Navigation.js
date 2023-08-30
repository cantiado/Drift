import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {View, Text } from "react-native";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import UploadScreen from "../screens/ItemUploadScreen";
import ProductScreen from "../screens/ProductScreen";
import LoginScreen from "../screens/LoginScreen";
import CartScreen from "../screens/CartScreen";
import { logOut } from "../firebase/authentication";
import Icon from "react-native-vector-icons/FontAwesome";
import { IconButton } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ThemeContext from "../assets/theme";
import MyProfileScreen from "../screens/MyProfileScreen";
import SellerProfileScreen from "../screens/SellerProfileScreen";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AppNavStack = ({ navigation }) => {
  const appTheme = useContext(ThemeContext);
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
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
        />
        <Stack.Screen
          name="Seller"
          component={SellerProfileScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
};

const HomeTabNavStack = ({ navigation }) => {
  const appTheme = useContext(ThemeContext);
  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationEnabled={true}
      activeBackgroundColor={appTheme.colors.brown}
      barStyle={{
        backgroundColor: appTheme.colors.green,
        position: "absolute",
        borderTopWidth: 0,
        overflow: "hidden",
        elevation: 1,
        paddingBottom: 5, // Or any desired height
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Icon
              name="home"
              size={appTheme.navigationIcons.size}
              color={appTheme.colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          tabBarIcon: () => (
            <Icon
              name="plus"
              size={appTheme.navigationIcons.size}
              color={appTheme.colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={({ navigation }) => ({
          tabBarIcon: () => (
            <Icon
              name="star"
              size={appTheme.navigationIcons.size}
              color={appTheme.colors.white}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={MyProfileScreen}
        options={({ navigation }) => ({
          tabBarIcon: () => (
            <Icon
              name="user"
              size={appTheme.navigationIcons.size}
              color={appTheme.colors.white}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppNavStack;
