import * as React from "react";
import {Image, Text, Dimensions } from "react-native";
import {Card } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 20;

const ProductCard = ({ item, cardWidth }) => {
  return (
    <TouchableOpacity
      style={{ width: cardWidth }}
      onPress={() => {
        navigation.navigate("Product", { item });
      }}
    >
      <Card elevation={0}>
        <Card.Content>
          <Image
            source={{
              uri: item.images[0],
            }}
            style={{ width: "100%", height: 100 }}
            resizeMode="cover"
          />
          <Text>{`Size: ${item.size} Price ${item.price}`}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default ProductCard;
