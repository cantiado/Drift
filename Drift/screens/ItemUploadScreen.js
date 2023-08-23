import * as React from "react";
import { View } from "react-native";
import { Appbar,Text,TextInput,HelperText } from "react-native-paper";
import { ItemNameInput } from "../components/ItemNameInput";
import { ItemPriceInput } from "../components/ItemPriceInput";
import { ItemDescriptionInput } from "../components/ItemDescriptionInput";
import { ItemQualityInput } from "../components/ItemQualityInput";
import { ItemSizeInput } from "../components/ItemSizeInput";
import { ItemDemographicInput } from "../components/ItemDemographic";

const ItemUploadScreen = () => {
    //const [searchQuery, setSearchQuery] = React.useState("");
    const [itemName, setItemName] = React.useState("");

  
  
    return (
      <View>
        <Appbar.Header>
          <Text variant="headlineSmall">Upload an Item</Text>    
        </Appbar.Header>
        <ItemNameInput/>
        <ItemPriceInput/>
        <ItemDescriptionInput/>
        <ItemQualityInput/>
        <ItemSizeInput/>
        <ItemDemographicInput/>
      </View>
    );
  };
  
  export default ItemUploadScreen;