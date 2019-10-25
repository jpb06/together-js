import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Grid from "@material-ui/core/Grid";
import PendingButton from "../../generic/buttons/PendingButton";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import {makeStyles} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import FeelingType from "./FeelingType";

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
    user: {
        color: theme.palette.primary.main,
        paddingRight: theme.spacing(1)
    }
}));

const Feeling = ({feeling, reportFeelingRemoval, actionFeedback, showDivider}) => {
    const classes = useStyles();
    const handleRemoval = () => reportFeelingRemoval(feeling.id);

    return (
        <ListItem divider={showDivider}>
            <ListItemAvatar>
                <Avatar
                    alt={`${feeling.creator.firstName} ${feeling.creator.lastName}`}
                    src={`/static/images/avatars/${feeling.creator.avatarName}`}
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.user}
                            color="textPrimary"
                        >
                            {`${feeling.creator.firstName} ${feeling.creator.lastName}`}
                        </Typography>
                        <FeelingType typeId={feeling.type}/>
                    </React.Fragment>
                }
                secondary={feeling.comment}
            />
            <ListItemSecondaryAction>
                <Grid container>
                    <Grid>
                        {
                            actionFeedback.id === feeling.id && actionFeedback.isPending
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

export default Feeling;