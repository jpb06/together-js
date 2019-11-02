import React from "react";
import TimelineDailyFeelingDetail from "./TimelineDailyFeelingDetail";
import List from "@material-ui/core/List";

const TimelineDailyFeelings = ({daily}) => {
    return (
        <List disablePadding style={{marginLeft: '-11px'}}>
            {daily.feelings.map(feeling => (
                <TimelineDailyFeelingDetail key={feeling.id} feeling={feeling}/>
            ))}
        </List>
    );
};

export default TimelineDailyFeelings;