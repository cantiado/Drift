import { Appbar } from "react-native-paper";
import * as React from 'react';
import { View } from 'react-native';

const SavedScreen = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Saved" />
        <Appbar.Action icon="plus-circle" onPress={() => {}} />
      </Appbar.Header>
    </View>
  );
};

export default SavedScreen;
