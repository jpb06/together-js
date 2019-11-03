import React, {useEffect} from "react";
import Team from "./Team";
import Grid from "@material-ui/core/Grid";
import {getFromLocalStorage, LocalStorageKeys} from "../../../../logic/local.store";
import {makeStyles, Paper} from "@material-ui/core";
import blueGrey from "@material-ui/core/colors/blueGrey";
import TeamMember from "./TeamMember";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        backgroundColor: blueGrey[900]
    },
}));

const TeamsList = ({teams}) => {
    const classes = useStyles();

    const [currentTeam, setCurrentTeam] = React.useState({});
    const [currentOthersTeamPanel, setCurrentOthersTeamPanel] = React.useState({});

    // This will trigger at component first render (only once)
    useEffect(() => {
        const localStoredCurrentTeam = getFromLocalStorage(LocalStorageKeys.currentTeam);
        const currentTeam = teams.filter(team => team._id === localStoredCurrentTeam._id)[0];
        setCurrentTeam(currentTeam);
    }, [teams]);

    const handlePanelChange = panel => (event, isExpanded) => {
        setCurrentOthersTeamPanel(isExpanded ? panel : false);
    };

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
        >
            <h2>Current team</h2>
            <Paper className={classes.paper}>
                <Typography>{currentTeam.name}</Typography>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    {
                        currentTeam.members && currentTeam.members.map(user => (
                            <TeamMember
                                key={user._id}
                                user={user}
                            />
                        ))
                    }
                </Grid>
            </Paper>
            <h2>Your others teams</h2>
            {
                teams.filter(team => team._id !== currentTeam._id).map(team => (
                    <Team
                        key={team._id}
                        name={team.name}
                        members={team.members}
                        handlePanelChange={handlePanelChange}
                        currentPanel={currentOthersTeamPanel}
                    />
                ))
            }
        </Grid>
    );
};

export default TeamsList;