import * as React from "react";
import { Appbar,Text,TextInput,HelperText } from "react-native-paper";

const ItemBrandInput = () => {
    const [itemBrand, setItemBrand] = React.useState("");
    return(
        <TextInput
            label="Item Brand"
            value={itemBrand}
            mode="outlined"
            onChangeText={itemBrand => setItemBrand(itemBrand)}       
        />   
    )
}
export {ItemBrandInput};