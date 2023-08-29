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

  logo: {
    font: 'CherryBombOne-Regular',
    color: 'white',
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
  }

  
};
export { theme };

const ThemeContext = createContext(theme);
export default ThemeContext;
  