import * as React from "react";
import { View } from "react-native";
import { Appbar,Text,TextInput,HelperText } from "react-native-paper";
import { ItemNameInput } from "../components/ItemNameInput";
import { ItemPriceInput } from "../components/ItemPriceInput";
import { ItemDescriptionInput } from "../components/ItemDescriptionInput";

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
      </View>
    );
  };
  
  export default ItemUploadScreen;