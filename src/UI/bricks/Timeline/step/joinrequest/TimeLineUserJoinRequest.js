import TimeLineHighlightedText from "../TimeLineHighlightedText";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '25px',
        color: theme.palette.primary.main
    }
}));

const TimeLineUserJoinRequest = ({team}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            You sent a request to join team <TimeLineHighlightedText text={team.name}/>.
        </div>
    );
};

export default TimeLineUserJoinRequest;