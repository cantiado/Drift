import * as React from "react";
import { View, FlatList, Image, Text, Button } from "react-native";
import { IconButton, Card, Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getItemsByType, getItemTypeValue } from "../../firebase/database";

const Products = ({ query, navigation }) => {
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Product", { item });
      }}
    >
      <Card style={{ width: '50%', margin: 1, padding: 0 }} elevation={0}>
        <Card.Content style={{ padding: 0 }}>
          <Image
            source={{
              uri: item.images[0],
            }}
            style={{ width: "100%", height: 100 }}
            resizeMode="cover"
          />
          <Text>{`Size: ${item.size} Price ${item.price}`}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  //fetchProductData
  const [items, setItems] = React.useState([]);
  getItemsByType(getItemTypeValue(query)).then((res) => setItems(res));

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        renderItem={renderProduct}
        numColumns={2} // Number of columns you want in the grid
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default Products;
