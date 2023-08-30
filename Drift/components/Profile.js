import ProductCard from "./ProductCard";
import { View, FlatList, Text, Dimensions, Button } from "react-native";
import { getManyItemData, getUserData } from "../firebase/database";
import ThemeContext from "../assets/theme";
import { ScrollView } from "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { Divider } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 3 - 25;

const Profile = ({ userID, isMyProfile }) => {
  const [owner, setOwner] = React.useState("user");
  const [items, setItems] = React.useState([]);

  const appTheme = useContext(ThemeContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserData(userID);
        if (res) {
          setOwner(res.first + " " + res.last);
        } else {
          console.warn("User data is null for user ID:", userID);
        }

        if (res && res.items) {
          const fetchedItems = await getManyItemData(res.items, -1);
          setItems(fetchedItems);
        } else {
          console.warn("User or user items are null for user ID:", userID);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userID]);

  const renderProduct = ({ item }) => (
    <ProductCard item={item} cardWidth={cardWidth} showInfo={false} />
  );

  return (
    <View style={[
      appTheme.container,
      {
        backgroundColor: appTheme.colors.lightYellow,
        paddingTop: "10%",
        paddingBottom: "30%",
      },
    ]}>
        <Text variant="headlineMedium" style={{fontFamily: appTheme.fonts.funFont, color: appTheme.colors.brown, margin: '10'}}>
          {owner}'s Profile
        </Text>
      <Text variant="titleMedium"
        style={{
          fontFamily: appTheme.fonts.mainFont,
          color: 'black',
          margin: '10',
        }}
      >
        <Button
          textColor="white"
          style={{ backgroundColor: appTheme.colors.darkBlue, width: "30%" }}
          title="Follow"
          onPress={() => {}}
        />
        Check out {owner}'s items!
      </Text>
<Divider color={appTheme.colors.brown}/>
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

export default Profile;
