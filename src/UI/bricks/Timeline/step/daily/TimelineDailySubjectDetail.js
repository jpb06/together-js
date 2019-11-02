import Avatar from "@material-ui/core/Avatar";
import {staticSubjectTypes, SubjectTypeIcon} from "../../../../../logic/static/static.subject.types";
import React from "react";
import {makeStyles} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    avatarContainer: {
        minWidth: '30px',
        marginTop: '0px'
    },
    userAvatar: {
        width: '25px',
        height: '25px',
    },
    feelingType: {
        marginLeft: '2px'
    },
    feelingTitle: {
        marginLeft: '-3px'
    },
    userName: {
        paddingLeft: '3px'
    }
}));

const TimelineDailySubjectDetail = ({subject}) => {
    const classes = useStyles();

    const SubjectIcon = SubjectTypeIcon(subject.type);

    const getSubjectTypeDescription = (value) => {
        const matches = staticSubjectTypes.filter(el => el.value === value);
        if (matches.length === 1) {
            return matches[0].label;
        } else {
            return '';
        }
    };

    return (
        <ListItem disableGutters alignItems="flex-start">
            <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.userAvatar} src={`/static/images/avatars/${subject.creator.avatarName}`}/>
            </ListItemAvatar>
            <div>
                <div className={classes.feelingTitle}>
                    <SubjectIcon color="primary"/>
                    <Typography
                        component="span"
                        variant="body2"
                        color="primary"
                        className={classes.feelingType}
                    >
                        {`${getSubjectTypeDescription(subject.type)}`}
                    </Typography>
                    <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                        className={classes.userName}
                    >
                        {`${subject.creator.firstName} ${subject.creator.lastName}`}
                    </Typography>
                </div>
                <div>{subject.description}</div>
            </div>
        </ListItem>
    );
};

export default TimelineDailySubjectDetail;