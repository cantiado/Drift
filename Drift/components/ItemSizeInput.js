import * as React from "react";
import { Text,TextInput,HelperText } from "react-native-paper";
import { SafeAreaView, StyleSheet } from 'react-native';

const ItemSizeInput = () => {
    const [size, setSize] = React.useState("");
    return(
            <TextInput
                label="Size"
                value={size}
                mode="outlined"
                onChangeText={size => setSize(size)} 
            />
        
    )
}
export {ItemSizeInput};