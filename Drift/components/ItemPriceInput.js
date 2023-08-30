import * as React from "react";
import { Appbar,Text,TextInput,HelperText } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const ItemPriceInput = () => {
    const [price, setPrice] = React.useState("");
    return(
        <TextInput
            label="Price"
            value={price}
            mode="outlined"
            left={<TextInput.Icon icon="currency-usd"/>}
            //keyboardType="number-pad" 
            onChangeText={price => setPrice(price)} 
               
        />   
    )
}
export {ItemPriceInput};