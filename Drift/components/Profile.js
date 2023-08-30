import ProductCard from "./ProductCard";
import { View, FlatList, Text, Dimensions, Button } from "react-native";
import { getManyItemData, getUserData } from "../firebase/database";
import ThemeContext from "../assets/theme";
import { ScrollView } from "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { Divider } from "react-native-paper";
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

  return (
    <View style={[
      appTheme.container,
      {
        backgroundColor: appTheme.colors.lightYellow,
        paddingTop: "10%",
        paddingBottom: "30%",
      },
    ]}>
      {isMyProfile && <Button
          onPress={handleLogOut}
          title="Sign out"
          textColor= {appTheme.colors.darkBlue}
          style={{position:'absolute', right: '0', top: '0', backgroundColor: 'transparent'}}
        /> 
      }
        <Text variant="displaySmall" style={{fontFamily: appTheme.fonts.funFont, color: appTheme.colors.brown, margin: '10'}}>
          {owner}'s Profile
        </Text>

      <View style={{flex: 1}}>
        <Button
          textColor="white"
          style={{borderRadius: '25', backgroundColor: appTheme.colors.darkBlue, width: "30%" }}
          title="Follow"
          onPress={() => {}}
        />
      <Text variant="titleLarge"
        style={{
          fontFamily: appTheme.fonts.mainFont,
          color: 'black',
          margin: '10',
        }}
      >
        Check out {owner}'s items!
      </Text>
      </View>
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
