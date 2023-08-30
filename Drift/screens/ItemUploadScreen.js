import * as React from "react";
import { useContext } from "react";
import { ScrollView, ImageBackground, View } from "react-native";
import {
  Text,
  Button,
  TextInput,
  DefaultTheme,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { getCurrentUserUID } from "../firebase/authentication";
import { getImagesFromLibrary } from "../firebase/filestorage";
import {
  createItem,
  isValidPrice,
  isValidQuality,
  isValidSize,
  isValidType,
  isValidDemographic,
  financial,
} from "../firebase/database";
import ThemeContext from "../assets/theme";

const ItemUploadScreen = () => {
  const appTheme = useContext(ThemeContext);
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "brown",
      roundness: 25,
      surface: "white",
      onSurface: "brown",
    },
  };
  //const [searchQuery, setSearchQuery] = React.useState("");
  const [itemName, setItemName] = React.useState("");
  const [itemImages, setItemImages] = React.useState([]);
  const [itemPrice, setItemPrice] = React.useState("");
  const [itemDescription, setItemDescription] = React.useState("");
  const [itemQuality, setItemQuality] = React.useState("");
  const [showQualityDropDown, setShowQualityDropDown] = React.useState(false);
  const qualityList = [
    { value: "", label: "Please select an option" },
    { value: "Used - Fair", label: "Fair" },
    { value: "Used - Good", label: "Good" },
    { value: "Used - Excellent", label: "Excellent" },
    { value: "Like New", label: "Like New" },
    { value: "Brand New", label: "Brand New" },
  ];
  const [itemSize, setItemSize] = React.useState("");
  const [itemBrand, setItemBrand] = React.useState("");
  const [itemType, setItemType] = React.useState("");
  const [showTypeDropDown, setShowTypeDropDown] = React.useState(false);
  const clothingList = [
    { value: "", label: "Please select an option" },
    { label: "Tops", value: "Tops" },
    { label: "Bottoms", value: "Bottoms" },
    { label: "Dresses", value: "Dresses" },
    { label: "Coats and Jackets", value: "Coats and Jackets" },
    { label: "Jumpsuits and Rompers", value: "Jumpsuits and Rompers" },
    { label: "Suits", value: "Suits" },
    { label: "Footwear", value: "Footwear" },
    { label: "Accessories", value: "Accessories" },
    { label: "Sleepwear", value: "Sleepwear" },
    { label: "Underwear", value: "Underwear" },
    { label: "Swimwear", value: "Swimwear" },
    { label: "Costume", value: "Costume" },
  ];
  const [itemCategory, setItemCategory] = React.useState("");
  const [showCategoryDropDown, setShowCategoryDropDown] = React.useState(false);
  const categoryList = [
    { value: "", label: "Please select an option" },
    { value: "Women", label: "Women" },
    { value: "Men", label: "Men" },
    { value: "Children", label: "Children" },
    { value: "Unisex", label: "Unisex" },
    { value: "Anything", label: "Anything" },
  ];

  const ITEM_TYPE_TITLE2VAL = {
    Tops: 0,
    Bottoms: 1,
    Dresses: 2,
    "Coats and Jackets": 3,
    "Jumpsuits and Rompers": 4,
    Suits: 5,
    Footwear: 6,
    Accessories: 7,
    Sleepwear: 8,
    Underwear: 9,
    Swimwear: 10,
    Costume: 11,
  };

  const ITEM_DEMOGRAPHIC_TITLE2VAL = {
    Men: 0,
    Women: 1,
    Children: 2,
    Unisex: 3,
    Anything: 4,
  };

  const ITEM_QUALITY_TITLE2VAL = {
    "Brand New": 0,
    "Like New": 1,
    "Used - Excellent": 2,
    "Used - Good": 3,
    "Used - Fair": 4,
  };

  const isValidFormInput = () => {
    if (!isValidPrice(itemPrice)) {
      alert("Error: Item price must be at least $0.00.");
      return false;
    }
    // if (!isValidSize(itemSize)){
    //   alert('Error: Invalid item size. Please enter an uppercase letter size or a numeric size.')
    //   return false;
    // }

    if (!isValidQuality(ITEM_QUALITY_TITLE2VAL[itemQuality])) {
      alert(
        "Invalid quality input, please select a valid option from the dropdown list."
      );
      return false;
    }
    if (!isValidType(ITEM_TYPE_TITLE2VAL[itemType])) {
      alert(
        "Invalid item type input, please select a valid option from the dropdown list."
      );
      return false;
    }
    if (!isValidDemographic(ITEM_QUALITY_TITLE2VAL[itemQuality])) {
      alert(
        "Invalid item category input, please select a valid option from the dropdown list."
      );
      return false;
    }
    return true;
  };

  const clearForm = () => {
    setItemName("");
    setItemImages([]);
    setItemPrice("");
    setItemDescription("");
    setItemQuality("");
    setItemSize("");
    setItemBrand("");
    setItemType("");
    setItemCategory("");
  };

  const handleFormSubmit = async () => {
    if (isValidFormInput()) {
      let success = await createItem(
        getCurrentUserUID(),
        itemName,
        financial(itemPrice),
        itemDescription,
        ITEM_TYPE_TITLE2VAL[itemType],
        ITEM_QUALITY_TITLE2VAL[itemQuality],
        itemSize,
        ITEM_DEMOGRAPHIC_TITLE2VAL[itemCategory],
        itemImages,
        itemBrand
      );
      if (success) {
        clearForm();
      } else {
        alert(
          "Error: Something went wrong and item was not uploaded. Please try again."
        );
      }
    }
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("./bgsun.png")}
        style={[
          appTheme.container,
          {
            backgroundColor: appTheme.colors.lightYellow,
            paddingTop: "10%",
            paddingBottom: "30%",
          },
        ]}
      >
        <Text
          variant="headlineLarge"
          style={{ fontFamily: appTheme.fonts.mainFont, color: "black" }}
        >
          Share the
        </Text>
        <Text variant="displayLarge" style={appTheme.logo}>
          Drift
        </Text>

        <View style={[appTheme.centeredView, { paddingVertical: "10%" }]}>
          <Button
            icon="camera"
            iconColor={'white'}
            mode="outlined"
            outlineColor={appTheme.colors.brown}
            textColor="white"
            style={{backgroundColor: appTheme.colors.brown, width: "100%"}}
            onPress={async () => {
              console.log("Pressed image upload");
              setItemImages(await getImagesFromLibrary());
            }}
          >
            Upload images
          </Button>

          <TextInput
            label="Item Name"
            value={itemName}
            mode="outlined"
            outlineColor={appTheme.colors.brown}
            style={{ width: "100%" }}
            maxLength={60}
            theme={theme}
            onChangeText={(itemName) => setItemName(itemName)}
          />
          <TextInput
            label="Price"
            value={itemPrice}
            mode="outlined"
            outlineColor={appTheme.colors.brown}
            theme={theme}
            style={{ width: "100%", paddingVertical: "5" }}
            left={<TextInput.Icon icon="currency-usd" />}
            //keyboardType="number-pad"
            onChangeText={(itemPrice) => setItemPrice(itemPrice)}
          />
          <TextInput
            label="Item Description"
            value={itemDescription}
            mode="outlined"
            outlineColor={appTheme.colors.brown}
            theme={theme}
            style={{ width: "100%", height: 100, paddingVertical: "5" }}
            maxLength={1000}
            multiline={true}
            onChangeText={(itemDescription) =>
              setItemDescription(itemDescription)
            }
          />
          <DropDown
            label={"Item Quality"}
            mode={"outlined"}
            visible={showQualityDropDown}
            style={{ width: "100%", paddingVertical: "5" }}
            showDropDown={() => setShowQualityDropDown(true)}
            onDismiss={() => setShowQualityDropDown(false)}
            value={itemQuality}
            setValue={setItemQuality}
            list={qualityList}
          />
          <TextInput
            label="Size (e.g. S, M, L, #)"
            value={itemSize}
            mode="outlined"
            outlineColor={appTheme.colors.brown}
            theme={theme}
            style={{ width: "100%", paddingVertical: "5" }}
            onChangeText={(itemSize) => setItemSize(itemSize)}
          />
          <TextInput
            label="Item Brand"
            value={itemBrand}
            mode="outlined"
            outlineColor={appTheme.colors.brown}
            theme={theme}
            style={{ width: "100%", paddingVertical: "5" }}
            onChangeText={(itemBrand) => setItemBrand(itemBrand)}
          />
          <DropDown
            label={"Item Type"}
            mode={"outlined"}
            visible={showTypeDropDown}
            showDropDown={() => setShowTypeDropDown(true)}
            onDismiss={() => setShowTypeDropDown(false)}
            value={itemType}
            style={{ width: "100%", paddingVertical: "5" }}
            setValue={setItemType}
            list={clothingList}
            theme={theme}
          />
          <DropDown
            label={"Item Category"}
            mode={"outlined"}
            visible={showCategoryDropDown}
            showDropDown={() => setShowCategoryDropDown(true)}
            onDismiss={() => setShowCategoryDropDown(false)}
            value={itemCategory}
            style={{ width: "100%", paddingVertical: "5" }}
            setValue={setItemCategory}
            list={categoryList}
            theme={theme}
          />
          <Button
            mode="elevated"
            textColor="black"
            style={{
              backgroundColor: appTheme.colors.lightBlue,
              marginTop: "5px",
              width: "100%",
              paddingVertical: "5",
              shadowColor: appTheme.colors.darkBlue, // Shadow color
              shadowOffset: { width: 5, height: 5 }, // Positioning of the shadow
              shadowOpacity: 1, // Opacity of the shadow
              shadowRadius: 0, // How blurry the shadow should be
              elevation: 5,
            }}
            onPress={() => {
              console.log("Sumbit item pressed");
              handleFormSubmit();
            }}
          >
            Submit
          </Button>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default ItemUploadScreen;
