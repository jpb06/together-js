import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {getFromLocalStorage, LocalStorageKeys} from "../../logic/local.store";
import {getTimeline} from "../../logic/api/user.api";
import ApiError from "../bricks/generic/errors/ApiError";
import Waiting from "../bricks/generic/Waiting";
import TimelineShard from "../bricks/Timeline/TimelineShard";
import LoopIcon from "@material-ui/icons/Loop";

const useStyles = makeStyles(theme => ({
    withMargin: {
        marginBottom: theme.spacing(1)
    },
}));

const TimeLine = ({reportLoading, showSnackbar}) => {
    const classes = useStyles();

    const isMounted = React.useRef(false);

    const [isReady, setIsready] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const [timeline, setTimeline] = useState({});

    // This will trigger at component first render (only once)
    useEffect(() => {
        isMounted.current = true;
        reportLoading(true);

        async function fetch() {
            console.log('fetching timeline');
            const currentUser = getFromLocalStorage(LocalStorageKeys.user);
            const timelineRequestResult = await getTimeline(currentUser.id);
            if (isMounted.current) {
                if (timelineRequestResult.status === 200) {
                    setTimeline(timelineRequestResult.data);
                } else {
                    setIsErrored(true);
                }
                setIsready(true);
                reportLoading(false);
            }
        }

        fetch();

        return function cleanup() {
            isMounted.current = false;
        };
    }, [reportLoading]);

    if (isErrored) {
        return <ApiError actionDescription={'the user timeline'}/>;
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
                        <h1>Timeline</h1>
                        <TimelineShard data={timeline}/>
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