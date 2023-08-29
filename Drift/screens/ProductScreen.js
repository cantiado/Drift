import * as React from "react";
import { View } from "react-native";
import { Button, Card, Text, Divider } from "react-native-paper";
import {
  getItemQualityTitle,
  getUserData,
  addCartItem,
  addSavedItem,
} from "../firebase/database";
import { getCurrentUserUID } from "../firebase/authentication";

// const productItem = {
//   id: "1", user: "user5090", title: "pants",
//   image: require('./HomeScreen/pantsExample.jpg'),
//   brand: "Levis", size: "M", condition: "Brand new",
//   color: "black", price: "$15",
//   description: "this is a cool description of the pants above. This is a cool description of the pants above",
//   hashtags: "#slay"};

const ProductScreen = ({ navigation, route }) => {
  const productItem = route.params.item;
  const [owner, setOwner] = React.useState("");
  getUserData(productItem.owner).then((res) =>
    setOwner(res.first + " " + res.last)
  );
  const user = getCurrentUserUID();
  const handleAddSaveItem = () => {
    console.log("Save");
    addSavedItem(user, productItem.id);
  };
  const handleADDCartItem = () => {
    console.log("Buy");
    addCartItem(user, productItem.id);
  };

  return (
    <View style={{ padding: 10 }}>
      <Card style={{ borderRadius: 15, elevation: 0 }}>
        {/* Card Image */}
        <Card.Cover source={productItem.images[0]} />

        {/* Card Title */}
        <Card.Title
          title={`${productItem.brand} - ${productItem.name} -${productItem.price}`}
          subtitle={`Size: ${productItem.size} ${getItemQualityTitle(
            productItem.quality
          )}`}
        />

        {/* Card Content */}
        <Card.Content>
          <Text>
            <Text style={{ fontWeight: "bold" }}>{owner}</Text>
            {productItem.description}
          </Text>
          <Divider style={{ backgroundColor: "transparent", height: 10 }} />
          {/* <Text>{`${productItem.hashtags}`}</Text> */}
          {/* <Text>{`Color: ${productItem.color}`}</Text> */}
        </Card.Content>

        {/* Card Actions */}
        <Card.Actions>
          <Button onPress={() => console.log("More")}>More from {owner}</Button>
          <Button onPress={handleAddSaveItem}>Save</Button>
          <Button onPress={handleADDCartItem}>Buy</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default ProductScreen;
