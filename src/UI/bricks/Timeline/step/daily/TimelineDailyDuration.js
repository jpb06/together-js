import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import TimerIcon from '@material-ui/icons/Timer';
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import React from "react";
import staticDurations from "../../../../../logic/static/static.durations";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    dailyItem: {
        marginLeft: '-20px',
        width: 'auto'
    },
    dailyItemIcon: {
        minWidth: '48px'
    },
    secondaryColor: {
        backgroundColor: theme.palette.secondary.main
    },
    title: {
        color: theme.palette.primary.main
    }
}));

const TimelineDailyDuration = ({durationIndicator}) => {
    const classes = useStyles();

    const getDurationDescription = () => {
        const matches = staticDurations.filter(el => el.value === durationIndicator);
        if (matches.length === 1) {
            return matches[0].label;
        } else {
            return '';
        }
    };

    if (durationIndicator.length > 0) {
        return (
            <div>
                <ListItem disableGutters className={classes.dailyItem}>
                    <ListItemAvatar className={classes.dailyItemIcon}>
                        <Avatar className={classes.secondaryColor}>
                            <TimerIcon color="primary"/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className={classes.title} primary="Duration" secondary={getDurationDescription()}/>
                </ListItem>
                <Divider component="li"/>
            </div>
        );
    } else {
        return null;
    }
};

export default TimelineDailyDuration;