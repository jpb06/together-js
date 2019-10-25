import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    fabButton: {
        minWidth: '100% !important',
        justifyContent: 'left',
        textTransform: 'none',
        marginTop: theme.spacing(1),
        height: '30px !important'
    },
    buttonIcon: {
        justifyContent: 'left',
        lineHeight: '8px',
        marginLeft: '-12px'
    },
    buttonText: {
        justifyContent: 'center',
        width: '100%'
    }
}));

const FeedbackButton = ({handleSubmit, actionFeedback}) => {
    const classes = useStyles();

    return (
        <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            className={classes.fabButton}
            onClick={handleSubmit}
        >
            <div className={classes.buttonIcon}>
                {(actionFeedback.isPending)
                    ? <CircularProgress color="secondary" size={25}/>
                    : (actionFeedback.isErrored)
                        ? <ErrorIcon/>
                        : <AddCircleIcon/>
                }
            </div>
            <div className={classes.buttonText}>
                <Typography>{actionFeedback.text}</Typography>
            </div>
        </Fab>
    );
};

export default FeedbackButton;