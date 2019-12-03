import Grid from "@material-ui/core/Grid";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {amber} from "@material-ui/core/colors";
import UserAvatar from "../UserAvatar";

const useStyles = makeStyles(theme => ({
    padding: {
        padding: '10px',
        textAlign: 'center'
    },
    centered: {
        alignSelf: 'center'
    },
    userName: {
        color: amber[500],
        marginTop: theme.spacing(1)
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
                <UserAvatar user={user} isBigAvatar={false}/>
            </Grid>
            <div className={classes.userName}>
                {`${user.firstName} ${user.lastName}`}
            </div>
            {user.status && <div>{user.status}</div>}
        </Grid>
    );
};

export default TeamMember;