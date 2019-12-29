import React from "react";
import {makeStyles} from "@material-ui/core";
import HighlightedText from "../../../generic/HighlightedText";
import SimpleButton from "../../../generic/buttons/SimpleButton";
import HandleTeamInviteModal from "../../../generic/modals/HandleTeamInviteModal";
import BasicChoiceModal from "../../../generic/modals/BasicChoiceModal";
import {declineTeamInvite} from "../../../../../logic/api/user.api";
import useLifecycleStatus from "../../../../../logic/hooks/useLifecycleStatus";
import DeclineQuestion from "./DeclineQuestion";

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '25px',
        color: theme.palette.primary.main
    },
    actions: {
        marginTop: '5px'
    }
}));

const TimeLineUserInvite = ({_id, referrer, team, showSnackbar, reloadTimeline}) => {
    const classes = useStyles();
    const isMounted = useLifecycleStatus();

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [declineInviteState, setDeclineInviteState] = React.useState({
        isOpened: false,
        isLoading: false,
        title: 'Decline invite',
        questionText: <DeclineQuestion teamName={team.name}/>,
        yesAnswerText: 'Decline',
        noAnswerText: 'Nevermind'
    });

    const openJoinModal = () => setIsModalOpen(true);
    const closeJoinModal = (status, team) => {
        setIsModalOpen(false);
        if (status === -1) {
            showSnackbar('error', 'An error occured while joining the team');
        } else if (status === -2) {
            showSnackbar('error', 'An error occured while retrieving your teams');
        } else if (status === 1) {
            showSnackbar('info', 'You only belong to one team');
        } else if (status === 2) {
            reloadTimeline(team);
        }
    };

    const toggleDeclineModal = () => setDeclineInviteState(state => ({...state, isOpened: !state.isOpened}));
    const declineInvite = async () => {
        const result = await declineTeamInvite(_id);
        if (isMounted.current) {
            if (result.status === 200) {
                reloadTimeline();
            } else {
                showSnackbar('error', 'An error occured while declining the invite');
            }
        }

        toggleDeclineModal();
    };

    return (
        <div className={classes.root}>
            You have been invited to join team <HighlightedText text={team.name}/> by <HighlightedText
            text={`${referrer.firstName} ${referrer.lastName}`}/>.
            <div className={classes.actions}>
                <SimpleButton text="Join" onClick={openJoinModal}/>&nbsp;
                <SimpleButton text="Decline" onClick={toggleDeclineModal}/>
            </div>
            <HandleTeamInviteModal
                isOpened={isModalOpen}
                title="Team invite"
                requestId={_id}
                teamName={team.name}
                closeAction={closeJoinModal}
            />
            <BasicChoiceModal
                state={declineInviteState}
                confirmAction={declineInvite}
                closeAction={toggleDeclineModal}
            />
        </div>
    );
};

export default TimeLineUserInvite;