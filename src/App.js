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
import FeedbackSnackbar from "./UI/bricks/generic/errors/FeedbackSnackbar";

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

    const feedbackQueue = React.useRef([]);
    const [feedbackSnackbarInfo, setFeedbackSnackbarInfo] = React.useState({key: '', variant: 'error', message: ''});
    const [isFeedbackSnackbarOpen, setIsFeedbackSnackbarOpen] = React.useState(undefined);

    // unstacking one message to display and displaying the taskbar
    const processFeedbackQueue = () => {
        if (feedbackQueue.current.length > 0) {
            setFeedbackSnackbarInfo(feedbackQueue.current.shift());
            setIsFeedbackSnackbarOpen(true);
        }
    };

    // Dispatch from a child stating there is a message to display
    const messageRequestedFromChild = (variant, message) => {
        feedbackQueue.current.push({
            variant,
            message,
            key: new Date().getTime(),
        });

        if (isFeedbackSnackbarOpen) {
            // immediately begin dismissing current message
            // to start showing new one
            setIsFeedbackSnackbarOpen(false);
        } else {
            processFeedbackQueue();
        }
    };

    const closeFeedbackSnackbar = () => setIsFeedbackSnackbarOpen(false);
    const exitFeedbackSnackbar = () => processFeedbackQueue();

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <Route exact path="/" component={Login}/>
                <Route path="/main" render={(props) =>
                    <Squeleton {...props} showSnackbar={messageRequestedFromChild} Component={TimeLine}/>}
                />
                <Route path="/daily" render={(props) =>
                    <Squeleton {...props} showSnackbar={messageRequestedFromChild} Component={Daily}/>}
                />
                <Route path="/account" render={(props) =>
                    <Squeleton {...props} showSnackbar={messageRequestedFromChild} Component={MyAccount}/>}
                />
                <Route path="/newaccount" render={(props) =>
                    <NewAccount {...props} showSnackbar={messageRequestedFromChild}/>}
                />
            </BrowserRouter>
            <FeedbackSnackbar
                closeFeedbackSnackbar={closeFeedbackSnackbar}
                exitFeedbackSnackbar={exitFeedbackSnackbar}
                isOpen={isFeedbackSnackbarOpen}
                feedbackSnackbarInfo={feedbackSnackbarInfo}
            />
        </MuiThemeProvider>
    );
};

export default App;