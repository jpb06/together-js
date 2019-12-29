import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Waiting from "../Waiting";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import DialogContentText from "@material-ui/core/DialogContentText";
import React, {useEffect, useState} from "react";
import DownTransition from "../transitions/DownTransition";
import {DialogActions, makeStyles} from "@material-ui/core";
import {amber} from "@material-ui/core/colors";
import useLifecycleStatus from "../../../../logic/hooks/useLifecycleStatus";
import {getFromLocalStorage, LocalStorageKeys} from "../../../../logic/local.store";
import {getUserTeams} from "../../../../logic/api/user.api";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import TeamAvatar from "../../user/TeamAvatar";
import SimpleButton from "../buttons/SimpleButton";
import HighlightedText from "../HighlightedText";

const useStyles = makeStyles(theme => ({
    title: {
        color: amber[300]
    },
    titlePrimary: {
        color: theme.palette.primary.main
    },
    dialogContent: {
        padding: 0
    },
    waitingContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 20
    },
    text: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    teamItem: {
        paddingLeft: 20,
        paddingRight: 20
    }
}));

const SwitchTeamModal = ({isOpened, title, text, closeAction, confirmAction}) => {
    const classes = useStyles();
    const isMounted = useLifecycleStatus();

    const [teams, setTeams] = useState([]);
    const [currentTeam] = useState(getFromLocalStorage(LocalStorageKeys.currentTeam));
    const [isLoading, setIsLoading] = useState(true);

    // This will trigger at component first render (only once)
    useEffect(() => {
        if (isOpened) {
            const fetchUserTeams = async () => {
                console.log('fetching user teams');
                const currentUser = getFromLocalStorage(LocalStorageKeys.user);
                const userTeamsResult = await getUserTeams(currentUser.id, true);
                if (isMounted.current) {
                    if (userTeamsResult.status === 200) {
                        if (userTeamsResult.data.length === 1) {
                            closeAction(1);
                        } else {
                            setTeams(userTeamsResult.data);
                        }
                    } else {
                        closeAction(-1);
                    }
                    setIsLoading(false);
                }
            };

            fetchUserTeams();
        }
    }, [isOpened, closeAction, isMounted]);

    const getTeamMembers = (team) => <HighlightedText
        text={`${team.members.length} member${team.members.length > 1 ? 's' : ''}`}/>;
    const getLastActivity = (team) => <HighlightedText text={`Last activity - ${team.lastActivity}`}/>;

    return (
        <Dialog
            open={isOpened}
            TransitionComponent={DownTransition}
            transitionDuration={500}
            maxWidth={'xs'}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"

        >
            <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
                {title}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                {isLoading && <div className={classes.waitingContainer}>
                    <Waiting
                        addTopPadding={false}
                        IconComponent={AddCircleOutlineIcon}
                        color="white"
                        text={'Please hold while our hamsters handle the request in our secret basement'}
                    />
                </div>
                }
                {!isLoading && teams.length > 0 && <div>
                    <DialogContentText>
                        <div className={classes.text}>{text}</div>
                        <List disablePadding={true}>
                            {
                                teams.map(team =>
                                    <ListItem
                                        disableGutters={true}
                                        divider={true}
                                        selected={team._id === currentTeam._id}
                                        className={classes.teamItem}
                                    >
                                        <ListItemAvatar>
                                            <TeamAvatar team={team}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            classes={{primary: team._id === currentTeam._id ? classes.title : classes.titlePrimary}}
                                            primary={`Team ${team.name}`}
                                            secondary={
                                                <span>
                                                {getTeamMembers(team)}
                                                    <br/>
                                                    {getLastActivity(team)}
                                            </span>
                                            }
                                        />
                                    </ListItem>
                                )
                            }
                        </List>
                    </DialogContentText>
                    <DialogActions>
                        <SimpleButton text="No, not really" onClick={closeAction}/>
                    </DialogActions>
                </div>
                }
            </DialogContent>
        </Dialog>
    );
};

export default SwitchTeamModal;