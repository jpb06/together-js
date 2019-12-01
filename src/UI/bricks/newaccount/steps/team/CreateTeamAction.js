import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FeedbackButton from "../../../generic/buttons/FeedbackButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {createTeam} from "../../../../../logic/api/team.api";
import {LocalStorageKeys, setInLocalStorage} from "../../../../../logic/local.store";
import SimpleButton from "../../../generic/buttons/SimpleButton";
import BlackCard from "../../../generic/containers/BlackCard";
import NewAccountWaitingContainer from "../../NewAccountWaitingContainer";

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

const CreateTeamAction = ({reportTeamCreated, reportLoading, showSnackbar, choice, reset}) => {
    const classes = useStyles();

    const isMounted = React.useRef(false);

    const [formData, setFormData] = useState({
        isPending: false,
        isErrored: false,
        isSubmitted: false,
        text: 'Create team',
        teamName: ''
    });

    // This will trigger at component first render (only once)
    useEffect(() => {
        isMounted.current = true;

        return function cleanup() {
            isMounted.current = false;
        };
    }, []);

    // Whenever form data changes...
    const updateField = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const reportError = () => {
        showSnackbar('error', 'An error occured while creating the team');
        setFormData({
            ...formData,
            isErrored: true,
            isPending: false
        });
        reportLoading(false);
    };

    const submitTeamCreation = async () => {
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

            const result = await createTeam(formData.teamName);
            if (isMounted.current) {
                if (result.status === 200) {
                    setInLocalStorage(LocalStorageKeys.currentTeam, {
                        _id: result.data,
                        name: formData.teamName
                    });
                    setFormData({
                        ...formData,
                        isPending: false
                    });
                    reportLoading(false);
                    reportTeamCreated();
                } else {
                    reportError();
                }
            }
        }
    };

    const cancel = () => reset();

    if (choice === 0) {
        if (formData.isPending) {
            return (<NewAccountWaitingContainer text={`Creating team ${formData.teamName}`}
                                                IconComponent={GroupWorkIcon}/>);
        } else {
            return (
                <Grid item xs={12} sm={12} className={classes.centered}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <SimpleButton
                                text="Nevermind, let's join a team"
                                onClick={cancel}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Slide direction="right" timeout={500} in={choice === 0} mountOnEnter unmountOnExit>
                                <AddCircleOutlineIcon className={classes.actionIcon} color="primary"/>
                            </Slide>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Slide direction="up" timeout={500} in={choice === 0} mountOnEnter unmountOnExit>
                                <BlackCard children={
                                    <div>
                                        Choose a name for your new team
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
                                            IconComponent={AddCircleIcon}
                                            actionFeedback={formData}
                                            handleSubmit={submitTeamCreation}
                                        />
                                    </div>
                                }/>
                            </Slide>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
    } else return null;
};

export default CreateTeamAction;