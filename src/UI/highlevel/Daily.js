import React from "react";
import {makeStyles} from "@material-ui/core";
import ContentBox from "../bricks/generic/ContentBox";
import DailyDuration from "../bricks/daily/DailyDuration";
import DailyUnforeseenTickets from "../bricks/daily/DailyUnforeseenTickets";
import DailyDoneTickets from "../bricks/daily/DailyDoneTickets";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    ticketsBoxes: {
        marginBottom: theme.spacing(1)
    }
}));

const Daily = () => {
    const classes = useStyles();

    return (
        <div>
            <ContentBox title="Daily duration" ContentComponent={DailyDuration}/>
            <h1>What happened since the last daily ?</h1>
            <Grid
                container
                spacing={1}
                direction="row"
                className={classes.ticketsBoxes}
            >
                <Grid item md={6} xs={12}>
                    <ContentBox title="Unforeseen tickets" ContentComponent={DailyUnforeseenTickets}/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <ContentBox title="Done tickets" ContentComponent={DailyDoneTickets}/>
                </Grid>
            </Grid>
            <ContentBox content={<p>Issues encountered</p>}/>
            <ContentBox content={<p>Feelings</p>}/>
        </div>
    );
};

export default Daily;