import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Dimensions, Text} from "react-native";
import { getManyItemData, getUserData} from "../firebase/database";
import { getCurrentUserUID } from "../firebase/authentication";
import ProductCard from "../components/ProductCard";
import { Divider} from "react-native-paper";
import ThemeContext from '../assets/theme';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 3 - 25;

const SavedScreen = () => {
  const appTheme = useContext(ThemeContext);
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserData(getCurrentUserUID());
        if (user && user.saved) {
          const fetchedItems = await getManyItemData(user.saved, -1);
          setItems(fetchedItems);
        } else {
          console.warn("User or user saved items are null");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } 
    };

    fetchData();
  }, []);

  const renderProduct = ({ item }) => (
    <ProductCard item={item} cardWidth={cardWidth} showInfo={false} />
  );

  return (
    <View style={[
      appTheme.container,
      {
        backgroundColor: appTheme.colors.red,
        paddingTop: "10%",
        paddingBottom: "30%",
      },
    ]}>
      <View>
          <Text variant="headlineSmall" style={{ fontFamily: appTheme.fonts.mainFont, color: appTheme.colors.white}}>your saved</Text>
          <Text variant="displayLarge" style={appTheme.logo}>Drift</Text>  
        </View>   
      <Divider/>
      <FlatList
        data={items}
        renderItem={renderProduct}
        numColumns={3} 
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 3 }}
      />
    </View>
  );
};

export default SavedScreen;
