import React from "react";
import TimeLineStepDivider from "./TimeLineStepDivider";
import {makeStyles} from "@material-ui/core";
import TimelineDaily from "./daily/TimelineDaily";

const useStyles = makeStyles(theme => ({
    content: {
        marginTop: '8px',
        borderLeft: '1px solid #757575',
        marginLeft: '12px',
    },
}));

const TimelineStepContent = ({type, data}) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.content}>
                {type === 1
                    ? <TimelineDaily daily={data}/>
                    : null}
            </div>
            <TimeLineStepDivider/>
        </div>
    );
};

export default TimelineStepContent;