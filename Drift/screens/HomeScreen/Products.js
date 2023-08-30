import * as React from "react";
import { View, FlatList, Image, Text, Button, Dimensions} from "react-native";
import { IconButton, Card, Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getItemsByType, getItemTypeValue } from "../../firebase/database";
import { FlatGrid } from 'react-native-super-grid';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 12;  // Adjusting for padding

const Products = ({ query, navigation }) => {
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Product", { item });
      }}
      style={{ padding: 4 }}
    >
      <Card style={{padding: 0 }} elevation={0}>
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
      <FlatGrid
        data={items}
        renderItem={renderProduct}
        itemDimension={cardWidth} // This becomes more of a maximum dimension when fixed is set to false
        spacing={10}
        fixed={false} 
        itemsPerRow={2} // This ensures you have 2 items per row
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Products;




