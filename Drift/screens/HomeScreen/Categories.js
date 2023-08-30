import * as React from "react";
import { View, FlatList, Image, Dimensions} from "react-native";
import {Card, Title} from "react-native-paper";
import { TouchableOpacity } from 'react-native-gesture-handler';

const categories = ["Tops", "Bottoms", "Dresses", "Suits", "Footwear", "Accessories", "Sleepwear", "Underwear", "Swimwear", "Costume", "Coats & Jackets",  "Jumpsuits & Rompers",]

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const cardWidth = screenWidth / 2 - 20; 
const cardHeight = screenHeight / 6 - 200; 

const Categories = ({setSearchQuery}) => {
  
    const renderCategory = ({ item }) => (
        <TouchableOpacity onPress={() => setSearchQuery(item)}
        style={{ width: cardWidth, height: cardHeight, padding: 5}}>
            <Card>
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
        />
        </View>
    );
};

export default Categories;