import { Appbar } from "react-native-paper";

const SavedScreen = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Saved" />
        <Appbar.Action icon="plus-circle" onPress={() => {}} />
      </Appbar.Header>
    </View>
  );
};

export default SavedScreen;
