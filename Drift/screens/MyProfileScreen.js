import Profile from "../components/Profile";
import { getCurrentUserUID } from "../firebase/authentication";
import { logOut } from "../firebase/authentication";
import ThemeContext from '../assets/theme';
import React, { useContext } from "react";

const MyProfileScreen = ({ navigation }) => {
  return (
    <Profile userID={getCurrentUserUID()} isMyProfile={true}/>
  );
};

export default MyProfileScreen;
