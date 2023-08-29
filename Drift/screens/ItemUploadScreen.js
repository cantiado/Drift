import * as React from "react";
import { ScrollView } from "react-native";
import { Appbar,Text, Button, TextInput,HelperText } from "react-native-paper";
import { ItemNameInput } from "../components/ItemNameInput";
import { ItemImagesInput } from "../components/ItemImagesInput";
import { ItemPriceInput } from "../components/ItemPriceInput";
import { ItemDescriptionInput } from "../components/ItemDescriptionInput";
import { ItemQualityInput } from "../components/ItemQualityInput";
import { ItemSizeInput } from "../components/ItemSizeInput";
import { ItemDemographicInput } from "../components/ItemDemographic";
import { ItemBrandInput } from "../components/ItemBrandInput";
import { ItemTypeInput } from "../components/ItemTypeInput";
import { SafeAreaView } from "react-native-safe-area-context";

const ItemUploadScreen = () => {
    //const [searchQuery, setSearchQuery] = React.useState("");
    const [itemName, setItemName] = React.useState("");
  
    return (
      <ScrollView>
        <Appbar.Header>
          <Text variant="headlineSmall">Upload an Item</Text>    
        </Appbar.Header>
        <ItemNameInput/>
        <Text>Upload Images, up to 5</Text>
        <ItemImagesInput/>
        <ItemPriceInput/>
        <ItemDescriptionInput/>
        <Text>Item Quality</Text>
        <ItemQualityInput/>
        <ItemSizeInput/>
        <Text>e.g. S, M, L, etc. or a numerical size</Text>
        <ItemBrandInput/>
        <ItemTypeInput/>
        <Text>Item Category:</Text>
        <ItemDemographicInput/>
        <Button 
          mode="elevated"
          onPress={() => {
            console.log("Sumbitted item");
          }
          }>
          Submit
        </Button>
      </ScrollView>
    );
  };
  
  export default ItemUploadScreen;