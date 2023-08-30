import { Appbar } from "react-native-paper";
import * as React from 'react';
import { View, FlatList, Image, Text, Button , Dimensions} from "react-native";
import { IconButton, Card, Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getManyItemData, getUserData, removeSavedItem } from "../firebase/database";
import { getCurrentUserUID } from "../firebase/authentication";

const SavedScreen = () => {
  const renderProduct = ({ item }) => (
    <ProductCard item={item} cardWidth={cardWidth}/>
  );

  //fetchSavedData
  const [items, setItems] = React.useState([]);
  getUserData(getCurrentUserUID())
    .then((user) => getManyItemData(user.saved, -1))
    .then((items) => setItems(items));
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Saved" />
      </Appbar.Header>

      <FlatList
        data={items}
        renderItem={renderProduct}
        numColumns={2} // Number of columns you want in the grid
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 0 }}
      />

    </View>
  );
};

export default SavedScreen;
