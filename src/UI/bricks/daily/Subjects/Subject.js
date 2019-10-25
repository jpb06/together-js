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
import SubjectType from "./SubjectType";

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

const Subject = ({subject, reportSubjectRemoval, actionFeedback, showDivider}) => {
    const classes = useStyles();
    const handleRemoval = () => reportSubjectRemoval(subject.id);

    return (
        <ListItem divider={showDivider}>
            <ListItemAvatar>
                <Avatar
                    alt={`${subject.creator.firstName} ${subject.creator.lastName}`}
                    src={`/static/images/avatars/${subject.creator.avatarName}`}
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
                            {`${subject.creator.firstName} ${subject.creator.lastName}`}
                        </Typography>
                        <SubjectType typeId={subject.type}/>
                    </React.Fragment>
                }
                secondary={subject.description}
            />
            <ListItemSecondaryAction>
                <Grid container>
                    <Grid>
                        {
                            actionFeedback.id === subject.id && actionFeedback.isPending
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

export default Subject;