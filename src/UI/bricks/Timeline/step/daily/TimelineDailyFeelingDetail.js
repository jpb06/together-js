import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {FeelingTypeIcon, staticFeelingTypes} from "../../../../../logic/static/static.feelings.types";
import {makeStyles} from "@material-ui/core";

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

const TimelineDailyFeelingDetail = ({feeling}) => {
    const classes = useStyles();

    const FeelingIcon = FeelingTypeIcon(feeling.type);

    const getFeelingTypeDescription = (value) => {
        const matches = staticFeelingTypes.filter(el => el.value === value);
        if (matches.length === 1) {
            return matches[0].label;
        } else {
            return '';
        }
    };

    return (
        <ListItem disableGutters alignItems="flex-start">
            <ListItemAvatar className={classes.avatarContainer}>
                <Avatar className={classes.userAvatar} src={`/static/images/avatars/${feeling.creator.avatarName}`}/>
            </ListItemAvatar>
            <div>
                <div className={classes.feelingTitle}>
                    <FeelingIcon color="primary"/>
                    <Typography
                        component="span"
                        variant="body2"
                        color="primary"
                        className={classes.feelingType}
                    >
                        {`${getFeelingTypeDescription(feeling.type)}`}
                    </Typography>
                    <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                        className={classes.userName}
                    >
                        {`${feeling.creator.firstName} ${feeling.creator.lastName}`}
                    </Typography>
                </div>
                <div>{feeling.comment}</div>
            </div>
        </ListItem>
    );
};

export default TimelineDailyFeelingDetail;