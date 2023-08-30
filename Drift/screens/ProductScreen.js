import * as React from "react";
import { View } from "react-native";
import { Button, Card, Text, Divider } from "react-native-paper";
import {
  getItemQualityTitle,
  getItemTypeTitle,
  getItemDemographicTitle,
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
  const handleAddCartItem = () => {
    console.log("Buy");
    addCartItem(user, productItem.id);
  };

  return (
    <View style={{ padding: 10 }}>
      <Card style={{ borderRadius: 15 }} elevation={0}>
        {/* Card Image */}
        <Card.Cover source={productItem.images[0]} />

        {/* Card Title */}
        <Card.Title
          title={productItem.name}
          subtitle={owner}
        />

        {/* Card Content */}
        <Card.Content style={{height: "100%", flexDirection:'column', gap: '5px'}}>
          <Text style={{ fontWeight: "bold" }}>Price: <Text>
            {`$${productItem.price}`}</Text>
          </Text>
          <Text style={{ fontWeight: "bold" }}>Brand: <Text>
            {`Brand: ${productItem.brand}`}</Text>
          </Text>
          <Text style={{ fontWeight: "bold" }}>Type: <Text>
            {`Type: ${getItemTypeTitle(productItem.type)}`}</Text>
          </Text>
          <Text style={{ fontWeight: "bold" }}>Size: <Text>
            {`Size: ${productItem.size}`}</Text>
          </Text>  
          <Text style={{ fontWeight: "bold" }}></Text>  
              <Text>{getItemDemographicTitle(productItem.demographic)}</Text>
            <Text style={{ fontWeight: "bold" }}></Text>  
              <Text>{`Quality: ${getItemQualityTitle(productItem.quality)}`}</Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Description: </Text>
              {productItem.description}
            </Text>
          <Divider style={{ backgroundColor: "transparent", height: 10 }} />
          {/* <Text>{`${productItem.hashtags}`}</Text> */}
          {/* <Text>{`Color: ${productItem.color}`}</Text> */}
        </Card.Content>

        {/* Card Actions */}
        <Card.Actions>
          <Button style={{backgroundColor:'blue'}} onPress={() => navigation.navigate("SellerProfileScreen", productItem.owner)}>More from {owner}</Button>
          <Button style={{backgroundColor:'purple'}} onPress={handleAddSaveItem}>Save</Button>
          {productItem.sold ? <Button style={{backgroundColor:'black'}} disabled="true">Sold</Button> : <Button style={{backgroundColor:'white'}} onPress={handleAddCartItem}>Add to cart</Button>}
        </Card.Actions>
      </Card>
    </View>
  );
};

export default ProductScreen;
