import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Grid from "@material-ui/core/Grid";
import PendingButton from "../../generic/buttons/PendingButton";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import SubjectType from "./SubjectType";
import UserAvatar from "../../user/UserAvatar";

const useStyles = makeStyles(theme => ({
    action: {
        marginRight: '6px',
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
                <UserAvatar isBigAvatar={false} user={subject.creator}/>
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