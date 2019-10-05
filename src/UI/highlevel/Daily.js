import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import ContentBox from "../bricks/generic/ContentBox";
import DailyDuration from "../bricks/daily/DailyDuration";
import DailyUnforeseenTickets from "../bricks/daily/DailyUnforeseenTickets";
import DailyDoneTickets from "../bricks/daily/DailyDoneTickets";
import Grid from "@material-ui/core/Grid";
import {getDaily} from "../../logic/api/daily.api";
import {getFromLocalStorage} from "../../logic/local.store";
import Waiting from "../bricks/generic/waiting";
import DailyFeelings from "../bricks/daily/DailyFeelings";
import DailyIssues from "../bricks/daily/DailyIssues";
import ApiError from "../bricks/generic/ApiError";

const useStyles = makeStyles(theme => ({
    ticketsBoxes: {
        marginBottom: theme.spacing(1)
    },
    progressIcon: {
        height: '70px',
        width: '70px'
    }
}));

const Daily = ({reportLoading, reportError}) => {
    const classes = useStyles();

    let [daily, setDaily] = useState({});
    let [isReady, setIsready] = useState(false);
    let [isErrored, setIsErrored] = useState(false);

    useEffect(() => {

        reportLoading(true);

        async function fetch() {
            console.log('fetching daily');
            const user = getFromLocalStorage('user');
            let result = await getDaily(user.teams[0]._id, new Date().toUTCString());
            if (result.status === 200) {
                setDaily(result.data);
            } else {
                setIsErrored(true);
            }
            setIsready(true);
            reportLoading(false);
        }

        fetch();
    }, [reportLoading]);

    if (isErrored) {
        return <ApiError actionDescription={'the daily'}/>;
    } else {
        if (isReady) {
            return (
                <div>
                    <ContentBox
                        title="Daily duration"
                        ContentComponent={DailyDuration}
                        data={daily.durationIndicator}
                        reportError={reportError}
                    />
                    <h1>What happened since the last daily ?</h1>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        className={classes.ticketsBoxes}
                    >
                        <Grid item md={6} xs={12}>
                            <ContentBox
                                title="Unforeseen tickets"
                                ContentComponent={DailyUnforeseenTickets}
                                data={daily.unforeseenTickets}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <ContentBox
                                title="Done tickets"
                                ContentComponent={DailyDoneTickets}
                                data={daily.doneTickets}
                            />
                        </Grid>

                    </Grid>
                    <h1>Is there something else worth noting?</h1>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        className={classes.ticketsBoxes}
                    >
                        <Grid item md={6} xs={12}>
                            <ContentBox title="Issues encountered" ContentComponent={DailyIssues}/>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <ContentBox title="Feelings" ContentComponent={DailyFeelings}/>
                        </Grid>
                    </Grid>
                </div>
            );
        } else {
            return <Waiting/>;
        }
    }
};

export default Daily;