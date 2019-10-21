import React, {useCallback, useEffect} from "react";
import NewSubject from "../generic/NewSubject";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

const DailySubjects = ({sendToParent, data, showSnackbar, currentTeam}) => {
    const classes = useStyles();

    const [subjects, setSubjects] = React.useState(data);
    // Used to manage the state related with the action of adding a subject
    const [addActionFeedback, setAddActionFeedback] = React.useState({isPending: false, isErrored: false, text: 'Add'});
    // Used to manage the state related with the action of removing a subject
    const [removeActionFeedback, setRemoveActionFeedback] = React.useState({isPending: false, key: ''});

    // keep function reference for useEffect (otherwise the function reference would change with each render...)
    const isFilled = useCallback(() => subjects.length > 0, [subjects]);

    // This will trigger everytime a subject is added or removed
    useEffect(() => {
        sendToParent({isValidated: isFilled(), isPending: false});
    }, [isFilled, subjects, sendToParent]);

    const reportSubmit = () => {

    };

    return (
        <div>
            <List>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatars/6SLWt.gif"/>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Travis Howard" src="/static/images/avatars/afrogeisha.jpg"/>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Summer BBQ"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    to Scott, Alex, Jennifer
                                </Typography>
                                {" — Wish I could come, but I'm out of town this…"}
                            </React.Fragment>
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Cindy Baker" src="/static/images/avatars/6Tbz0.gif"/>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Sandra Adams
                                </Typography>
                                {' — Do you have Paris recommendations? Have you ever…'}
                            </React.Fragment>
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>

            <NewSubject
                actionFeedback={addActionFeedback}
                reportSubmit={reportSubmit}
            />
        </div>
    );
};

export default DailySubjects;