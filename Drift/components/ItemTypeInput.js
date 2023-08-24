import * as React from "react";
import DropDown from "react-native-paper-dropdown";

const ItemTypeInput = () => {
    const [itemType, setItemType] = React.useState("");
    const [showDropDown, setShowDropDown] = React.useState(false);
    const clothingList = [
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

    return(
        <DropDown
              label={"Item type"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={itemType}
              setValue={setItemType}
              list={clothingList}
              
        />
    )
};

export {ItemTypeInput}