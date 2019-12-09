import React from "react";
import {makeStyles} from "@material-ui/core";
import {amber} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    iconContainer: {
        display: 'flex',
        flexShrink: '0',
        paddingRight: '8px'
    },
    contentContainer: {
        width: '100%',
        fontSize: 'large',
        color: amber[300]
    }
}));

const TimelineStepTitle = ({IconComponent, text}) => {
    const classes = useStyles();

    return (
        <div>
            <span className={classes.container}>
                <span className={classes.iconContainer}>
                    <IconComponent/>
                </span>
                <span className={classes.contentContainer}>
                    {text}
                </span>
            </span>
        </div>
    );
};

export default TimelineStepTitle;