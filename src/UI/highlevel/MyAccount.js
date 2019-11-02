import React, {useEffect, useState} from "react";
import UserAvatar from "../bricks/user/UserAvatar";
import {getFromLocalStorage, LocalStorageKeys} from "../../logic/local.store";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TeamsList from "../bricks/user/team/TeamsList";
import {getUserTeams} from "../../logic/api/user.api";
import ApiError from "../bricks/generic/errors/ApiError";
import Waiting from "../bricks/generic/Waiting";

const useStyles = makeStyles(theme => ({
    top: {
        marginTop: theme.spacing(3)
    },
    withMargin: {
        marginBottom: theme.spacing(1)
    },
    centered: {
        textAlign: 'center'
    },
    userName: {
        fontSize: '1.5rem',
        marginTop: theme.spacing(1)
    },
    userMail: {
        marginBottom: theme.spacing(2),
        color: theme.palette.primary.main
    },
    separator: {
        width: '40%'
    }
}));

const MyAccount = ({reportLoading, showSnackbar}) => {
    const classes = useStyles();

    const [user, setUser] = React.useState({});
    const [userTeams, setUserTeams] = React.useState([]);
    const [isErrored, setIsErrored] = useState(false);
    const [isReady, setIsready] = useState(false);

    // This will trigger at component first render (only once)
    useEffect(() => {
        reportLoading(true);

        async function fetch() {
            console.log('fetching user data');

            const storedUser = getFromLocalStorage(LocalStorageKeys.user);
            setUser(storedUser);

            const teamsRequest = await getUserTeams(storedUser.id);
            if (teamsRequest.status === 200) {
                setUserTeams(teamsRequest.data);
            } else {
                setIsErrored(true);
            }

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
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={classes.top}
                >
                    <UserAvatar
                        user={user}
                        isBigAvatar={true}
                    />
                    <Grid className={classes.centered}>
                        <div className={classes.userName}>{`${user.firstName} ${user.lastName}`}</div>
                        <div className={classes.userMail}>{user.email}</div>
                    </Grid>
                    <hr size="1" className={classes.separator}/>
                    <h1>Teams</h1>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        className={classes.withMargin}
                    >
                        <Grid item md={12} xs={12}>
                            <TeamsList teams={userTeams}/>
                        </Grid>
                    </Grid>
                </Grid>
            );
        } else {
            return <Waiting/>;
        }
    }
};

export default MyAccount;