import * as React from "react";
import { View, FlatList, Image} from "react-native";
import { IconButton,Card, Title} from "react-native-paper";
import { TouchableOpacity } from 'react-native-gesture-handler';

const categories = [
    { id: "1", title: "Shirts" },
    { id: "2", title: "Pants" },
    { id: "3", title: "Shoes" },
    // Add more items as needed
];

const Categories = ({setSearchQuery}) => {
  
    const renderCategory = ({ item }) => (
        <TouchableOpacity onPress={() => setSearchQuery(item.title)}>
            <Card style={{ margin: 8 }}>
                <Card.Content>
                <Title>{item.title}</Title>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          numColumns={2} // Number of columns you want in the grid
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 8 }}
        />
        </View>
    );
};

export default Categories;