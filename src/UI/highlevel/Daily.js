import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import ContentBox from "../bricks/generic/containers/ContentBox";
import DailyDuration from "../bricks/daily/DailyDuration";
import DailyUnforeseenTickets from "../bricks/daily/DailyUnforeseenTickets";
import DailyDoneTickets from "../bricks/daily/DailyDoneTickets";
import Grid from "@material-ui/core/Grid";
import {getDaily} from "../../logic/api/daily.api";
import {getFromLocalStorage, LocalStorageKeys} from "../../logic/local.store";
import Waiting from "../bricks/generic/Waiting";
import DailyFeelings from "../bricks/daily/DailyFeelings";
import DailySubjects from "../bricks/daily/DailySubjects";
import {getTeamMembers} from "../../logic/api/team.api";
import LoopIcon from "@material-ui/icons/Loop";
import TopLevelFeedback from "../bricks/generic/TopLevelFeedback";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

const useStyles = makeStyles(theme => ({
    withMargin: {
        marginBottom: theme.spacing(1)
    },
    progressIcon: {
        height: '70px',
        width: '70px'
    }
}));

const Daily = ({reportLoading, showSnackbar}) => {
    const classes = useStyles();

    const isMounted = React.useRef(false);

    const [daily, setDaily] = useState({});
    const [isReady, setIsready] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [currentTeam, setCurrentTeam] = useState('');

    // This will trigger at component first render (only once)
    useEffect(() => {
        isMounted.current = true;
        reportLoading(true);

        async function fetch() {
            console.log('fetching daily & team members');
            const currentTeam = getFromLocalStorage(LocalStorageKeys.currentTeam);
            const dailyRequestResult = await getDaily(currentTeam._id, new Date().toUTCString());
            if (isMounted.current) {
                if (dailyRequestResult.status === 200) {
                    setDaily(dailyRequestResult.data);
                } else {
                    setIsErrored(true);
                }
                const teamMembersRequestResult = await getTeamMembers(currentTeam._id);
                if (teamMembersRequestResult.status === 200) {
                    setTeamMembers(teamMembersRequestResult.data);
                } else {
                    setIsErrored(true);
                }

                setCurrentTeam(currentTeam);
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
        return (
            <TopLevelFeedback
                Icon={SentimentDissatisfiedIcon}
                title="Oh no!"
                text="Turns out we couldn't fetch the daily"
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
                        <ContentBox
                            title="Daily duration"
                            ContentComponent={DailyDuration}
                            data={daily.durationIndicator}
                            showSnackbar={showSnackbar}
                            currentTeam={currentTeam}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <h1>What happened since the last daily ?</h1>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <ContentBox
                            title="Unforeseen tickets"
                            ContentComponent={DailyUnforeseenTickets}
                            data={daily.unforeseenTickets}
                            showSnackbar={showSnackbar}
                            currentTeam={currentTeam}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <ContentBox
                            title="Done tickets"
                            ContentComponent={DailyDoneTickets}
                            teamMembers={teamMembers}
                            data={{doneTickets: daily.doneTickets, teamMembers}}
                            showSnackbar={showSnackbar}
                            currentTeam={currentTeam}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <h1>Is there something else worth noting?</h1>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <ContentBox title="Retrospective subjects"
                                    ContentComponent={DailySubjects}
                                    data={daily.subjects}
                                    showSnackbar={showSnackbar}
                                    currentTeam={currentTeam}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <ContentBox title="Feelings"
                                    ContentComponent={DailyFeelings}
                                    data={daily.feelings}
                                    showSnackbar={showSnackbar}
                                    currentTeam={currentTeam}
                        />
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

export default Daily;