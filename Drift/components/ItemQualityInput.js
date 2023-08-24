import * as React from "react";
import { SafeAreaView } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';

const ItemQualityInput = () => {
  const [value, setValue] = React.useState('');

  return (
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          { value: 'Used - Fair', label: 'Fair', },
          { value: 'Used - Good', label: 'Good', },
          { value: 'Used - Excellent', label: 'Excellent' },
          { value: 'Like New', label: 'Like New' },
          { value: 'Brand New', label: 'Brand New' },
        ]}
      />
  );
};


export {ItemQualityInput};