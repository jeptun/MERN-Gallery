import React  from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/home";
import Auth from "./components/Auth/Auth";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import purple from "@material-ui/core/colors/purple";

const App = () => {
 
  const theme = createTheme({
    palette: {
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
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Container maxwidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
