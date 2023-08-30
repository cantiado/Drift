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
  isSavedItem,
  removeSavedItem,
} from "../firebase/database";
import { getCurrentUserUID } from "../firebase/authentication";


// const productItem = {
//   id: "1", user: "user5090", title: "pants",
//   image: require('./HomeScreen/pantsExample.jpg'),
//   brand: "Levis", size: "M", condition: "Brand new",
//   color: "black", price: "$15",
//   description: "this is a cool description of the pants above. This is a cool description of the pants above",
//   hashtags: "#slay"};

const productInfo = [
  "Price",
  "Brand",
  "Type",
  "Size",
  "Demographic",
  "Quality",
  "Description",
];

const ProductScreen = ({ navigation, route }) => {
  const productItem = route.params.item;
  const [owner, setOwner] = React.useState("");
  const [isItemSaved, setIsItemSaved] = React.useState(null);
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
  const handleRemoveSaveItem = () => {
    console.log("Remove Save");
    removeSavedItem(user, productItem.id);
  };
  isSavedItem(user,productItem.id).then(res=>setIsItemSaved(res));

  return (
    <View>
      <Card style={{ borderRadius: 15 }} elevation={0}>
        {/* Card Image */}
        <Card.Cover source={productItem.images[0]} />

        {/* Card Title */}
        <Card.Title title={productItem.name} subtitle={owner} />

        {/* Card Content */}
        <Card.Content
          style={{ height: "100%", flexDirection: "column", gap: "5px" }}
        >
          {productInfo.map((info) => {
            const key = info.toLowerCase();

            let displayValue = productItem[key];

            // Special formatting for price
            if (info === "Price") {
              displayValue = `$${displayValue}`;
            }
          })}

          <Divider style={{ backgroundColor: "transparent", height: 10 }} />
          {/* <Text>{`${productItem.hashtags}`}</Text> */}
          {/* <Text>{`Color: ${productItem.color}`}</Text> */}
        </Card.Content>

        {/* Card Actions */}

        <Card.Actions>
          <Button
            style={{ backgroundColor: "blue" }}
            onPress={() =>
              navigation.navigate("SellerProfileScreen", productItem.owner)
            }
          >
            More from {owner}
          </Button>

          { isItemSaved === null ? null : (isItemSaved ? <Button
            style={{ backgroundColor: "purple" }}
            onPress={handleRemoveSaveItem}
          >
            Unsave
          </Button> : <Button
            style={{ backgroundColor: "purple" }}
            onPress={handleAddSaveItem}
          >
            Save
          </Button>) 

          }

          <Button
            style={{ backgroundColor: "purple" }}
            onPress={handleAddSaveItem}
          >
            Save
          </Button>
          {productItem.sold ? (
            <Button style={{ backgroundColor: "black" }} disabled="true">
              Sold
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: "white" }}
              onPress={handleAddCartItem}
            >
              Add to cart
            </Button>
          )}
        </Card.Actions>
      </Card>
    </View>
  );
};

export default ProductScreen;
