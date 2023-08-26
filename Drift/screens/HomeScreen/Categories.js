import * as React from "react";
import { View, FlatList, Image} from "react-native";
import { IconButton,Card, Title} from "react-native-paper";
import { TouchableOpacity } from 'react-native-gesture-handler';

const categories = ["Tops", "Bottoms", "Dresses", "Coats & Jackets", "Jumpsuits & Rompers", "Suits", "Footwear", "Accessories", "Sleepwear", "Underwear", "Swimwear", "Costume"]

const Categories = ({setSearchQuery}) => {
  
    const renderCategory = ({ item }) => (
        <TouchableOpacity onPress={() => setSearchQuery(item)}>
            <Card style={{ margin: 8 }}>
                <Card.Content>
                <Title>{item}</Title>
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
          keyExtractor={(categoryName) => categoryName}
          contentContainerStyle={{ padding: 8 }}
        />
        </View>
    );
};

export default Categories;