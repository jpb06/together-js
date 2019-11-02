import React, {useEffect} from "react";
import Team from "./Team";
import Grid from "@material-ui/core/Grid";
import {getFromLocalStorage, LocalStorageKeys} from "../../../../logic/local.store";

const TeamsList = ({teams}) => {

    const [currentPanel, setCurrentPanel] = React.useState({});

    // This will trigger at component first render (only once)
    useEffect(() => {
        const currentTeam = getFromLocalStorage(LocalStorageKeys.currentTeam);
        setCurrentPanel(currentTeam.name);
    }, []);

    const handlePanelChange = panel => (event, isExpanded) => {
        setCurrentPanel(isExpanded ? panel : false);
    };

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
        >
            {
                teams.map(team => (
                    <Team
                        key={team._id}
                        name={team.name}
                        members={team.members}
                        currentPanel={currentPanel}
                        handlePanelChange={handlePanelChange}
                    />
                ))}
        </Grid>
    );
};

export default TeamsList;