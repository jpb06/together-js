import Waiting from "../generic/Waiting";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    waitingContainer: {
        height: '290px'
    },
}));

const NewAccountWaitingContainer = ({text, IconComponent}) => {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.waitingContainer}
        >
            <Waiting
                addTopPadding={false}
                IconComponent={IconComponent}
                text={text}
                color="amber"
            />
        </Grid>
    );
};

export default NewAccountWaitingContainer;