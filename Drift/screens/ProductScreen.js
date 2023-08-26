import { Appbar } from "react-native-paper";
import * as React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import { Avatar } from '@rneui/themed';

const ProductScreen = ({ navigation }) => {
  return (
    <View>
      <Appbar.Header>
        <IconButton
            icon="basket"
            size={20}
            onPress={() => console.log("Pressed")}
          />

        <IconButton
          icon="basket"
          size={20}
          onPress={() => {navigation.navigate('Home')}}
        />
      </Appbar.Header>
    </View>
  );
};

export default ProductScreen;
