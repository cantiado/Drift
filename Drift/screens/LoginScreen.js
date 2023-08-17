import * as React from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, Appbar } from 'react-native-paper';
import {logInUser} from "../firebase/authentication";



const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let code = 0; //code indicates successful login or cause of failed login when attempting to logInUser
  
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
      code = await logInUser(email, password);
      switch (code) {
        case 1:
          clearFormInput();
          navigation.navigate("DriftNavigation");
          break;
        case -999:
          alert('Error: An unexpected error ocurred. Please try again.');
          break;
        default:
          alert('Invalid email or password. Please try again.');
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
            handleLogIn();
          }
        }>
        Log in
      </Button>

      <Button 
        onPress={() => {
            navigation.navigate("Signup");
          }
        }>
        New user? Sign up here
      </Button>

    </View>
  );
};

export default LoginScreen;
