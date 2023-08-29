import { createContext } from 'react';

const theme = {
  colors: {
    darkBlue: "#5281CE",
    purple: "#998CEB",
    yellow: "#E9D787",
    red: "#FF9A9F",
    lightBlue: "#9EF5FF",
    green: "#BAEBAC",
  },

  logo: {
    font: 'CherryBombOne-Regular',
    color: 'white',
  }
};
export { theme };

const ThemeContext = createContext(theme);
export default ThemeContext;
  