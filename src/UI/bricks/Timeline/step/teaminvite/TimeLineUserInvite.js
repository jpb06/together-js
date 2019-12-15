import {makeStyles} from "@material-ui/core";
import React, {useState} from "react";
import {getFromLocalStorage, LocalStorageKeys} from "../../../../../logic/local.store";
import TimeLineHighlightedText from "../TimeLineHighlightedText";

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '25px',
        color: theme.palette.primary.main
    },
}));

const TimeLineUserInvite = ({referrer, invitee}) => {
    const classes = useStyles();

    const [currentUser] = useState(getFromLocalStorage(LocalStorageKeys.user));

    if (referrer._id === currentUser.id) {
        return (
            <div className={classes.root}>
                You have invited <TimeLineHighlightedText text={`${invitee.firstName} ${invitee.lastName}`}/> to join
                the team.
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <TimeLineHighlightedText text={`${referrer.firstName} ${referrer.lastName}`}/> has
                invited <TimeLineHighlightedText text={`${invitee.firstName} ${invitee.lastName}`}/> to join the team.
            </div>
        );
    }
};

export default TimeLineUserInvite;