import {makeStyles} from "@material-ui/core";
import React, {useState} from "react";
import {getFromLocalStorage, LocalStorageKeys} from "../../../../../logic/local.store";
import HighlightedText from "../../../generic/HighlightedText";

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '25px',
        color: theme.palette.primary.main
    },
}));

const TimeLineTeamInvite = ({referrer, invitee}) => {
    const classes = useStyles();

    const [currentUser] = useState(getFromLocalStorage(LocalStorageKeys.user));

    if (referrer._id === currentUser.id) {
        return (
            <div className={classes.root}>
                You have invited <HighlightedText text={`${invitee.firstName} ${invitee.lastName}`}/> to join the team.
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <HighlightedText text={`${referrer.firstName} ${referrer.lastName}`}/> has
                invited <HighlightedText text={`${invitee.firstName} ${invitee.lastName}`}/> to join the team.
            </div>
        );
    }
};

export default TimeLineTeamInvite;