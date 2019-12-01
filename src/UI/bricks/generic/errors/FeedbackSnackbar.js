import Snackbar from "@material-ui/core/Snackbar";
import FeedbackSnackbarContent from "./FeedbackSnackbarContent";
import React from "react";

const FeedbackSnackbar = ({isOpen, closeFeedbackSnackbar, exitFeedbackSnackbar, feedbackSnackbarInfo}) => {

    // Manually closing the errors
    const handleFeedbackSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        closeFeedbackSnackbar();
    };

    return (
        <Snackbar
            key={feedbackSnackbarInfo.key}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={isOpen}
            autoHideDuration={5000}
            onClose={handleFeedbackSnackbarClose}
            onExited={exitFeedbackSnackbar}
        >
            <FeedbackSnackbarContent
                onClose={handleFeedbackSnackbarClose}
                variant={feedbackSnackbarInfo.variant}
                message={feedbackSnackbarInfo.message}
            />
        </Snackbar>
    );
};

export default FeedbackSnackbar;

