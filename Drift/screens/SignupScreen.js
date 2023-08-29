import * as React from 'react';
import  { useContext } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Appbar } from 'react-native-paper';
import { registerUser } from "../firebase/authentication";
import ThemeContext from '../assets/theme';

const SignupScreen = ({navigation}) => {
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const theme = useContext(ThemeContext);
  let code = 0; //Code will be used with the registerUser API function to determine if the user can successfully sign up or if there are errors

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.lightBlue,
      resizeMode: "cover",
      paddingVertical: '30%', 
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredView: {
      flex: 1,
      paddingHorizontal: '30%', 
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

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
    if(isValidFormInput()) {
      code = await registerUser(email, password, firstName, lastName);
      switch (code) {
        case 1:
          clearFormInput();
          navigation.navigate("DriftNavigation");
          break;
        case -10: 
          alert('Error: An account already exists with this email.');
          break;
        case -11:
          alert('Error: Invalid email. Please enter a valid email.');
          break;
        case -20:
          alert('Error: Please create a stronger password.\nPasswords need to contain 8 or more characters long.');
          break;
        case -40:
          alert('Error: Account could not be created. Please try again.');
          break;
        case -999:
          alert('Error: An unexpected error ocurred. Please try again.');
          break;
        default:
          alert('An unexpected error occured. Please try again.');
      }  
    }   
  }

  return (
    
      <ImageBackground source={require('./clouds.png')} style={styles.container}>
    
      <Text variant="headlSmall">Thrift with</Text>    
      <Text variant="displayLarge" style={{ fontFamily: theme.logo.font, color: theme.logo.color }}
      >Drift</Text>   
   
      <View style={styles.centeredView}>
      <TextInput
        label="First name"
        value={firstName}
        onChangeText={firstName => setfirstName(firstName)}
        mode="outlined"
        style={{ borderRadius: 25, width: '100%' }}
      />

      <TextInput
        label="Last name"
        value={lastName}
        onChangeText={lastName => setlastName(lastName)}
        mode="outlined"
        style={{ borderRadius: 25, width: '100%' }}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
        mode="outlined"
        style={{ borderRadius: 25, width: '100%' }}
      />

      <TextInput
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={password => setPassword(password)}
        mode="outlined"
        style={{ borderRadius: 25, width: '100%' }}
      />

      <TextInput
        label="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
        mode="outlined"
        style={{ borderRadius: 25, width: '100%' }}
      />

      <Button mode="elevated" 
          onPress={ () => {
            handleSignUp();
          }
        }
        style={{ width: '100%' }}
        >
        Sign up
       </Button>
       
       
      <Button 
        onPress={() => {
            navigation.navigate("Login");
          }
        }>
        Already have an account? Log in here
      </Button>
      </View>
    </ImageBackground>
  );
};


export default SignupScreen;
