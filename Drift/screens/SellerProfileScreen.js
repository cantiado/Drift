import { Appbar } from "react-native-paper";
import * as React from "react";
import { View } from "react-native";


const SellerProfileScreen = ({ navigation, sellerID }) => {
//fetchSellersItems
//fetchOwnerName
const [owner, setOwner] = React.useState("");
  getUserData(sellerID).then((res) =>
    setOwner(res.first + " " + res.last)
  );

const [items, setItems] = React.useState([]);
getUserData(sellerID)
    .then((user) => getManyItemData(user.items, -1))
    .then((items) => setItems(items));
  return (
    <View>

    </View>
  );
};

export default SellerProfileScreen;