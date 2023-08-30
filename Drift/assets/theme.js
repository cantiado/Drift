import { createContext } from 'react';

const theme = {
  colors: {
    darkBlue: "#5281CE",
    purple: "#998CEB",
    yellow: "#E9D787",
    red: "#FF9A9F",
    lightBlue: "#9EF5FF",
    green: "#BAEBAC",
    white: 'white',
  },
  fonts: {
    mainFont: 'RedHatDisplay',
    funFont: 'CherryBombOne-Regular',
    regularFontSize: 24,
  },

  logo: {
    fontFamily: 'CherryBombOne-Regular',
    color: 'white',
    fontSize: 50,
    textShadowColor: '#A1D2CF',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },

  navigationIcons: {
    size: 30
  },

  navigationBg: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    bottom: 0,
    position: 'absolute'
  },
  container: {
    flex: 1,
    backgroundColor: '#9EF5FF',
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

  
};
export { theme };

const ThemeContext = createContext(theme);
export default ThemeContext;
  