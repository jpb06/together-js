import React from "react";
import {fade} from "@material-ui/core/styles";
import clsx from "clsx";
import withStyles from "@material-ui/core/styles/withStyles";
import {amber} from "@material-ui/core/colors";

const styles = theme => ({
    topPadding: {
        paddingTop: theme.spacing(8),
    },
    root: {
        textAlign: 'center',
    },
    whiteColored: {
        color: fade('#fff', 0.35)
    },
    amberColored: {
        color: amber[500]
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

const Waiting = ({classes, addTopPadding, IconComponent, text, color}) => {

    return (
        <div className={clsx(classes.root, {
            [classes.topPadding]: addTopPadding === true,
            [classes.amberColored]: color === 'amber',
            [classes.whiteColored]: color === 'white'
        })}>
            <IconComponent className={clsx(classes.progressIcon, classes.spinner)}/>
            <br/>
            {text}
        </div>
    );
};

export default withStyles(styles)(Waiting);