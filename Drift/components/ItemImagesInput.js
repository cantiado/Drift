import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, IconButton, MD3Colors } from 'react-native-paper';

const ItemImagesInput = () => {
    return(
            <IconButton
            icon="camera"
            mode="contained"
            iconColor={MD3Colors.primary50}
            size={20}
            onPress={() => console.log('Pressed')}
        />
    );
    
 };

export {ItemImagesInput};