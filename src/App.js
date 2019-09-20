import React from "react";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Login from "./UI/user/Login";
import {BrowserRouter, Route} from "react-router-dom";
import TimeLine from "./UI/main/TimeLine";
import Daily from "./UI/main/Daily";
import Squeleton from "./UI/main/Squeleton";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#49a39f'
        },
        secondary: {
            main: '#0d3c59'
        }
    }
});

const App = () => {

  return (
      <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
              <Route exact path="/" component={Login} />
              <Route path="/main" render={(props) => <Squeleton {...props} Component={TimeLine} />}  />
              <Route path="/daily" render={(props) => <Squeleton {...props} Component={Daily} />} />
          </BrowserRouter>
      </MuiThemeProvider>
  );
};

export default App;
