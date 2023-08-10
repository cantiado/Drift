import * as React from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, Appbar } from 'react-native-paper';

const SignupScreen = ({navigation}) => {
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const checkFormInput = () => {
    if (!firstName.trim()) {
      alert('Please enter a first name');
      return;
    }
    if (!lastName.trim()) {
      alert('Please enter a last name');
      return;
    }
    if (!email.trim()) {
      alert('Please enter a valid email');
      return;
    }
    if (!confirmEmail.trim()) {
      alert('Please re-enter your email');
      return;
    }
    if(email !== confirmEmail) {
      alert('Emails do not match, please ensure they match')
    }
    if (!password.trim()) {
      alert('Please enter a password')
      return
    }
    if (!confirmPassword.trim()) {
      alert('Please enter re-enter your password')
      return
    }
    if(email !== confirmEmail) {
      alert('Emails do not match, please ensure they match')
    }
    if(password !== confirmPassword) {
      alert('Passwords do not match, please ensure they match')
      return
    }
  };

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
              onPress={() => {
                console.log('Pressed');
                checkFormInput();
    
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
