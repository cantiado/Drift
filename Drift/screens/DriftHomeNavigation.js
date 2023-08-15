import * as React from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import HomeScreen from "./HomeScreen";
import SavedScreen from "./SavedScreen";
import MessagesScreen from "./SavedScreen";
import ProfileScreen from "./ProfileScreen";
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