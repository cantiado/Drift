import * as React from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, Appbar } from 'react-native-paper';
import {logInUser} from "../firebase/authentication";



const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let uid = "";
  
  const isValidFormInput = () => {
    if (!email) {
      alert('Please enter a valid email');
      return false;
    }
    if (!password) {
      alert('Please enter your password')
      return false;
    }

    return true; //form is filled out
  };

  const clearFormInput = () => {
    setEmail("");
    setPassword("");
  }


  const handleLogIn = async () => {
    if (isValidFormInput()) {
      uid = await logInUser(email, password);
      if (uid !== null) {
        clearFormInput();
        navigation.navigate("DriftNavigation");
      } else {
        alert('Invalid username or password. Please try again.');
      }
    }  
  }

  return (
    <View>
      <Appbar.Header>
        <Text variant="displayMedium">Thrift with Drift</Text>    
      </Appbar.Header>

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
          handleLogIn();
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
