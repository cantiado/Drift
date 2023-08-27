import * as React from "react";
import { View } from "react-native";
import { Button, Card, Text, Divider } from 'react-native-paper';

const productItem = { 
  id: "1", user: "user5090", title: "pants", 
  image: require('./HomeScreen/pantsExample.jpg'), 
  brand: "Levis", size: "M", condition: "Brand new",
  color: "black", price: "$15",
  description: "this is a cool description of the pants above. This is a cool description of the pants above",
  hashtags: "#slay"};

const ProductScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 10 }}>
    <Card style={{ borderRadius: 15, elevation: 0}}>
      {/* Card Image */}
      <Card.Cover source={productItem.image} />

      {/* Card Title */}
      <Card.Title title={`${productItem.brand} - ${productItem.title} -${productItem.price}`} subtitle= {`Size: ${productItem.size} ${productItem.condition}`}/>

      {/* Card Content */}
      <Card.Content>
      <Text><Text style={{fontWeight: 'bold'}}>{productItem.user}</Text>
        {productItem.description}</Text>
        <Divider style={{ backgroundColor: 'transparent', height: 10 }} />
        <Text>{`${productItem.hashtags}`}</Text>
        <Text>{`Color: ${productItem.color}`}</Text>
      </Card.Content>

      {/* Card Actions */}
      <Card.Actions>
        <Button onPress={() => console.log('More')}>More from {productItem.user}</Button>
        <Button onPress={() => console.log('Save')}>Save</Button>
        <Button onPress={() => console.log('Clicked!')}>Buy</Button>
      </Card.Actions>
    </Card>
  </View>
  );
};

export default ProductScreen;
