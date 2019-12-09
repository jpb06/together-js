import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import {getFromLocalStorage, LocalStorageKeys} from "../../../../../logic/local.store";
import TimeLineHighlightedText from "../TimeLineHighlightedText";

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '25px',
        color: theme.palette.primary.main
    },
}));

const TimeLineTeamInvite = ({referrer, invitee, team}) => {
    const classes = useStyles();

    const [currentUser] = useState(getFromLocalStorage(LocalStorageKeys.user));

    const getTeamDescription = () => referrer._id === currentUser.id
        ? <div>
            You have invited <TimeLineHighlightedText text={`${invitee.firstName} ${invitee.lastName}`}/> to join the
            team.
        </div>
        : <div>
            <TimeLineHighlightedText text={`${referrer.firstName} ${referrer.lastName}`}/> has
            invited <TimeLineHighlightedText text={`${invitee.firstName} ${invitee.lastName}`}/> to join the team.
        </div>;
    const getUserDescription = () => <div>
        You have been invited to join team <TimeLineHighlightedText text={team.name}/> by <TimeLineHighlightedText
        text={`${referrer.firstName} ${referrer.lastName}`}/>.
    </div>;

    return (
        <div className={classes.root}>
            {team ? getUserDescription() : getTeamDescription()}
        </div>
    );
};

export default TimeLineTeamInvite;