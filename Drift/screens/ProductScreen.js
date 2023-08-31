import * as React from "react";
import  { useContext } from 'react';
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
import ThemeContext from '../assets/theme';

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
  const appTheme = useContext(ThemeContext);

  const productItem = route.params.item;
  console.log(productItem)
  const [owner, setOwner] = React.useState("");
  const [isItemSaved, setIsItemSaved] = React.useState(null);
  getUserData(productItem.owner).then((res) =>
    setOwner(res.first + " " + res.last)
  );
  const user = getCurrentUserUID();
  isSavedItem(user,productItem.id).then(res=>setIsItemSaved(res));
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

  return (
    <View style={{backgroundColor: appTheme.colors.yellow}}>
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
            switch (info) {
              case "Price":
                displayValue = `$${displayValue}`
                break
              case "Type":
                displayValue = getItemTypeTitle(displayValue)
                break
              case "Demographic":
                displayValue = getItemDemographicTitle(displayValue)
                break
              case "Quality":
                displayValue = getItemQualityTitle(displayValue)
                break
            }
            return <Text key={key}>{displayValue}</Text>
          })}

          {/* <Divider style={{ backgroundColor: "transparent", height: 10 }} /> */}
          {/* <Text>{`${productItem.hashtags}`}</Text> */}
          {/* <Text>{`Color: ${productItem.color}`}</Text> */}
        </Card.Content>

        {/* Card Actions */}

        <Card.Actions style={{flexDirection: 'row'}}>
          <Button
            textColor="white"
            style={{ backgroundColor: appTheme.colors.darkBlue}}
            onPress={() =>
              navigation.navigate("Seller", productItem.owner)
            }
          >
            More from {owner}
          </Button>

          { isItemSaved === null ? null : (isItemSaved ? <Button
            style={{ backgroundColor: appTheme.colors.yellow }}
            outlineColor={appTheme.colors.darkRed}
            textColor="black"
            onPress={handleRemoveSaveItem}
          >
            Unsave
          </Button> : <Button
            style={{ backgroundColor: 'white' }}
            outlineColor={appTheme.colors.yellow}
            onPress={handleAddSaveItem}
            textColor="black"
          >
            Save
          </Button>) 

          }
          {productItem.sold ? (
            <Button style={{ backgroundColor: appTheme.colors.red }}
              textColor="white"
              outlineColor={appTheme.colors.red}
              disabled="true">
              Sold
            </Button>
          ) : (
            <Button
              textColor="white"
              style={{ backgroundColor: appTheme.colors.green }}
              outlineColor={appTheme.colors.red}
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
