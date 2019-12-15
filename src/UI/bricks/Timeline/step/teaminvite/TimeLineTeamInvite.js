import React from "react";
import {makeStyles} from "@material-ui/core";
import TimeLineHighlightedText from "../TimeLineHighlightedText";

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '25px',
        color: theme.palette.primary.main
    },
}));

const TimeLineTeamInvite = ({referrer, team}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            You have been invited to join team <TimeLineHighlightedText text={team.name}/> by <TimeLineHighlightedText
            text={`${referrer.firstName} ${referrer.lastName}`}/>.
        </div>
    );
};

export default TimeLineTeamInvite;