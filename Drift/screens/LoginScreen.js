import * as React from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, Appbar } from 'react-native-paper';


//this is for text, not entirely sure if needed
const MyComponent = () => (
  <>
    <Text variant="displayLarge">Display Large</Text>
    <Text variant="displayMedium">Display Medium</Text>
    <Text variant="displaySmall">Display small</Text>

    <Text variant="headlineLarge">Headline Large</Text>
    <Text variant="headlineMedium">Headline Medium</Text>
    <Text variant="headlineSmall">Headline Small</Text>

    <Text variant="titleLarge">Title Large</Text>
    <Text variant="titleMedium">Title Medium</Text>
    <Text variant="titleSmall">Title Small</Text>

    <Text variant="bodyLarge">Body Large</Text>
    <Text variant="bodyMedium">Body Medium</Text>
    <Text variant="bodySmall">Body Small</Text>

    <Text variant="labelLarge">Label Large</Text>
    <Text variant="labelMedium">Label Medium</Text>
    <Text variant="labelSmall">Label Small</Text>
 </>
);


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const checkFormInput = () => {
    if (!email) {
      alert('Please enter a valid email');
      return;
    }
    if (!password) {
      alert('Please enter your password')
      return
    }
  };

  return (
    <View>
      <Appbar.Header>
        <Text variant="displayMedium">Thrift with Drift</Text>
        
      </Appbar.Header>
      {/* <Text variant="titleLarge">Login:</Text> */}

      <TextInput
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
      />

      <TextInput
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={password => setPassword(password)}
      />

      <Button 
        mode="elevated"
        onPress={() => {
          console.log('Pressed');
          checkFormInput();
          console.log(email);
          console.log(password);
          }
        }>
        Log in
      </Button>

      <Button 
        onPress={() => {
          console.log("sign up pressed");
          navigation.navigate("Signup");
          }
        }>
        New user? Sign up here
      </Button>

    </View>
  );
};

export default LoginScreen;
