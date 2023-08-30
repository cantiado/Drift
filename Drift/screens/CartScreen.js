import * as React from "react";
import { useContext } from "react";
import { View, FlatList, Image} from "react-native";
import { IconButton, Card, Button, Divider} from "react-native-paper";
import { getManyItemData, getUserData } from "../firebase/database";
import { getCurrentUserUID } from "../firebase/authentication";
import { removeCartItem, buyItem } from "../firebase/database";
import { useCallback } from "react";
import ThemeContext from '../assets/theme';
import { ScrollView } from "react-native-gesture-handler";

const cartItems = [
  {
    id: "1",
    title: "Shirts",
    image: require("./HomeScreen/pantsExample.jpg"),
    size: "M",
    price: "$50",
  },
  {
    id: "2",
    title: "Pants",
    image: require("./HomeScreen/pantsExample.jpg"),
    size: "M",
    price: "$50",
  },
  {
    id: "3",
    title: "Shoes",
    image: require("./HomeScreen/pantsExample.jpg"),
    size: "M",
    price: "$50",
  },
  // Add more items as needed
];

const CartScreen = ({ navigation }) => {
  const appTheme = useContext(ThemeContext);
  const renderItems = ({ item }) => (
    <Card style={{ margin: 1, padding: 0 }} elevation={0}>
      <Card.Content style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
        <Image
          source={{
            uri: item.images[0],
          }}
          style={{ width: "30%", height: 100 }}
          resizeMode="cover"
          //style={{ padding: 0 }}
        />
        <Card elevation={0} style={{width: '70%'}}>
          <Card.Title 
            title={`${item.name}`}
            subtitle={`Size: ${item.size} Price: $${item.price}`}
            right={() => <IconButton icon="trash-can-outline" color={appTheme.colors.red} onPress={() => {removeCartItem(getCurrentUserUID(),item.id)}} />}
          />
        </Card>
      </Card.Content>
      <Divider/>
    </Card>
  );
  //fetch user's cart
  const [items, setItems] = React.useState([]);
  getUserData(getCurrentUserUID())
    .then((user) => getManyItemData(user.cart, 0))
    .then((items) => setItems(items));

  const totalPrice = items.reduce((accumulator, item) => accumulator + item.price, 0);
  const checkoutAllItems = () => {
    items.forEach(item => {
      buyItem(item.id);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Button 
        mode="contained"
        textColor="white"
        style={{backgroundColor: appTheme.colors.darkBlue, marginTop: '7%'}} 
        onPress={() => {console.log('Checking out all items'); checkoutAllItems();}}>
          Checkout - Total: ${totalPrice}
      </Button>
      <ScrollView>
      <FlatList
        data={items}
        renderItem={renderItems}
        numColumns={1} // Number of columns you want in the grid
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
      />
      </ScrollView>
    </View>
  );
};

export default CartScreen;