import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Image, Text, Button, Dimensions } from "react-native";
import { getItemsByType, getItemTypeValue } from "../../firebase/database";
import ProductCard from "../../components/productCard";
import { ScrollView } from "react-native-gesture-handler";
const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 20;

const Products = ({ query, navigation }) => {
  const [items, setItems] = React.useState([]);

  getItemsByType(getItemTypeValue(query)).then(res => setItems(res))
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await getItemsByType(getItemTypeValue(query));
  //       setItems(res);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const renderProduct = ({ item }) => (
    <ProductCard item={item} cardWidth={cardWidth} showInfo={true} navigation={navigation} />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        renderItem={renderProduct}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default Products;
