import {makeStyles} from "@material-ui/core";
import React from "react";
import HighlightedText from "../../../generic/HighlightedText";

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '25px',
        color: theme.palette.primary.main
    }
}));

const TimeLineTeamMemberJoinNotice = ({firstName, lastName, status}) => {
    const classes = useStyles();

    const getNewMemberDescription = () => <span><HighlightedText
        text={`${firstName} ${lastName}`}/> joined the team!</span>;
    const getTeamCreationDescription = () => <span><HighlightedText text={`${firstName} ${lastName}`}/> created the team.</span>;

    return (
        <div className={classes.root}>
            {{
                'creator': getTeamCreationDescription(),
                'member': getNewMemberDescription()
            }[status]}
        </div>
    );
};

export default TimeLineTeamMemberJoinNotice;