import { Appbar } from "react-native-paper";
import * as React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import { Avatar } from '@rneui/themed';

const ProfileScreen = () => {
  return (
    <View>
      <Appbar.Header>
        <Avatar
          size={32}
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <List.Item
          title="Name"
          description="Username"
        />

        <Appbar.Action icon="cog" onPress={() => {}} />
      </Appbar.Header>
    </View>
  );
};

export default ProfileScreen;
