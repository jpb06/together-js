import React from "react";
import {makeStyles} from "@material-ui/core";
import HighlightedText from "../../../generic/HighlightedText";

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '25px',
        color: theme.palette.primary.main
    }
}));

const TimelineTeamJoinRequest = ({user}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <HighlightedText text={`${user.firstName} ${user.lastName}`}/> has asked to join the team.
        </div>
    );
};

export default TimelineTeamJoinRequest;