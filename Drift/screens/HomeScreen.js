import { Searchbar } from "react-native-paper";
import { Appbar } from "react-native-paper";
import * as React from "react";
import { View, FlatList, Image } from "react-native";
import { IconButton, Card, Title } from "react-native-paper";
import { runTest } from "../firebase/test";

const categories = [
  { id: "1", title: "Shirts" },
  { id: "2", title: "Pants" },
  { id: "3", title: "Shoes" },
  // Add more items as needed
];

const product = [
  {
    id: "1",
    title: "Shirts",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    id: "2",
    title: "Pants",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    id: "3",
    title: "Shoes",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  // Add more items as needed
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const renderCategory = ({ item }) => (
    <Card style={{ margin: 8 }}>
      <Card.Content>
        <Title>{item.title}</Title>
      </Card.Content>
    </Card>
  );

  const renderProduct = ({ item }) => (
    <Card style={{ margin: 8 }}>
      <Card.Content>
        <Image
          source={{
            uri: item.image,
          }}
        />
      </Card.Content>
    </Card>
  );

  return (
    <View>
      <Appbar.Header>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />

        <IconButton
          icon="basket"
          size={20}
          onPress={() => {
            console.log("Pressed");
            runTest();
          }}
        />
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          numColumns={2} // Number of columns you want in the grid
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 8 }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
