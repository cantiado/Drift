import * as React from "react";
import Profile from "../components/Profile";

const SellerProfileScreen = ({ navigation, sellerID }) => {
  return (
    <Profile userID={sellerID} isMyProfile={false}/>
  );
};

export default SellerProfileScreen;