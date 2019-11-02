import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
        padding: '0 0 8px',
        marginLeft: '12px',
        flex: '1 1 auto'
    },
    lifeLine: {
        minHeight: '24px',
        borderLeftStyle: 'solid',
        borderLeftWidth: '1px',
        display: 'block',
        borderColor: '#757575'
    }
}));

const TimeLineStepDivider = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <span className={classes.lifeLine}/>
        </div>
    );
};

export default TimeLineStepDivider;