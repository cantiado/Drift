import * as React from "react";
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';

const ItemDemographicInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView>
      <Text>Item Category</Text>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          { value: 'Women', label: 'Women', },
          { value: 'Men', label: 'Men', },
          { value: 'Children', label: 'Children' },
          { value: 'Unisex', label: 'Unisex' },
          { value: 'Anything', label: 'Anything' },
        ]}
      />
    </SafeAreaView>
  );
};


export {ItemDemographicInput};