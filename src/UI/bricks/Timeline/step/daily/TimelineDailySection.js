import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import Divider from "@material-ui/core/Divider";
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
    fullWidth: {
        width: '100%',
    },
    title: {
        fontSize: '1rem',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        lineHeight: '1.5',
        letterSpacing: '0.00938em',
        color: theme.palette.primary.main,
        marginBottom: '5px',
        display: 'inline-block'
    },
}));


const TimelineDailySection = ({title, IconComponent, ContentComponent, daily}) => {
    const classes = useStyles();

    return (
        <div>
            <ListItem disableGutters className={classes.dailyItem}>
                <ListItemAvatar className={classes.dailyItemIcon}>
                    <Avatar className={classes.secondaryColor}>
                        <IconComponent color="primary"/>
                    </Avatar>
                </ListItemAvatar>
                <div className={classes.fullWidth}>
                    <span className={classes.title}>{title}</span>
                    <ContentComponent daily={daily}/>
                </div>
            </ListItem>
            <Divider component="li"/>
        </div>
    );
};

export default TimelineDailySection;