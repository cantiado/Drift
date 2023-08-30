import * as React from "react";
import Profile from "../components/Profile";

const SellerProfileScreen = ({ navigation, sellerID }) => {
  return (
    <Profile navigation={navigation} userID={sellerID} isMyProfile={false}/>
  );
};

export default SellerProfileScreen;