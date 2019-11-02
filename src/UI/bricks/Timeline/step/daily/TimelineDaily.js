import TimelineDailyDuration from "./TimelineDailyDuration";
import TimelineDailyTickets from "./TimelineDailyTickets";
import TimelineDailySubjects from "./TimelineDailySubjects";
import List from "@material-ui/core/List";
import React from "react";
import TimelineDailySection from "./TimelineDailySection";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import ForumIcon from '@material-ui/icons/Forum';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import TimelineDailyFeelings from "./TimelineDailyFeelings";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    noData: {
        marginLeft: '25px',
        color: theme.palette.primary.main
    },
}));

const TimelineDaily = ({daily}) => {
    const classes = useStyles();

    if (daily.durationIndicator.length === 0
        && daily.unforeseenTickets.length === 0
        && daily.doneTickets.length === 0
        && daily.subjects.length === 0
        && daily.feelings.length === 0) {
        return (
            <div className={classes.noData}>Ooops! Looks like nobody had time to give some insight about this daily.
                Time to bump the Scrum Master?</div>
        );
    } else {
        return (
            <List disablePadding>
                <TimelineDailyDuration durationIndicator={daily.durationIndicator}/>
                {(daily.unforeseenTickets.length > 0 || daily.doneTickets.length > 0) &&
                <TimelineDailySection
                    title="Tickets"
                    IconComponent={AssignmentLateIcon}
                    ContentComponent={TimelineDailyTickets}
                    daily={daily}
                />
                }
                {daily.subjects.length > 0 &&
                <TimelineDailySection
                    title="Retrospective subjects"
                    IconComponent={ForumIcon}
                    ContentComponent={TimelineDailySubjects}
                    daily={daily}
                />
                }
                {daily.feelings.length > 0 &&
                <TimelineDailySection
                    title="Feelings"
                    IconComponent={EmojiEmotionsIcon}
                    ContentComponent={TimelineDailyFeelings}
                    daily={daily}
                />
                }
            </List>
        );
    }
};

export default TimelineDaily;