import * as React from "react";
import { Appbar,Text,TextInput,HelperText } from "react-native-paper";

const ItemNameInput = () => {
    const [itemName, setItemName] = React.useState("");
    return(
        <TextInput
            label="Item Name"
            value={itemName}
            mode="outlined"
            maxLength={70}
            onChangeText={itemName => setItemName(itemName)}       
        />
    )
}
export {ItemNameInput};