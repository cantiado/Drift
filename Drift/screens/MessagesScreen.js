import { Appbar } from "react-native-paper";
import * as React from "react";
import { FlatList, TouchableHighlight, View } from "react-native";
import { List } from "react-native-paper";
import { Avatar } from '@rneui/themed';

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "First Last",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "First Last",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "First Last",
  },
];

const MessageItem = ({name}) => {
  const onPress = () => 1;
  return (
    <TouchableHighlight onPress={onPress}>
      <List.Item
        title={name}
        left={(props) =>
          <Avatar
            size={32}
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          />
        }
        right={(props) => <List.Icon {...props} icon="angle-right" />}
      />
    </TouchableHighlight>
  );
};

const MessagesScreen = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Messages" />
      </Appbar.Header>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <MessageItem name={item.name} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MessagesScreen;
