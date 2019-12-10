import React from "react";
import {makeStyles} from "@material-ui/core";
import TimeLineHighlightedText from "../TimeLineHighlightedText";

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '25px',
        color: theme.palette.primary.main
    }
}));

const TimelineTeamJoinRequest = ({user, team}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {user &&
            <div><TimeLineHighlightedText text={`${user.firstName} ${user.lastName}`}/> has asked to join the team.
            </div>}
            {team && <div>You sent a request to join team <TimeLineHighlightedText text={team.name}/>.</div>}
        </div>
    );
};

export default TimelineTeamJoinRequest;