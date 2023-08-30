import * as React from "react";;
import { Avatar } from "@rneui/themed";
import { logOut } from "../firebase/authentication";
import ProductCard from "./ProductCard";
import { View, FlatList, Text, Dimensions} from "react-native";
import { getManyItemData, getUserData } from "../firebase/database";
import { Appbar} from "react-native-paper";


const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 3 - 25;

const Profile = ({userID, isMyProfile}) => {

    const [owner, setOwner] = React.useState("");
    const [items, setItems] = React.useState([]);

    getUserData(userID).then((res) =>
        setOwner(res.first + " " + res.last)
    );

    getUserData(userID)
    .then((user) => getManyItemData(user.items, -1))
    .then((items) => setItems(items));

  const handleLogOut = async () => {    
    if (await logOut()) {
      navigation.navigate("Login");
    }
  };

  const renderProduct = ({ item }) => (
    <ProductCard item={item} cardWidth={cardWidth} showInfo={false}/>
  );

  return (
    <View>
      <Appbar.Header>
        <Avatar
          size={32}
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <Text>{owner}'s Profile!</Text>


        {isMyProfile && <Appbar.Action
          disabled={false}
          icon={props => <Text>Sign out</Text>}
          onPress={handleLogOut}
        />}
      </Appbar.Header>
      <Text>Check out {owner}'s items!</Text>
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