import React from "react";
import List from "@material-ui/core/List";
import TimelineDailyFeedbackItem from "./TimelineDailyFeedbackItem";

const TimelineDailyFeelings = ({daily}) => {
    return (
        <List disablePadding style={{marginLeft: '-11px'}}>
            {daily.feelings.map(feeling => (
                <TimelineDailyFeedbackItem key={feeling.id} type={1} data={feeling}/>
            ))}
        </List>
    );
};

export default TimelineDailyFeelings;