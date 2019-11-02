import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import clsx from "clsx";
import React from "react";
import {makeStyles} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles(theme => ({
    warning: {
        backgroundColor: red[700]
    },
    success: {
        backgroundColor: green[800]
    },
    chip: {
        justifyContent: 'left'
    },
    fullWidth: {
        width: '100%',
    },
}));

const TimelineDailyTickets = ({daily}) => {
    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            {daily.unforeseenTickets.length > 0 &&
            <Grid item md={daily.doneTickets.length > 0 ? 6 : 12} xs={12}>
                <Chip
                    avatar={<Avatar
                        className={classes.warning}>{daily.unforeseenTickets.length}</Avatar>}
                    label="Unforeseen"
                    className={clsx(classes.chip, classes.fullWidth)}
                />
            </Grid>
            }
            {daily.doneTickets.length > 0 &&
            <Grid item md={daily.unforeseenTickets.length > 0 ? 6 : 12} xs={12}>
                <Chip
                    avatar={<Avatar
                        className={classes.success}>{daily.doneTickets.length}</Avatar>}
                    label="Done"
                    className={clsx(classes.chip, classes.fullWidth)}
                />
            </Grid>
            }
        </Grid>
    );
};

export default TimelineDailyTickets;