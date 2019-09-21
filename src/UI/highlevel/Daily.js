import React from "react";
import {makeStyles} from "@material-ui/core";
import ContentBox from "../bricks/generic/ContentBox";
import DailyDuration from "../bricks/daily/DailyDuration";
import DailyUnforeseenTickets from "../bricks/daily/DailyUnforeseenTickets";
import DailyDoneTickets from "../bricks/daily/DailyDoneTickets";

const useStyles = makeStyles(theme => ({}));

const Daily = () => {
    const classes = useStyles();

    return (
        <div>
            <ContentBox title="Daily duration" ContentComponent={DailyDuration}/>
            <h1>What happened since the last daily ?</h1>
            <ContentBox title="Unforeseen tickets" ContentComponent={DailyUnforeseenTickets}/>
            <ContentBox title="Done tickets" ContentComponent={DailyDoneTickets}/>
            <ContentBox content={<p>Issues encountered</p>}/>
            <ContentBox content={<p>Feelings</p>}/>
        </div>
    );
};

export default Daily;