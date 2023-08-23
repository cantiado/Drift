import * as React from "react";
import { Text,TextInput,HelperText } from "react-native-paper";
import { SafeAreaView, StyleSheet } from 'react-native';

const ItemSizeInput = () => {
    const [size, setSize] = React.useState("");
    return(
        <SafeAreaView>
            <TextInput
                label="Size"
                value={size}
                mode="outlined"
                onChangeText={size => setSize(size)} 
            />
            <Text>e.g. S, M, L, etc. or a numerical size</Text>
        </SafeAreaView>
        
    
    )
}
export {ItemSizeInput};