import * as React from "react";
import { View, FlatList, Image, Text, Button} from "react-native";
import { IconButton,Card, Title} from "react-native-paper";
import { TouchableOpacity } from 'react-native-gesture-handler';

const products = [
    { id: "1", title: "Shirts", image: require('./pantsExample.jpg')},
    { id: "2", title: "Pants", image: require('./pantsExample.jpg') },
    { id: "3", title: "Shoes", image: require('./pantsExample.jpg')},
    // Add more items as needed
];

const Products = ({ navigation }) => {
  
    const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => {navigation.navigate('Product')}}>
      <Card style={{ margin: 1, padding: 0  }} elevation={0}>
        <Card.Content style={{ padding: 0  }}>
        <Image
          source={{
            uri: item.image,
          }}
          style={{ width: '100%', height: 100 }}
    resizeMode="cover"
        />
        <Text>Size: M Price $50</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  //fetchProductData

    return (
        <View style={{ flex: 1 }}>
        <FlatList
          data={products}
          renderItem={renderProduct}
          numColumns={2} // Number of columns you want in the grid
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 8 }}
        />
        </View>
    );
};

export default Products;