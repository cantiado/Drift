import * as React from "react";
import DropDown from "react-native-paper-dropdown";

const ItemDemographicInput = () => {
  const [itemCategory, setItemCategory] = React.useState("");
  const [showDropDown, setShowDropDown] = React.useState(false);
  const categoryList = [
    { value: 'Women', label: 'Women', },
    { value: 'Men', label: 'Men', },
    { value: 'Children', label: 'Children' },
    { value: 'Unisex', label: 'Unisex' },
    { value: 'Anything', label: 'Anything' },
   ];

    return(
        <DropDown
              label={"Item Category"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={itemCategory}
              setValue={setItemCategory}
              list={categoryList} 
        />
    )
};


export {ItemDemographicInput};