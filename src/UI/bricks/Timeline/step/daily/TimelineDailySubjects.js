import React from "react";
import List from "@material-ui/core/List";
import TimelineDailyFeedbackItem from "./TimelineDailyFeedbackItem";

const TimelineDailySubjects = ({daily}) => {
    return (
        <List disablePadding style={{marginLeft: '-11px'}}>
            {daily.subjects.map(subject => (
                <TimelineDailyFeedbackItem key={subject.id} type={0} data={subject}/>
            ))}
        </List>
    );
};

export default TimelineDailySubjects;