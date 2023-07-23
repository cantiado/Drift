import { Searchbar } from "react-native-paper";
import { Appbar } from 'react-native-paper';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View>
          <Appbar.Header>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <IconButton
        icon="basket"
        size={20}
        onPress={() => console.log("Pressed")}
      />
      </Appbar.Header>
    </View>
  );
};

export default HomeScreen;
