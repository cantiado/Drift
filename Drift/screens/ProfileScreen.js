import { Appbar } from "react-native-paper";

const ProfileScreen = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="plus-circle" onPress={() => {}} />
      </Appbar.Header>
    </View>
  );
};

export default ProfileScreen;