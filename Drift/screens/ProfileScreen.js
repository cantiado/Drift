import { Appbar } from "react-native-paper";
import * as React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import { Avatar } from "@rneui/themed";
import { logOut } from "../firebase/authentication";


const ProfileScreen = ({ navigation }) => {
  const [cogDisabled, setCogDisabled] = React.useState(false);
  const toggleCogDisabled = React.useCallback(() =>
    setCogDisabled(!cogDisabled)
  );
  const handleLogOut = async () => {
    toggleCogDisabled();
    if (await logOut()) {
      navigation.navigate("Login");
    }
    toggleCogDisabled();
  };

  return (
    <View>
      <Appbar.Header>
        <Avatar
          size={32}
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <List.Item title="Name" description="Username" />

        <Appbar.Action
          disabled={cogDisabled ? true : false}
          icon="cog"
          onPress={handleLogOut}
        />
      </Appbar.Header>
      {/* <Text>Check out ${owner}'s items!</Text> */}
      {/* <FlatList
        data={items}
        renderItem={renderProduct}
        numColumns={3} // Number of columns you want in the grid
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
      /> */}
    </View>
  );
};

export default ProfileScreen;
