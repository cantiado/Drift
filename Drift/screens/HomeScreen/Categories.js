import * as React from "react";
import { View, FlatList, Image, Dimensions} from "react-native";
import { IconButton,Card, Title} from "react-native-paper";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';

const categories = ["Tops", "Bottoms", "Dresses", "Suits", "Footwear", "Accessories", "Sleepwear", "Underwear", "Swimwear", "Costume", "Coats & Jackets",  "Jumpsuits & Rompers",]

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 12; 

const Categories = ({setSearchQuery}) => {
  
    const renderCategory = ({ item }) => (
        <TouchableOpacity onPress={() => setSearchQuery(item)}
        style={{ width: '50%', padding: 4 }}>
            <Card style={{ margin: 8 }}>
                <Card.Content>
                <Title>{item}</Title>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, padding: '5%'}}>
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