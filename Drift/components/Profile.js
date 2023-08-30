import ProductCard from "./ProductCard";
import { View, FlatList, Text, Dimensions } from "react-native";
import { getManyItemData, getUserData } from "../firebase/database";
import ThemeContext from "../assets/theme";
import React, { useContext, useEffect, useState } from "react";
import { Divider, Appbar, Button } from "react-native-paper";
import { logOut } from "../firebase/authentication";

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

  const handleLogOut = async () => {
    if (await logOut()) {
      navigation.navigate("Login");
    }
  };
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: appTheme.colors.lightYellow,
          paddingBottom: "30%",
          paddingHorizontal: "10%",
          alignContent: "center",
          paddingTop: "10%",
          justifyContent: "center",
        },
      ]}
    >
      <View style={{paddingHorizontal: '20%', alignContent:"center", justifyContent: "center"}}>
      <Text
        variant="headlineMedium"
        style={[appTheme.title]}
      >
        {owner}'s profile
      </Text>
      {isMyProfile ? (
        <Button
          mode="contained"
          textColor="white"
          onPress={handleLogOut}
          style={{backgroundColor: appTheme.colors.darkBlue, marginTop: '5%' }}
        >
          Sign out
        </Button>
      ) : (
        <Button
          mode="contained"
          textColor="white"
          style={{
            backgroundColor: appTheme.colors.darkBlue, marginTop: '5%'
          }}
          title="Follow"
          onPress={() => {}}
        />
      )}
      </View>

      <Divider
        bold="true"
        color={appTheme.colors.brown}
        style={{marginVertical: 10}}
        theme={{ colors: { outlineVariant: appTheme.colors.brown } }}
      />
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
