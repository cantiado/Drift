import * as React from "react";
import Profile from "../components/Profile";
import { getCurrentUserUID } from "../firebase/authentication";

const MyProfileScreen = ({ navigation }) => {
  return (
      <Profile navigation={navigation} userID={getCurrentUserUID()} isMyProfile={true}/>
     
  );
};

export default MyProfileScreen;
