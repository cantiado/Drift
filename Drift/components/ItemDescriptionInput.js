import * as React from "react";
import { Appbar,Text,TextInput,HelperText } from "react-native-paper";

const ItemDescriptionInput = () => {
    const [itemDescription, setItemDescription] = React.useState("");
    return(
        <TextInput
            label="Item Description"
            value={itemDescription}
            mode="outlined"
            multiline={true}
            style={{height:100}}
            onChangeText={itemDescription => setItemDescription(itemDescription)}       
        />   
    )
};
export {ItemDescriptionInput};