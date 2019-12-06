import {makeStyles} from "@material-ui/core";
import {getSubjectTypeDescription, SubjectTypeIcon} from "../../../../../logic/static/static.subject.types";
import {FeelingTypeIcon, getFeelingTypeDescription} from "../../../../../logic/static/static.feelings.types";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import React from "react";

const useStyles = makeStyles(theme => ({
    avatarContainer: {
        minWidth: '30px',
        marginTop: '0px'
    },
    userAvatar: {
        width: '25px',
        height: '25px',
    },
    userName: {
        paddingLeft: '3px'
    },
    feedbackType: {
        marginLeft: '2px'
    },
    feedbackTitle: {
        marginLeft: '-3px'
    },
    feedbackText: {
        wordBreak: 'break-word'
    },
}));

const TimelineDailyFeedbackItem = ({type, data}) => {
    const classes = useStyles();

    let Icon, description, text;
    if (type === 0) { // subject
        Icon = SubjectTypeIcon(data.type);
        description = getSubjectTypeDescription(data.type);
        text = data.description;
    } else if (type === 1) { // feeling
        Icon = FeelingTypeIcon(data.type);
        description = getFeelingTypeDescription(data.type);
        text = data.comment;
    }

    return (
        <ListItem disableGutters alignItems="flex-start">
            <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.userAvatar} src={`/static/images/avatars/${data.creator.avatarName}`}/>
            </ListItemAvatar>
            <div>
                <div className={classes.feedbackTitle}>
                    <Icon color="primary"/>
                    <Typography
                        component="span"
                        variant="body2"
                        color="primary"
                        className={classes.feedbackType}
                    >
                        {description}
                    </Typography>
                    <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                        className={classes.userName}
                    >
                        {`${data.creator.firstName} ${data.creator.lastName}`}
                    </Typography>
                </div>
                <div className={classes.feedbackText}>{text}</div>
            </div>
        </ListItem>
    );
};

export default TimelineDailyFeedbackItem;