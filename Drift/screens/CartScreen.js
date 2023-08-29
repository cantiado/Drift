import * as React from "react";
import { View, FlatList, Image, Text } from "react-native";
import { IconButton, Card, Title, MD3Colors } from "react-native-paper";
import { getManyItemData, getUserData } from "../firebase/database";
import { getCurrentUserUID } from "../firebase/authentication";

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
  const renderItems = ({ item }) => (
    <Card style={{ margin: 1, padding: 0 }} mode="outlined" elevation={0}>
      <Card.Content style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
        <Image
          source={{
            uri: item.images[0],
          }}
          style={{ width: "30%", height: 100 }}
          resizeMode="cover"
          //style={{ padding: 0 }}
        />
        {/* <Text>{`Size: ${item.size} Price: $${item.price}`}</Text> */}
        {/* <Card mode="outlined" elevation={0} style={{width: '70%'}}>
          <Card.Content style={{flexDirection: 'column', justifyContent:'flex-start', width: "100%", paddingLeft: "5px",  paddingRight: "5px"}}>
          <Text style={{overflow: 'hidden'}} numberOfLines={1} ellipsizeMode='tail'>{`${item.name}`}</Text>
            <Text>{`Size: ${item.size}`}</Text>
            <Text>{`Price: $${item.price}`}</Text>
            
          </Card.Content>
          <IconButton 
              style={{position:'relative'}}
              icon="camera"
              iconColor={MD3Colors.error50}
              size={20}
              onPress={() => console.log('Pressed')}
            />
        </Card> */}
        <Card mode="outlined" elevation={0} style={{width: '70%'}}>
          <Card.Title 
            title={`${item.name}`}
            subtitle={`Size: ${item.size} Price: $${item.price}`}
            right={() => <IconButton icon="trash" onPress={() => {}} />}
          />
        </Card>
      </Card.Content>
    </Card>
  );
  //fetch user's cart
  const [items, setItems] = React.useState([]);
  getUserData(getCurrentUserUID())
    .then((user) => getManyItemData(user.cart, 0))
    .then((items) => setItems(items));
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        renderItem={renderItems}
        numColumns={1} // Number of columns you want in the grid
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default CartScreen;
