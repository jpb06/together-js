import React from "react";
import {fade} from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing(8),
        textAlign: 'center',
        color: fade('#fff', 0.8)
    },
    title: {
        fontSize: 'xx-large',
        fontweight: '600'
    },
    errorIcon: {
        height: '100px',
        width: '100px'
    },
    spinner: {
        animationName: '$spin',
        animationDuration: '600ms',
        animationIterationCount: '1',
        animationTimingFunction: 'linear'
    },
    '@keyframes spin': {
        from: {transform: 'rotate(180deg)'},
        to: {transform: 'rotate(0deg)'}
    }
});

const TopLevelFeedback = ({classes, Icon, title, text}) => {
    return (
        <div className={classes.root}>
            <Icon className={clsx(classes.errorIcon, classes.spinner)}/>
            <div className={classes.title}>{title}</div>
            {text}
        </div>
    );
};

export default withStyles(styles)(TopLevelFeedback);