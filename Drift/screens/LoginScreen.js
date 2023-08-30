import * as React from 'react';
import  { useContext } from 'react';
import { View, ImageBackground} from 'react-native';
import { Text, TextInput, Button, DefaultTheme  } from 'react-native-paper';
import {logInUser} from "../firebase/authentication";
import ThemeContext from '../assets/theme';


const LoginScreen = ({navigation}) => {
  const appTheme = useContext(ThemeContext);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: appTheme.colors.yellow, 
      roundness: 25,
    },
  };

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
    <ImageBackground source={require('./login_bg.png')} style={appTheme.container}>
      <Text variant="headlineMedium" style={{ fontFamily: appTheme.fonts.mainFont, color: 'white', fontWeight: 'bold'}}>Thrift with</Text>    
      <Text variant="displayLarge" 
      style={appTheme.logo}
      >Drift</Text>    

      
     <View style={appTheme.centeredView}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
        mode="outlined"
        outlineColor={appTheme.colors.darkRed}
        style={{width: '70%', paddingBottom:'5px' }}
        theme={theme}
      />

      <TextInput
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={password => setPassword(password)}
        mode="outlined"
        outlineColor={appTheme.colors.darkRed}
        style={{width: '70%', paddingBottom:'5px' }}
        theme={theme}
      />

      <Button 
        mode="elevated"
        onPress={() => {
            handleLogIn();
          }
        }
        textColor='black'
        outlineColor={appTheme.colors.yellow}
        style={{backgroundColor: appTheme.colors.yellow, width: '70%', marginTop:'5px' }}
        >
        Login
      </Button>
      </View>
      

      <Button 
        textColor='black'
        onPress={() => {
            navigation.navigate("Signup");
          }
        }>
        New? Sign up here
      </Button>

      {/* NEED TO REMOVE ONCE PAGES ARE DONE */}
      <Button
        mode="elevated"
        style={{backgroundColor: appTheme.colors.yellow, color: 'white'}}
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

