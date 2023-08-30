import * as React from "react";
import {StyleSheet} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import UploadScreen from "../screens/ItemUploadScreen";
import ProductScreen from "../screens/ProductScreen";
import LoginScreen from "../screens/LoginScreen";
import CartScreen from "../screens/CartScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { IconButton } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ThemeContext from "../assets/theme";
import MyProfileScreen from "../screens/MyProfileScreen";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AppNavStack = ({ navigation }) => {
  const theme = useContext(ThemeContext);
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
          options={{
            headerRight: () => <IconButton icon="pen" size={20} />,
          }}
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
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationEnabled={true}
      barStyle={{
        backgroundColor: theme.colors.green,
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
              size={theme.navigationIcons.size}
              color={theme.colors.white}
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
              size={theme.navigationIcons.size}
              color={theme.colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarIcon: () => (
            <Icon
              name="star"
              size={theme.navigationIcons.size}
              color={theme.colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MyProfileScreen}
        options={{
          tabBarIcon: () => (
            <Icon
              name="user"
              size={theme.navigationIcons.size}
              color={theme.colors.white}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavStack;
