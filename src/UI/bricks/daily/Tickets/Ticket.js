import React from "react";
import {makeStyles} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import PendingButton from "../../generic/buttons/PendingButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../../user/UserAvatar";

const useStyles = makeStyles(theme => ({
    user: {
        color: theme.palette.primary.main,
        paddingLeft: theme.spacing(1)
    },
    avatarContainer: {
        minWidth: 45
    }
}));

const Ticket = ({reportTicketRemoval, actionFeedback, ticketName, user, userType, showDivider}) => {
    const classes = useStyles();
    const getKey = () => ticketName;
    const handleRemoval = () => reportTicketRemoval(getKey());

    return (
        <ListItem divider={showDivider}>
            <ListItemAvatar className={classes.avatarContainer}>
                <UserAvatar isBigAvatar={false} user={user}/>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <React.Fragment>
                        {userType === 'creator' ? 'Created by' : 'Assigned to'}
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.user}
                            color="textPrimary"
                        >
                            {`${user.firstName} ${user.lastName}`}
                        </Typography>
                    </React.Fragment>
                }
                secondary={ticketName}
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