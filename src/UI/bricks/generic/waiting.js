import LoopIcon from "@material-ui/icons/Loop";
import React from "react";
import {fade} from "@material-ui/core/styles";
import clsx from "clsx";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing(8),
        textAlign: 'center',
        color: fade('#fff', 0.25),
    },
    progressIcon: {
        height: '70px',
        width: '70px'
    },
    spinner: {
        animationName: '$spin',
        animationDuration: '4000ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear'
    },
    '@keyframes spin': {
        from: {transform: 'rotate(0deg)'},
        to: {transform: 'rotate(360deg)'}
    },
});

const Waiting = ({classes}) => {
    return (
        <div className={classes.root}>
            <LoopIcon className={clsx(classes.progressIcon, classes.spinner)}/>
            <br/>
            Sinister Dexter Has a Broken Spirometer
        </div>
    );
};

export default withStyles(styles)(Waiting);