import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {getFromLocalStorage, LocalStorageKeys, setInLocalStorage} from "../../logic/local.store";
import {getTimeline} from "../../logic/api/user.api";
import Waiting from "../bricks/generic/Waiting";
import TimelineShard from "../bricks/Timeline/TimelineShard";
import LoopIcon from "@material-ui/icons/Loop";
import TopLevelFeedback from "../bricks/generic/TopLevelFeedback";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import TimerIcon from '@material-ui/icons/Timer';
import useLifecycleStatus from "../../logic/hooks/useLifecycleStatus";

const useStyles = makeStyles(theme => ({
    withMargin: {
        marginBottom: theme.spacing(1)
    },
}));

const fetchTimeline = async (isMounted, setTimeline, setIsErrored, setIsready, reportLoading) => {
    console.log('fetching timeline');
    const currentTeam = getFromLocalStorage(LocalStorageKeys.currentTeam);
    const timelineRequestResult = await getTimeline(currentTeam._id);
    if (isMounted.current) {
        if (timelineRequestResult.status === 200) {
            setTimeline(timelineRequestResult.data);
        } else {
            setIsErrored(true);
        }
        setIsready(true);
        reportLoading(false);
    }
};

const TimeLine = ({reportLoading, showSnackbar}) => {
    const classes = useStyles();

    const isMounted = useLifecycleStatus();

    const [isReady, setIsready] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const [timeline, setTimeline] = useState({});

    // This will trigger at component first render (only once)
    useEffect(() => {

        fetchTimeline(isMounted, setTimeline, setIsErrored, setIsready, reportLoading);
    }, [isMounted, reportLoading]);

    const reloadTimeline = async (team) => {
        setIsready(false);
        reportLoading(true);

        if (team) {
            setInLocalStorage(LocalStorageKeys.currentTeam, team);
        }
        await fetchTimeline(isMounted, setTimeline, setIsErrored, setIsready, reportLoading);
    };

    if (isErrored) {
        return (
            <TopLevelFeedback
                Icon={SentimentDissatisfiedIcon}
                title="Oh no!"
                text="Turns out we couldn't fetch the user timeline"
            />
        );
    } else {
        if (isReady) {
            return (
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    className={classes.withMargin}
                >
                    <Grid item md={12} xs={12}>
                        {timeline.length > 0 && <h1>Timeline</h1>}
                        {timeline.userEvents.length > 0 &&
                        <TimelineShard
                            title={'Your events'}
                            data={timeline.userEvents}
                            showSnackbar={showSnackbar}
                            reloadTimeline={reloadTimeline}
                        />
                        }
                        {timeline.currentTeam &&
                        <TimelineShard
                            key={timeline.currentTeam._id}
                            title={`Team ${timeline.currentTeam.name}`}
                            data={timeline.currentTeam.events}
                            showSnackbar={showSnackbar}
                        />
                        }
                        {timeline.length === 0 && <TopLevelFeedback
                            Icon={TimerIcon}
                            title="Well well..."
                            text={<div>Looks like there is nothing to show yet...<br/>Time for a daily?</div>}
                        />}
                    </Grid>
                </Grid>
            );
        } else {
            return <Waiting
                addTopPadding={true}
                IconComponent={LoopIcon}
                text="Sinister Dexter Has a Broken Spirometer"
                color="white"
            />;
        }
    }
};

export default TimeLine;