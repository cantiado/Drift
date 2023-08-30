import { Searchbar } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { useState, useEffect } from "react";
import {View, FlatList, Image } from "react-native";
import { IconButton, Card, Title } from "react-native-paper";
import Categories from "./Categories";
import Products from "./Products";
import ThemeContext from '../../assets/theme';
import React, { useContext } from "react";


const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const appTheme = useContext(ThemeContext);

  useEffect(() => {
    //fetch data based on searchQuery
  }, [searchQuery]);

  return (
    <View style={[
      appTheme.container,
      {
        paddingTop: "5%",
      },
    ]}>
      <Appbar.Header  style={{ backgroundColor: 'transparent' }}>
        <Searchbar
        style={{ flex: 1, backgroundColor: appTheme.colors.lightYellow }}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />

        <IconButton
          icon="basket"
          iconColor={appTheme.colors.darkBlue}
          size={20}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      </Appbar.Header>
      
      {searchQuery === "" ? (
        <Categories setSearchQuery={setSearchQuery} />
      ) : (
        <Products query={searchQuery} navigation={navigation} />
      )}
  
    </View>
  );
};

export default HomeScreen;
