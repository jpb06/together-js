import TimeLineStep from "./step/TimeLineStep";

import LensIcon from '@material-ui/icons/Lens';
import TimelineStepTitle from "./step/TimelineStepTitle";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        padding: '24px',
        flexDirection: 'column',
        marginBottom: '15px'
    },
}));

const TimelineShard = ({data}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            {data.map(el => (
                <TimeLineStep
                    key={el.entry._id}
                    type={el.type}
                    title={el.shortTitle}
                    data={el.entry}
                />
            ))}
            <TimelineStepTitle
                IconComponent={LensIcon}
            />
        </Paper>
    );
};

export default TimelineShard;