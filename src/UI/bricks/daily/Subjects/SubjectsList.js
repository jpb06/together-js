import List from "@material-ui/core/List";
import React from "react";
import {makeStyles} from "@material-ui/core";
import Subject from "./Subject";

const useStyles = makeStyles(theme => ({
    noDataIcon: {
        fontSize: '50px'
    },
    fullWidth: {
        width: '100%'
    },
}));

const SubjectsList = ({subjects, reportSubjectRemoval, actionFeedback, NoDataIconComponent, ...rest}) => {
    const classes = useStyles();

    return (
        (subjects.length === 0)
            ? <NoDataIconComponent
                fontSize="large"
                color="primary"
                className={classes.noDataIcon}
            />
            : <List dense={true} className={classes.fullWidth}>
                {subjects.map((subject, index) => (
                    <Subject
                        key={subject.id}
                        subject={subject}
                        reportSubjectRemoval={reportSubjectRemoval}
                        actionFeedback={actionFeedback}
                        showDivider={index !== subjects.length - 1}
                        {...rest}
                    />
                ))}
            </List>
    );
};

export default SubjectsList;