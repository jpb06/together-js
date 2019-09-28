import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import ContentBox from "../bricks/generic/ContentBox";
import DailyDuration from "../bricks/daily/DailyDuration";
import DailyUnforeseenTickets from "../bricks/daily/DailyUnforeseenTickets";
import DailyDoneTickets from "../bricks/daily/DailyDoneTickets";
import Grid from "@material-ui/core/Grid";
import {getDaily} from "../../logic/api/daily.api";
import {getFromLocalStorage} from "../../logic/local.store";
import {useHistory} from "react-router";
import Waiting from "../bricks/generic/waiting";

const useStyles = makeStyles(theme => ({
    ticketsBoxes: {
        marginBottom: theme.spacing(1)
    },
    progressIcon: {
        height: '70px',
        width: '70px'
    }
}));

const Daily = ({reportLoading}) => {
    let history = useHistory();
    const classes = useStyles();

    let [daily, setDaily] = useState({});
    let [isReady, setIsready] = useState(false);

    useEffect(() => {
        reportLoading(true);

        async function fetch() {
            const user = getFromLocalStorage('user');
            let result = await getDaily(user.teams[0]._id, new Date().toUTCString());
            setDaily(result.data);
            setTimeout(() => {
                setIsready(true);
                reportLoading(false);
            }, 2000);

        }

        fetch();
    }, [history]);

    if (isReady) {
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
                        <ContentBox title="Unforeseen tickets" ContentComponent={DailyUnforeseenTickets}
                                    data={daily.unforeseenTickets}/>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <ContentBox title="Done tickets" ContentComponent={DailyDoneTickets}/>
                    </Grid>
                </Grid>
                <ContentBox content={<p>Issues encountered</p>}/>
                <ContentBox content={<p>Feelings</p>}/>
            </div>
        );
    } else {
        return <Waiting/>;
    }


};

export default Daily;