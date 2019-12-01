import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import CreateTeamAction from "./team/CreateTeamAction";
import JoinTeamAction from "./team/JoinTeamAction";
import CreateTeamChoice from "./team/CreateTeamChoice";
import JoinTeamChoice from "./team/JoinTeamChoice";
import StepTitle from "../StepTitle";

const NewAccountMyTeams = ({reportLoading, showSnackbar, reportStepComplete}) => {

    const [choice, setChoice] = useState(-1);

    const reset = () => setChoice(-1);
    const newTeam = () => setChoice(0);
    const joinTeam = () => setChoice(1);
    const reportMembershipRequestSent = () => setChoice(2);

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
        >
            <StepTitle title={
                choice === 0
                    ? 'Create a team'
                    : choice === 1
                    ? 'Join a team'
                    : choice === 2
                        ? 'Request sent!'
                        : 'Let\'s get yourself a team'
            }/>
            <CreateTeamChoice choice={choice} newTeam={newTeam}/>
            <JoinTeamChoice choice={choice} joinTeam={joinTeam}/>
            <CreateTeamAction
                choice={choice}
                reset={reset}
                reportLoading={reportLoading}
                showSnackbar={showSnackbar}
                reportTeamCreated={reportStepComplete}
            />
            <JoinTeamAction
                choice={choice}
                reset={reset}
                reportMembershipRequestSent={reportMembershipRequestSent}
                reportLoading={reportLoading}
                showSnackbar={showSnackbar}
                reportTeamjoined={reportStepComplete}
            />

        </Grid>
    );
};

export default NewAccountMyTeams;