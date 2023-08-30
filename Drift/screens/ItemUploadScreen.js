import * as React from "react";
import { ScrollView } from "react-native";
import { Appbar,Text, Button, TextInput, IconButton, MD3Colors, HelperText } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { getCurrentUserUID } from "../firebase/authentication";
import { getImagesFromLibrary } from "../firebase/filestorage"
import { createItem, isValidPrice, isValidQuality, isValidSize, isValidType, isValidDemographic } from "../firebase/database";

const ItemUploadScreen = () => {
    //const [searchQuery, setSearchQuery] = React.useState("");
    const [itemName, setItemName] = React.useState("");
    const [itemImages, setItemImages] = React.useState([]);
    const [itemPrice, setItemPrice] = React.useState("");
    const [itemDescription, setItemDescription] = React.useState("");
    const [itemQuality, setItemQuality] = React.useState("");
    const [showQualityDropDown, setShowQualityDropDown] = React.useState(false);
    const qualityList = [
      { value: '', label: 'Please select an option'},
      { value: 'Used - Fair', label: 'Fair', },
      { value: 'Used - Good', label: 'Good', },
      { value: 'Used - Excellent', label: 'Excellent' },
      { value: 'Like New', label: 'Like New' },
      { value: 'Brand New', label: 'Brand New' },
    ];
    const [itemSize, setItemSize] = React.useState("");
    const [itemBrand, setItemBrand] = React.useState("");
    const [itemType, setItemType] = React.useState("");
    const [showTypeDropDown, setShowTypeDropDown] = React.useState(false);
    const clothingList = [
        { value: '', label: 'Please select an option'},
        { label: "Tops", value: "Tops",},
        { label: "Bottoms", value: "Bottoms",},
        { label: "Dresses", value: "Dresses",},
        { label: "Coats and Jackets", value: "Coats and Jackets",},
        { label: "Jumpsuits and Rompers", value: "Jumpsuits and Rompers",},
        { label: "Suits", value: "Suits",},
        { label: "Footwear", value: "Footwear",},
        { label: "Accessories", value: "Accessories",},
        { label: "Sleepwear", value: "Sleepwear",},
        { label: "Underwear", value: "Underwear",},
        { label: "Swimwear", value: "Swimwear",},
        { label: "Costume", value: "Costume",}, 
    ];
    const [itemCategory, setItemCategory] = React.useState("");
    const [showCategoryDropDown, setShowCategoryDropDown] = React.useState(false);
    const categoryList = [
      { value: '', label: 'Please select an option'},
      { value: 'Women', label: 'Women', },
      { value: 'Men', label: 'Men', },
      { value: 'Children', label: 'Children' },
      { value: 'Unisex', label: 'Unisex' },
      { value: 'Anything', label: 'Anything' },
     ];

     const ITEM_TYPE_TITLE2VAL = {
      "Tops" : 0,
      "Bottoms" : 1,
      "Dresses" : 2,
      "Coats and Jackets" : 3,
      "Jumpsuits and Rompers" : 4,
      "Suits" : 5,
      "Footwear" : 6,
      "Accessories" : 7,
      "Sleepwear" : 8,
      "Underwear" : 9,
      "Swimwear" : 10,
      "Costume" : 11,
    };

    const ITEM_DEMOGRAPHIC_TITLE2VAL = {
      "Men" : 0,
      "Women" :  1,
      "Children" : 2,
      "Unisex" : 3,
      "Anything" : 4,
    };
    
    const ITEM_QUALITY_TITLE2VAL = {
      "Brand New" : 0,
      "Like New" : 1,
      "Used - Excellent" : 2,
      "Used - Good" : 3,
      "Used - Fair" : 4,
    };
  
     const isValidFormInput = () => {
        if (!isValidPrice(itemPrice)){
          alert('Error: Item price must be at least $0.00.')
          return false;
        }
        // if (!isValidSize(itemSize)){
        //   alert('Error: Invalid item size. Please enter an uppercase letter size or a numeric size.')
        //   return false;
        // }
        
        if (!isValidQuality(ITEM_QUALITY_TITLE2VAL[itemQuality])){
          alert('Invalid quality input, please select a valid option from the dropdown list.')
          return false;
        }
        if (!isValidType(ITEM_TYPE_TITLE2VAL[itemType])){
          alert('Invalid item type input, please select a valid option from the dropdown list.')
          return false;
        }
        if (!isValidDemographic(ITEM_QUALITY_TITLE2VAL[itemQuality])){
          alert('Invalid item category input, please select a valid option from the dropdown list.')
          return false;
        }
        return true;
     };
     
     const clearForm = () => {
      setItemName("");
      setItemImages([])
      setItemPrice("");
      setItemDescription("");
      setItemQuality("");
      setItemSize("");
      setItemBrand("");
      setItemType("");
      setItemCategory("");
     };

     const handleFormSubmit = async () => {
      if (isValidFormInput()){
        let success = await createItem(getCurrentUserUID(), itemName, itemPrice, itemDescription, ITEM_TYPE_TITLE2VAL[itemType], ITEM_QUALITY_TITLE2VAL[itemQuality], itemSize, ITEM_DEMOGRAPHIC_TITLE2VAL[itemCategory], itemImages, itemBrand);
        if (success){
          clearForm();
        } else{
          alert('Error: Something went wrong and item was not uploaded. Please try again.');
        }
      }
     }

    return (
      <ScrollView>
        <Appbar.Header>
          <Text variant="headlineSmall">Upload an Item</Text>    
        </Appbar.Header>
        <TextInput
            label="Item Name"
            value={itemName}
            mode="outlined"
            maxLength={60}
            onChangeText={itemName => setItemName(itemName)}       
        />
        <Text>Upload Images, up to 5</Text>
        <IconButton
            icon="camera"
            mode="contained"
            iconColor={MD3Colors.primary50}
            size={20}
            onPress={ async () => {
                console.log('Pressed image upload')
                setItemImages( await getImagesFromLibrary());
              }
            }
        />
        <TextInput
            label="Price"
            value={itemPrice}
            mode="outlined"
            left={<TextInput.Icon icon="currency-usd"/>}
            //keyboardType="number-pad" 
            onChangeText={itemPrice => setItemPrice(itemPrice)}    
        />  
        <TextInput
            label="Item Description"
            value={itemDescription}
            mode="outlined"
            maxLength={1000}
            multiline={true}
            style={{height:100}}
            onChangeText={itemDescription => setItemDescription(itemDescription)}       
        />   
        <Text>Item Quality</Text>
        <DropDown
              label={"Item Quality"}
              mode={"outlined"}
              visible={showQualityDropDown}
              showDropDown={() => setShowQualityDropDown(true)}
              onDismiss={() => setShowQualityDropDown(false)}
              value={itemQuality}
              setValue={setItemQuality}
              list={qualityList}
              
        />
        <TextInput
                label="Size"
                value={itemSize}
                mode="outlined"
                onChangeText={itemSize => setItemSize(itemSize)} 
        />
        <Text>e.g. S, M, L, etc. or a numerical size</Text>
        <TextInput
            label="Item Brand"
            value={itemBrand}
            mode="outlined"
            onChangeText={itemBrand => setItemBrand(itemBrand)}       
        /> 
        <DropDown
              label={"Item Type"}
              mode={"outlined"}
              visible={showTypeDropDown}
              showDropDown={() => setShowTypeDropDown(true)}
              onDismiss={() => setShowTypeDropDown(false)}
              value={itemType}
              setValue={setItemType}
              list={clothingList}
              
        />
        <Text>Item Category:</Text>
        <DropDown
              label={"Item Category"}
              mode={"outlined"}
              visible={showCategoryDropDown}
              showDropDown={() => setShowCategoryDropDown(true)}
              onDismiss={() => setShowCategoryDropDown(false)}
              value={itemCategory}
              setValue={setItemCategory}
              list={categoryList} 
        />
        <Button 
          mode="elevated"
          onPress={() => {
            console.log("Sumbit item pressed");
            handleFormSubmit();
          }
          }>
          Submit
        </Button>
      </ScrollView>
    );
  };
  
  export default ItemUploadScreen;