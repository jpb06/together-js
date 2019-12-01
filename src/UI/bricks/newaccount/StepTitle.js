import {makeStyles} from "@material-ui/core";
import {amber} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    stepTitle: {
        color: amber[500],
        margin: 0,
    },
    withBottomMargin: {
        marginBottom: theme.spacing(1)
    },
    centered: {
        // display: 'flex',
        // justifyContent: 'center',
        textAlign: 'center'
    }
}));

const StepTitle = ({title, secondaryText}) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={12} className={classes.centered}>
            <h3 className={clsx(classes.stepTitle, {
                [classes.withBottomMargin]: !secondaryText
            })}>
                {title}
            </h3>
            <div>{secondaryText}</div>
        </Grid>
    );
};

export default StepTitle;