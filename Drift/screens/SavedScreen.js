import { Appbar } from "react-native-paper";
import * as React from 'react';
import { View, FlatList, Dimensions} from "react-native";
import { getManyItemData, getUserData} from "../firebase/database";
import { getCurrentUserUID } from "../firebase/authentication";
import ProductCard from "../components/ProductCard";

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 3 - 25;

const SavedScreen = () => {
  const [items, setItems] = React.useState([]);

  getUserData(getCurrentUserUID())
    .then((user) => getManyItemData(user.saved, -1))
    .then((items) => setItems(items));

  const renderProduct = ({ item }) => (
    <ProductCard item={item} cardWidth={cardWidth} showInfo={false}/>
  );

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Saved" />
      </Appbar.Header>

      <FlatList
        data={items}
        renderItem={renderProduct}
        numColumns={3} // Number of columns you want in the grid
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 3 }}
      />
    </View>
  );
};

export default SavedScreen;
