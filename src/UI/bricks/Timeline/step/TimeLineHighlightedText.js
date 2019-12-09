import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    white: {
        color: 'white'
    }
}));

const TimeLineHighlightedText = ({text}) => {
    const classes = useStyles();

    return (
        <span className={classes.white}>{text}</span>
    );
};

export default TimeLineHighlightedText;