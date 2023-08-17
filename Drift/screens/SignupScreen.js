import * as React from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, Appbar } from 'react-native-paper';
import { registerUser } from "../firebase/authentication";
import { getCurrentUserUID } from "../firebase/authentication";

const SignupScreen = ({navigation}) => {
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  let code = 0; //Code will be used with the registerUser API function to determine if the user can successfully sign up or if there are errors

  const isValidFormInput = () => {
    if (!firstName) {
      alert('Please enter a first name');
      return false;
    }
    if (!lastName) {
      alert('Please enter a last name');
      return false;
    }
    if (!email) {
      alert('Please enter a valid email');
      return false;
    }
    if (!confirmEmail) {
      alert('Please re-enter your email');
      return false;
    }
    if(email !== confirmEmail) {
      alert('Emails do not match, please ensure they match');
      return false;
    }
    if (!password) {
      alert('Please enter a password');
      return false;
    }
    if (!confirmPassword) {
      alert('Please enter re-enter your password');
      return false;
    }
  
    if(password !== confirmPassword) {
      alert('Passwords do not match, please ensure they match');
      return false;
    }

    return true; //form is filled out and matching fields are matching
  };

  const clearFormInput = () => {
    setfirstName("");
    setlastName("");
    setEmail("");
    setConfirmEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  const handleSignUp = async () => {
    console.log('Pressed');
    if(isValidFormInputFormInput()) {
      code = await registerUser(email, password, firstName, lastName);
      console.log(code);
      switch (code) {
        //to be added when determined
      }
      
      //on successful signup:
      console.log("Howdy,", getCurrentUserUID());
      clearFormInput();
      navigation.navigate("DriftNavigation");
      
    }
    
  }

  return (
    <View>
      <Appbar.Header>
        <Text variant="displayMedium">Thrift with Drift</Text>
        
      </Appbar.Header>
      {/* <Text variant="titleLarge">Sign up:</Text> */}

      <TextInput
        label="First name"
        value={firstName}
        onChangeText={firstName => setfirstName(firstName)}
      />

      <TextInput
        label="Last name"
        value={lastName}
        onChangeText={lastName => setlastName(lastName)}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
      />

      <TextInput
        label="Confirm email"
        value={confirmEmail}
        onChangeText={confirmEmail => setConfirmEmail(confirmEmail)}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={password => setPassword(password)}
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
      />

      <Button mode="elevated" 
          onPress={ () => {
            console.log("Pressed");
            handleSignUp();
          }
        }>
        Sign up
       </Button>
       
      <Button 
        onPress={() => {
          console.log('return to login screen pressed');
          navigation.navigate("Login");
          }
        }>
        Already have an account? Log in here
      </Button>

    </View>
  );
};

export default SignupScreen;
