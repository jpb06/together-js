import MenuAppBar from "../menu/MenuAppBar";
import React, {useCallback, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import {clearLocalStorage, getFromLocalStorage} from "../../../logic/local.store";
import {useHistory} from "react-router";
import TogetherApi from "../../../logic/api/setup/together.api";
import LinearProgress from "@material-ui/core/LinearProgress";
import FeedbackSnackbar from "./errors/FeedbackSnackbar";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
    },
    media: {
        height: '15px'
    }
}));

const Squeleton = ({Component, ...rest}) => {
    let history = useHistory();
    const classes = useStyles();

    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const feedbackQueue = React.useRef([]);
    const [feedbackSnackbarInfo, setFeedbackSnackbarInfo] = React.useState({key: '', variant: 'error', message: ''});
    const [isFeedbackSnackbarOpen, setIsFeedbackSnackbarOpen] = React.useState(undefined);

    // This will trigger everytime a navigation occurs
    useEffect(() => {
        document.body.style.backgroundImage = "url('/static/images/patterns/hex.jpg')";
        document.body.style.backgroundRepeat = 'repeat';

        setIsLoading(true);
        TogetherApi.setup(history);

        let token = getFromLocalStorage('token');
        let expirationDate = getFromLocalStorage('expiration');
        if (!token || !expirationDate || Date.parse(expirationDate) < new Date()) {
            clearLocalStorage();
            history.push({
                pathname: '/'
            });
        }

        setIsReady(true);
        setIsLoading(false);
    }, [history]);

    // unstacking one message to display and displaying the taskbar
    const processFeedbackQueue = () => {
        if (feedbackQueue.current.length > 0) {
            setFeedbackSnackbarInfo(feedbackQueue.current.shift());
            setIsFeedbackSnackbarOpen(true);
        }
    };

    // keep function reference (otherwise the function reference would change with each render...)
    const reportLoading = useCallback((isLoading) => {
        setIsLoading(isLoading);
    }, []);

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
        <div>
            <MenuAppBar/>
            {isLoading && <LinearProgress/>}
            <section className={classes.root}>
                {isReady &&
                <Component reportLoading={reportLoading} showSnackbar={messageRequestedFromChild} {...rest} />}
            </section>
            <FeedbackSnackbar
                closeFeedbackSnackbar={closeFeedbackSnackbar}
                exitFeedbackSnackbar={exitFeedbackSnackbar}
                isOpen={isFeedbackSnackbarOpen}
                feedbackSnackbarInfo={feedbackSnackbarInfo}
            />
        </div>
    );
};

export default Squeleton;