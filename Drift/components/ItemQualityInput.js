import * as React from "react";
import DropDown from "react-native-paper-dropdown";

const ItemQualityInput = () => {
  const [itemQuality, setItemQuality] = React.useState("");
    const [showDropDown, setShowDropDown] = React.useState(false);
    const qualityList = [
      { value: 'Used - Fair', label: 'Fair', },
      { value: 'Used - Good', label: 'Good', },
      { value: 'Used - Excellent', label: 'Excellent' },
      { value: 'Like New', label: 'Like New' },
      { value: 'Brand New', label: 'Brand New' },
        
        
    ];

    return(
        <DropDown
              label={"Item Quality"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={itemQuality}
              setValue={setItemQuality}
              list={qualityList}
              
        />
    )
};

export {ItemQualityInput};