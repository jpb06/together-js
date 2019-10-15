import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import ContentBox from "../bricks/generic/ContentBox";
import DailyDuration from "../bricks/daily/DailyDuration";
import DailyUnforeseenTickets from "../bricks/daily/DailyUnforeseenTickets";
import DailyDoneTickets from "../bricks/daily/DailyDoneTickets";
import Grid from "@material-ui/core/Grid";
import {getDaily} from "../../logic/api/daily.api";
import {getFromLocalStorage} from "../../logic/local.store";
import Waiting from "../bricks/generic/Waiting";
import DailyFeelings from "../bricks/daily/DailyFeelings";
import DailyIssues from "../bricks/daily/DailyIssues";
import ApiError from "../bricks/generic/ApiError";
import {getTeamMembers} from "../../logic/api/team.api";

const useStyles = makeStyles(theme => ({
    ticketsBoxes: {
        marginBottom: theme.spacing(1)
    },
    progressIcon: {
        height: '70px',
        width: '70px'
    }
}));

const Daily = ({reportLoading, showSnackbar}) => {
    const classes = useStyles();

    const [daily, setDaily] = useState({});
    const [isReady, setIsready] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [currentTeam, setCurrentTeam] = useState('');

    // This will trigger at component first render (only once)
    useEffect(() => {

        reportLoading(true);

        async function fetch() {
            console.log('fetching daily & team members');
            const currentTeam = getFromLocalStorage('currentTeam');
            const dailyRequestResult = await getDaily(currentTeam._id, new Date().toUTCString());
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
                        showSnackbar={showSnackbar}
                        currentTeam={currentTeam}
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

                    </Grid>
                    <h1>Is there something else worth noting?</h1>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        className={classes.ticketsBoxes}
                    >
                        <Grid item md={6} xs={12}>
                            <ContentBox title="Issues encountered or subjects to not forget for next retrospective"
                                        ContentComponent={DailyIssues}/>
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