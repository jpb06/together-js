import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    white: {
        color: 'white'
    }
});

const HighlightedText = ({text}) => {
    const classes = useStyles();

    return (
        <span className={classes.white}>{text}</span>
    );
};

export default HighlightedText;