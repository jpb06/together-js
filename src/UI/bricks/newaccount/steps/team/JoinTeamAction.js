import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import CallMergeIcon from '@material-ui/icons/CallMerge';
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FeedbackButton from "../../../generic/buttons/FeedbackButton"
import SimpleButton from "../../../generic/buttons/SimpleButton";
import BlackCard from "../../../generic/containers/BlackCard";
import {requestToJoinTeam} from "../../../../../logic/api/user.api";
import NewAccountWaitingContainer from "../../NewAccountWaitingContainer";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import TeamJoinRequestSent from "./TeamJoinRequestSent";
import useLifecycleStatus from "../../../../../logic/hooks/useLifecycleStatus";

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

const JoinTeamAction = ({reportLoading, showSnackbar, choice, reset, reportMembershipRequestSent}) => {
    const classes = useStyles();

    const isMounted = useLifecycleStatus();

    const [formData, setFormData] = useState({
        isPending: false,
        isErrored: false,
        isSubmitted: false,
        text: 'Request to join',
        teamName: ''
    });

    // Whenever form data changes...
    const updateField = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const completeAction = () => {
        setFormData({
            ...formData,
            isPending: false
        });
        reportLoading(false);
    };

    const joinTeam = async () => {
        setFormData({
            ...formData,
            isSubmitted: true,
        });

        if (formData.teamName !== '') {
            reportLoading(true);
            setFormData({
                ...formData,
                isErrored: false,
                isPending: true
            });

            const result = await requestToJoinTeam(formData.teamName);
            if (isMounted.current) {
                if (result.status === 200) {
                    reportMembershipRequestSent();
                    completeAction();
                } else if (result.status === 520) {
                    showSnackbar('error', result.message);
                    completeAction();
                } else {
                    showSnackbar('error', 'An error occured while sending your membership request');
                    setFormData({
                        ...formData,
                        isErrored: true,
                        isPending: false
                    });
                    reportLoading(false);
                }
            }
        }
    };

    const cancel = () => reset();

    if (choice === 1) {
        if (formData.isPending) {
            return (<NewAccountWaitingContainer
                text={`Sending membership request for team ${formData.teamName}`}
                IconComponent={SupervisedUserCircleIcon}
            />);
        } else {
            return (
                <Grid item xs={12} sm={12} className={classes.centered}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item className={classes.centered}>
                            <SimpleButton
                                text="Nevermind, let's create a team"
                                onClick={cancel}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Slide direction="left" timeout={500} in={choice === 1} mountOnEnter unmountOnExit>
                                <CallMergeIcon className={classes.actionIcon} color="primary"/>
                            </Slide>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Slide direction="up" timeout={500} in={choice === 1} mountOnEnter unmountOnExit>
                                <BlackCard children={
                                    <div>
                                        Enter the name of the team you wish to join
                                        <TextField
                                            required
                                            id="teamName"
                                            label="Team name"
                                            name="teamName"
                                            type="text"
                                            margin="dense"
                                            variant="outlined"
                                            fullWidth
                                            value={formData.teamName}
                                            error={formData.isSubmitted && formData.teamName === ""}
                                            onChange={updateField}
                                        />
                                        <FeedbackButton
                                            IconComponent={SupervisedUserCircleIcon}
                                            actionFeedback={formData}
                                            handleSubmit={joinTeam}
                                        />
                                    </div>
                                }/>
                            </Slide>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
    } else if (choice === 2) {
        return (<TeamJoinRequestSent teamName={formData.teamName}/>);
    } else return null;
};
export default JoinTeamAction;