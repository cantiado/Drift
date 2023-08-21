import * as React from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import MessagesScreen from "../screens/SavedScreen";
import ItemUploadScreen from "../screens/ItemUploadScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeTabNavStack = ({navigation}) => {
    const Tab = createMaterialBottomTabNavigator();
    return (
        <PaperProvider>
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
              name="Item Upload"
              component={ItemUploadScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon
                    name="plus"
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
          </Tab.Navigator>
        </PaperProvider>
    );
  };
  
  export default HomeTabNavStack;