import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {
        textTransform: 'none'
    },
    topMargin: {
        marginTop: theme.spacing(2)
    }
}));

const SimpleButton = ({fullWidth, hasTopMargin, text, onClick}) => {
    const classes = useStyles();

    return (
        <Button
            fullWidth={fullWidth}
            variant="outlined"
            color="primary"
            className={clsx(classes.root, {
                [classes.topMargin]: hasTopMargin === true
            })}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default SimpleButton;