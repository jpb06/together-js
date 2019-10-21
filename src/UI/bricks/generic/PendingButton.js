import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import {makeStyles} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {fade} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        marginRight: '-6px',
        marginBottom: '-17px'
    },
    actionInProgress: {
        position: 'absolute',
        zIndex: 1,
        color: green[500],
        backgroundColor: fade(theme.palette.primary.contrastText, 0.3)
    },
    spinner: {
        position: 'relative',
        top: -6,
        left: -6
    }
}));

const PendingButton = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <IconButton
                edge="end"
                aria-label="delete"
                className={classes.actionInProgress}
            >
                <DeleteIcon/>
            </IconButton>
            <CircularProgress className={classes.spinner} color="primary" size={60}/>
        </div>
    );
};

export default PendingButton;