import Dialog from "@material-ui/core/Dialog";
import DownTransition from "../transitions/DownTransition";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Waiting from "../Waiting";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DialogActions from "@material-ui/core/DialogActions";
import SimpleButton from "../buttons/SimpleButton";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import {amber} from "@material-ui/core/colors";
import JoinQuestion from "../../Timeline/step/teaminvite/JoinQuestion";
import {getFromLocalStorage, LocalStorageKeys} from "../../../../logic/local.store";
import {acceptTeamInvite, getUserTeams} from "../../../../logic/api/user.api";
import useLifecycleStatus from "../../../../logic/hooks/useLifecycleStatus";
import SwitchTeamStep from "../../Timeline/step/teaminvite/SwitchTeamStep";
import clsx from "clsx";

const useStyles = makeStyles({
    title: {
        color: amber[300]
    },
    dialogContent: {
        padding: 0
    },
    waitingContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 20
    }
});

const HandleTeamInviteModal = ({isOpened, title, requestId, teamName, closeAction}) => {
    const classes = useStyles();

    const isMounted = useLifecycleStatus();

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [teams, setTeams] = useState([]);
    const [currentTeam] = useState(getFromLocalStorage(LocalStorageKeys.currentTeam));

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
                    setStep(1);
                    setIsLoading(false);
                }
            } else {
                closeAction(-2);
            }
        }
    };

    const handleAcceptInvite = async () => {
        setIsLoading(true);

        const result = await acceptTeamInvite(requestId);
        if (isMounted.current) {
            if (result.status === 200) {
                await fetchUserTeams();

            } else {
                closeAction(-1);
            }
        }
    };

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
            <DialogContent className={clsx({
                [classes.dialogContent]: step === 1 || isLoading
            })}>
                {isLoading && <div className={classes.waitingContainer}>
                    <Waiting
                        addTopPadding={false}
                        IconComponent={AddCircleOutlineIcon}
                        color="white"
                        text={'Please hold while our hamsters handle the request in our secret basement'}
                    />
                </div>
                }
                {!isLoading &&
                <div id="alert-dialog-slide-description">
                    {{
                        0: <JoinQuestion teamName={teamName}/>,
                        1: <SwitchTeamStep teams={teams} currentTeamId={currentTeam._id} joinedTeamName={teamName}
                                           closeAction={closeAction}/>
                    }[step]}
                </div>
                }
            </DialogContent>
            {!isLoading && {
                0: <DialogActions>
                    <SimpleButton text="Let's Join !" onClick={handleAcceptInvite}/>
                    <SimpleButton text="Nevermind" onClick={closeAction}/>
                </DialogActions>,
                1: <DialogActions>
                    <SimpleButton text="I don't want to switch team" onClick={closeAction.bind(this, 2, currentTeam)}/>
                </DialogActions>
            }[step]}
        </Dialog>
    );
};

export default HandleTeamInviteModal;