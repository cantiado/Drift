import * as React from "react";
import { View, FlatList, Image, Dimensions} from "react-native";
import {Card, Title} from "react-native-paper";
import { TouchableOpacity } from 'react-native-gesture-handler';
import ThemeContext from '../../assets/theme';
import { useContext } from "react";

const categories = ["Tops", "Bottoms", "Dresses", "Suits", "Footwear", "Accessories", "Sleepwear", "Underwear", "Swimwear", "Costume", "Coats & Jackets",  "Jumpsuits & Rompers",]

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const cardWidth = screenWidth / 2 - 20; 
const cardHeight = screenHeight / 6 - 200; 

const Categories = ({setSearchQuery}) => {
    const appTheme = useContext(ThemeContext);

    const renderCategory = ({ item }) => (
        <TouchableOpacity onPress={() => setSearchQuery(item)}
        style={{ width: cardWidth, height: cardHeight, padding: 5}}>
            <Card style={{backgroundColor: appTheme.colors.lightYellow, color: 'black',
        shadowColor: appTheme.colors.yellow,         // Shadow color
        shadowOffset: { width: 5, height: 5 }, // Positioning of the shadow
        shadowOpacity: 1,        // Opacity of the shadow
        shadowRadius: 0,            // How blurry the shadow should be
        elevation: 5,  
        }}>
                <Card.Content>
                <Title>{item}</Title>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={{flex: 1}}>
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