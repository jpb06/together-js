import {makeStyles} from "@material-ui/core";
import {getSubjectTypeDescription, SubjectTypeIcon} from "../../../../../logic/static/static.subject.types";
import {FeelingTypeIcon, getFeelingTypeDescription} from "../../../../../logic/static/static.feelings.types";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import UserAvatar from "../../../user/UserAvatar";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import {amber} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    avatarContainer: {
        minWidth: '30px',
        marginTop: '0px',
        paddingRight: '3px'
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

    badge: {
        border: `2px solid ${theme.palette.background.paper}`,
        height: 22,
        width: 22,
        backgroundColor: amber[600]
    },
    badgeIcon: {
        width: 18,
        height: 18,
        backgroundColor: amber[600]
    }

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
                <Badge
                    children={null}
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    badgeContent={
                        <Avatar className={classes.badge}>
                            <Icon className={classes.badgeIcon}/>
                        </Avatar>
                    }
                >
                    <UserAvatar isBigAvatar={false} user={data.creator}/>
                </Badge>
            </ListItemAvatar>
            <div>
                <div className={classes.feedbackTitle}>
                    <Typography
                        component="span"
                        variant="body2"
                        color="primary"
                        className={classes.feedbackType}
                    >
                        {description} by
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