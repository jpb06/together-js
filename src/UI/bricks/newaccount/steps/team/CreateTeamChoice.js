import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    centered: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
    },
    actionIcon: {
        width: 100,
        height: 100
    }
}));

const CreateTeamChoice = ({choice, newTeam}) => {
    const classes = useStyles();

    if (choice === -1) {
        return (
            <Slide direction="right" timeout={600} in={choice === -1} mountOnEnter unmountOnExit>
                <Grid item xs={6} sm={6} className={classes.centered}>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <IconButton
                                aria-label="create-team"
                                color="primary"
                                onClick={newTeam}
                            >
                                <AddCircleOutlineIcon className={classes.actionIcon}/>
                            </IconButton>

                        </Grid>
                        <Grid item>
                            <Typography color="primary">
                                Create a team
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Slide>
        );
    } else return null;
};

export default CreateTeamChoice;