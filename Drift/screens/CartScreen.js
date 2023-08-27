import * as React from "react";
import { View, FlatList, Image, Text, Button} from "react-native";
import { IconButton,Card, Title} from "react-native-paper";


const cartItems = [
  { id: "1", title: "Shirts", image: require('./pantsExample.jpg'), size: "M", price: "$50"},
  { id: "2", title: "Pants", image: require('./pantsExample.jpg'), size: "M", price: "$50" },
  { id: "3", title: "Shoes", image: require('./pantsExample.jpg'), size: "M", price: "$50"},
  // Add more items as needed
];

const CartScreen = ({ navigation }) => {
  const renderItems = ({ item }) => (
      <Card style={{ margin: 1, padding: 0  }} elevation={0}>
        <Card.Content style={{ padding: 0  }}>
        <Image
          source={{
            uri: item.image,
          }}
          style={{ width: '100%', height: 100 }}
    resizeMode="cover"
        />
        <Text>{`Size: ${item.size} Price ${item.price}`}</Text>
        </Card.Content>
      </Card>
      );
  return (
    <View style={{ flex: 1 }}>
        <FlatList
          data={cartItems}
          renderItem={renderItems}
          numColumns={1} // Number of columns you want in the grid
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 8 }}
        />
    </View>
  );
};

export default CartScreen;