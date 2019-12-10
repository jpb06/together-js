import React, {useEffect, useState} from "react";
import UserAvatar from "../bricks/user/UserAvatar";
import {clearLocalStorage, getFromLocalStorage, LocalStorageKeys} from "../../logic/local.store";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TeamsList from "../bricks/user/team/TeamsList";
import {getUserTeams} from "../../logic/api/user.api";
import Waiting from "../bricks/generic/Waiting";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LoopIcon from "@material-ui/icons/Loop";
import TopLevelFeedback from "../bricks/generic/TopLevelFeedback";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3),
        height: '100%',
        opacity: 0.87
    },
    centered: {
        textAlign: 'center'
    },
    userName: {
        fontSize: '1.5rem',
        marginTop: theme.spacing(1)
    },
    userMail: {
        color: theme.palette.primary.main
    },
    action: {
        width: '100% !important',
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(1),
        justifyContent: 'start'
    },
    actionIcon: {
        marginRight: theme.spacing(1)
    }
}));

const MyAccount = ({reportLoading, showSnackbar, history}) => {
    const classes = useStyles();

    const isMounted = React.useRef(false);

    const [user, setUser] = React.useState({});
    const [userTeams, setUserTeams] = React.useState([]);
    const [isErrored, setIsErrored] = useState(false);
    const [isReady, setIsready] = useState(false);

    // This will trigger at component first render (only once)
    useEffect(() => {
        isMounted.current = true;
        reportLoading(true);

        async function fetch() {
            console.log('fetching user data');

            const storedUser = getFromLocalStorage(LocalStorageKeys.user);
            setUser(storedUser);

            const teamsRequest = await getUserTeams(storedUser.id);
            if (isMounted.current) {
                if (teamsRequest.status === 200) {
                    setUserTeams(teamsRequest.data);
                } else {
                    setIsErrored(true);
                }

                setIsready(true);
                reportLoading(false);
            }
        }

        fetch();

        return function cleanup() {
            isMounted.current = false;
        };
    }, [reportLoading]);

    const handleLogoff = () => {
        clearLocalStorage();
        history.push({
            pathname: '/'
        });
    };

    if (isErrored) {
        return (
            <TopLevelFeedback
                Icon={SentimentDissatisfiedIcon}
                title="Oh no!"
                text="Turns out we couldn't fetch your profile"
            />
        );
    } else {
        if (isReady) {
            return (
                <Grid
                    container
                    spacing={1}
                    direction="row"
                >
                    <Grid item md={12} xs={12}>
                        <h1>My account</h1>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Paper className={classes.paper}>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <UserAvatar
                                    user={user}
                                    isBigAvatar={true}
                                />
                                <Grid className={classes.centered}>
                                    <div className={classes.userName}>{`${user.firstName} ${user.lastName}`}</div>
                                    <div className={classes.userMail}>{user.email}</div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Paper className={classes.paper}>

                            <Fab
                                variant="extended"
                                size="medium"
                                color="secondary"
                                aria-label="logoff"
                                className={classes.action}
                            >
                                <AssignmentIndIcon className={classes.actionIcon}/>
                                Edit my profile
                            </Fab>

                            <Fab
                                variant="extended"
                                size="medium"
                                color="secondary"
                                aria-label="logoff"
                                className={classes.action}
                                onClick={handleLogoff}
                            >
                                <PowerSettingsNewIcon className={classes.actionIcon}/>
                                Logoff
                            </Fab>
                        </Paper>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <h1>My teams</h1>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Paper className={classes.paper}>
                            <TeamsList teams={userTeams}/>
                        </Paper>
                    </Grid>
                </Grid>
            );
        } else {
            return <Waiting
                addTopPadding={true}
                IconComponent={LoopIcon}
                text="Sinister Dexter Has a Broken Spirometer"
                color="white"
            />;
        }
    }
};

export default MyAccount;