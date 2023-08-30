import * as React from "react";
import { View, FlatList, Image, Text, Button , Dimensions} from "react-native";
import { getItemsByType, getItemTypeValue } from "../../firebase/database";
import ProductCard from "../../components/ProductCard";
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 20;

const Products = ({ query, navigation}) => {
  const [items, setItems] = React.useState([]);

  getItemsByType(getItemTypeValue(query)).then((res) => setItems(res));

  const renderProduct = ({ item }) => (
    <ProductCard item={item} cardWidth={cardWidth} showInfo={true}/>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        renderItem={renderProduct}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default Products;
