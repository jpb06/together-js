import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TeamMember from "./TeamMember";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import blueGrey from '@material-ui/core/colors/blueGrey';

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        backgroundColor: blueGrey[900]
    },
}));

const Team = ({handlePanelChange, currentPanel, name, members}) => {
    const classes = useStyles();

    return (
        <ExpansionPanel
            expanded={currentPanel === name}
            onChange={handlePanelChange(name)}
            className={classes.container}
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography>{name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    {members.map(user => (
                        <TeamMember
                            key={user._id}
                            user={user}
                        />
                    ))}
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default Team;