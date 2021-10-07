import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import { Switch } from "react-router-dom";


const darkTheme = () => {

  const [darkMode, setDarkMore] = useState(false);
  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        // pink and green play nicely together.
        main: purple[500],
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  });
return (
    <ThemeProvider theme={theme}>
    <Switch checked={darkMode} onChange={() => setDarkMore(!darkMode)}/>
    </ThemeProvider>
)
};

export default darkTheme;
