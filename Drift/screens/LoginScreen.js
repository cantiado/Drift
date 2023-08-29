import * as React from 'react';
import  { useContext } from 'react';
import { View, Image, StyleSheet, ImageBackground} from 'react-native';
import { Text, TextInput, Button, Appbar } from 'react-native-paper';
import {logInUser} from "../firebase/authentication";
import ThemeContext from '../assets/theme';

const LoginScreen = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let code = 0; //code indicates successful login or cause of failed login when attempting to logInUser

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
      paddingHorizontal: '20%', 
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
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
    <ImageBackground source={require('./login_bg.png')} style={styles.container}>
      <Text variant="headlineSmall">Thrift with</Text>    
      <Text variant="displayLarge" 
      style={{ fontFamily: theme.logo.font, color: theme.logo.color }}
      >Drift</Text>    

      
     <View style={styles.centeredView}>
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

      <Button 
        mode="elevated"
        onPress={() => {
            handleLogIn();
          }
        }
        style={{ width: '100%' }}
        >
        Log in
      </Button>
      </View>
      

      <Button 
        onPress={() => {
            navigation.navigate("Signup");
          }
        }>
        New? Sign up here
      </Button>

      {/* NEED TO REMOVE ONCE PAGES ARE DONE */}
      <Button
        mode="elevated"
        onPress={()=> {
          navigation.navigate("DriftNavigation");
          }
        }>
          Dev
      </Button>
    </ImageBackground>
  );
};

export default LoginScreen;

