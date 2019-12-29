import HighlightedText from "../../../generic/HighlightedText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import TeamAvatar from "../../../user/TeamAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    text: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    teamItem: {
        paddingLeft: 20,
        paddingRight: 20
    }
});

const SwitchTeamStep = ({teams, joinedTeamName, currentTeamId, closeAction}) => {
    const classes = useStyles();

    const teamSelected = (team) => {
        if (team._id !== currentTeamId) {
            closeAction(2, {_id: team._id, name: team.name});
        }
    };

    return (
        <div>
            <div className={classes.text}>
                Congratulations! You just joined team <HighlightedText text={joinedTeamName}/>. Would you like to switch
                team?
            </div>
            <List disablePadding={true}>
                {
                    teams.map(team =>
                        <ListItem
                            key={team._id}
                            disableGutters={true}
                            divider={true}
                            selected={team._id === currentTeamId}
                            className={classes.teamItem}
                            onClick={teamSelected.bind(this, team)}
                        >
                            <ListItemAvatar>
                                <TeamAvatar team={team}/>
                            </ListItemAvatar>
                            <ListItemText
                                classes={{primary: team._id === currentTeamId ? classes.title : classes.titlePrimary}}
                                primary={`Team ${team.name}`}
                                secondary={
                                    <span>
                                        <HighlightedText
                                            text={`${team.members.length} member${team.members.length > 1 ? 's' : ''}`}/>
                                        <br/>
                                        <HighlightedText text={`Last activity - ${team.lastActivity}`}/>
                                    </span>
                                }
                            />
                        </ListItem>
                    )
                }
            </List>
        </div>
    );
};

export default SwitchTeamStep;