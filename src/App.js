import React from "react";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Login from "./UI/highlevel/Login";
import {BrowserRouter, Route} from "react-router-dom";
import TimeLine from "./UI/highlevel/TimeLine";
import Daily from "./UI/highlevel/Daily";
import Squeleton from "./UI/bricks/generic/containers/Squeleton";
import MyAccount from "./UI/highlevel/MyAccount";
import NewAccount from "./UI/highlevel/NewAccount";

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
            <CssBaseline/>
            <BrowserRouter>
                <Route exact path="/" component={Login}/>
                <Route path="/main" render={(props) => <Squeleton {...props} Component={TimeLine}/>}/>
                <Route path="/daily" render={(props) => <Squeleton {...props} Component={Daily}/>}/>
                <Route path="/account" render={(props) => <Squeleton {...props} Component={MyAccount}/>}/>
                <Route path="/newaccount" component={NewAccount}/>
            </BrowserRouter>
        </MuiThemeProvider>
    );
};

export default App;