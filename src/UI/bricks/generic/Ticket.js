import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import {green} from "@material-ui/core/colors";
import PendingButton from "./PendingButton";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'relative',
    },
    action: {
        marginRight: '6px',
    },
    actionInProgress: {
        position: 'absolute',
        zIndex: 1,
        color: green[500],
    },
}));

const Ticket = ({reportTicketRemoval, actionFeedback, ticketName, user, showDivider}) => {
    const classes = useStyles();
    const getKey = () => ticketName;
    const handleRemoval = () => reportTicketRemoval(getKey());

    return (
        <ListItem divider={showDivider}>
            <ListItemAvatar>
                <Avatar
                    alt={`${user.firstName} ${user.lastName}`}
                    src={`/static/images/avatars/${user.avatarName}`}
                />
            </ListItemAvatar>
            <ListItemText
                primary={ticketName}
            />
            <ListItemSecondaryAction>
                <Grid container>
                    <Grid>
                        {
                            actionFeedback.key === ticketName && actionFeedback.isPending
                                ? <PendingButton/>
                                : <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={handleRemoval}
                                    className={classes.action}
                                >
                                    <DeleteIcon/>
                                </IconButton>

                        }
                    </Grid>
                </Grid>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Ticket;