import { Searchbar } from "react-native-paper";
import { Appbar } from "react-native-paper";
import * as React from "react";
import { useState, useEffect } from 'react';
import { View, FlatList, Image} from "react-native";
import { IconButton,Card, Title} from "react-native-paper";
import Categories from "./Categories";
import Products from "./Products";


const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    //fetch data based on searchQuery
  }, [searchQuery]);

  return (
    <View>
      <Appbar.Header>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />

        <IconButton
          icon="basket"
          size={20}
          onPress={() => console.log("Pressed")}
        />
      </Appbar.Header>
      {searchQuery === '' ? <Categories setSearchQuery = {setSearchQuery}/> : <Products/>}
    </View>
  );
};

export default HomeScreen;
