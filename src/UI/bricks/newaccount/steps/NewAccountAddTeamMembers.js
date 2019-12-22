import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import StepTitle from "../StepTitle";
import {useHistory} from "react-router";
import SimpleButton from "../../generic/buttons/SimpleButton";
import BlackCard from "../../generic/containers/BlackCard";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import {makeStyles, Typography} from "@material-ui/core";
import TeamMember from "../../user/team/TeamMember";
import FeedbackButton from "../../generic/buttons/FeedbackButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {getFromLocalStorage, LocalStorageKeys} from "../../../../logic/local.store";
import {inviteUser} from "../../../../logic/api/user.api";
import Divider from "@material-ui/core/Divider";
import useLifecycleStatus from "../../../../logic/hooks/useLifecycleStatus";

const useStyles = makeStyles(theme => ({
    divider: {
        marginBottom: theme.spacing(2)
    }
}));

const NewAccountAddTeamMembers = ({reportLoading, showSnackbar}) => {
    const classes = useStyles();
    const history = useHistory();
    const isMounted = useLifecycleStatus();

    const [teamMemberRequests, setTeamMemberRequests] = useState([]);
    const [goToTimelineText, setGoToTimelineText] = useState('No thanks, bring me to my timeline!');
    const [formData, setFormData] = useState({
        isPending: false,
        isErrored: false,
        isSubmitted: false,
        text: 'Send invite',
        email: ''
    });

    // This will trigger at component first render (only once)
    useEffect(() => {
        const currentUser = getFromLocalStorage(LocalStorageKeys.user);
        setTeamMemberRequests(requests => requests.concat({
            _id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            avatarName: currentUser.avatarName,
            status: 'Team creator'
        }));
    }, []);

    // Whenever form data changes...
    const updateField = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const goToTimeline = () => {
        history.push({
            pathname: '/main'
        });
    };

    const submitJoinRequest = async () => {
        const isEmailValid = formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (isEmailValid) {
            reportLoading(true);
            setFormData({
                ...formData,
                isSubmitted: true,
                isErrored: false,
                isPending: true
            });

            const currentTeam = getFromLocalStorage(LocalStorageKeys.currentTeam);
            const result = await inviteUser(currentTeam._id, formData.email);
            console.log(result);
            if (isMounted.current) {
                if (result.status === 200) {
                    setTeamMemberRequests(requests => requests.concat({
                        ...result.data,
                        status: 'Invite sent'
                    }));
                    setGoToTimelineText("I'm done! Bring me to my timeline!");
                } else if (result.status === 520) {
                    showSnackbar('error', result.message);
                } else {
                    showSnackbar('error', 'An error occured while sending the team invitation');
                }
                setFormData({
                    ...formData,
                    email: '',
                    isPending: false
                });
                reportLoading(false);
            }
        } else {
            showSnackbar('warning', 'Looks like you did not enter a valid email. Mind correcting it?');
        }
    };

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
        >
            <StepTitle
                title="Add members to your team"
                secondaryText="Almost done! Would you like to add right away people to your team?"
            />
            <Grid item xs={12} sm={12}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12} md={12}>
                        <SimpleButton
                            text={goToTimelineText}
                            onClick={goToTimeline}
                        />
                    </Grid>
                    <Grid>
                        <AccountCircleIcon style={{width: '80px', height: '80px'}} color="primary"/>
                    </Grid>
                    <Grid item xs={12} md={12} style={{width: '100%'}}>
                        <Slide direction="up" timeout={500} in={true} mountOnEnter unmountOnExit>
                            <BlackCard children={
                                <div>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="flex-start"
                                    >
                                        {teamMemberRequests.map(user => (
                                            <TeamMember
                                                key={user._id}
                                                user={user}
                                            />
                                        ))}
                                    </Grid>
                                    <Divider className={classes.divider}/>
                                    <Typography>We will send a join request to the user this email belongs
                                        to</Typography>
                                    <TextField
                                        required
                                        id="email"
                                        label="User email"
                                        name="email"
                                        type="email"
                                        margin="dense"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.email}
                                        error={formData.isSubmitted && formData.email === ""}
                                        onChange={updateField}
                                    />
                                    <FeedbackButton
                                        IconComponent={AddCircleIcon}
                                        actionFeedback={formData}
                                        handleSubmit={submitJoinRequest}
                                    />
                                </div>
                            }/>
                        </Slide>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NewAccountAddTeamMembers;