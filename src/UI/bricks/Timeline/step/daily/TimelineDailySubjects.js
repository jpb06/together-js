import TimelineDailySubjectDetail from "./TimelineDailySubjectDetail";
import React from "react";
import List from "@material-ui/core/List";

const TimelineDailySubjects = ({daily}) => {
    return (
        <List disablePadding style={{marginLeft: '-11px'}}>
            {daily.subjects.map(subject => (
                <TimelineDailySubjectDetail key={subject.id} subject={subject}/>
            ))}
        </List>
    );
};

export default TimelineDailySubjects;