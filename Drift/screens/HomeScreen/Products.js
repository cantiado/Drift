import * as React from "react";
import { View, FlatList, Image, Text, Button , Dimensions} from "react-native";
import { IconButton, Card, Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getItemsByType, getItemTypeValue } from "../../firebase/database";
import ProductCard from "../../components/productCard";
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 20;

const Products = ({ query, navigation }) => {
  const renderProduct = ({ item }) => (
    <ProductCard item={item} cardWidth={cardWidth}/>
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
