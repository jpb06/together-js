import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    padding: {
        padding: '10px',
        textAlign: 'center'
    },
    centered: {
        alignSelf: 'center'
    }
}));

const TeamMember = ({user}) => {
    const classes = useStyles();

    return (
        <Grid
            item
            md={3}
            xs={6}
            className={classes.padding}
        >
            <Grid
                container
                justify="center"
            >
                <Avatar src={`/static/images/avatars/${user.avatarName}`}/>
            </Grid>
            <p>{`${user.firstName} ${user.lastName}`}</p>
        </Grid>
    );
};

export default TeamMember;