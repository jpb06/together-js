import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import FeedbackButton from "../../generic/buttons/FeedbackButton";
import {makeStyles} from "@material-ui/core";
import PasswordStrength from "../PasswordStrength";
import {initializeLoggedUserContext} from "../../../../logic/user.util";
import FaceIcon from '@material-ui/icons/Face';
import StepTitle from "../StepTitle";
import {createNewUser} from "../../../../logic/api/anonymous.api";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {deepOrange} from "@material-ui/core/colors";
import {login} from "../../../../logic/api/security.api";
import TogetherApi from "../../../../logic/api/setup/together.api";
import {useHistory} from "react-router-dom";
import NewAccountWaitingContainer from "../NewAccountWaitingContainer";
import useLifecycleStatus from "../../../../logic/hooks/useLifecycleStatus";

const useStyles = makeStyles(theme => ({
    noMargin: {
        margin: 0
    },
    waitingContainer: {
        height: '290px'
    },
    errorText: {
        color: deepOrange[800],
        fontWeight: 'bold'
    }
}));

const NewAccountMyInfos = ({reportStepComplete, reportLoading, showSnackbar}) => {
    const classes = useStyles();
    const history = useHistory();

    const isMounted = useLifecycleStatus();

    const [formData, setFormData] = useState({
        isPending: false,
        isErrored: false,
        isSubmitted: false,
        text: 'Choose my avatar',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Whenever form data changes...
    const updateField = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const reportError = () => {
        showSnackbar('error', 'An error occured while setting up your account');
        setFormData({
            ...formData,
            isErrored: true,
            isPending: false
        });
        reportLoading(false);
    };

    const handleSubmit = async () => {
        setFormData({
            ...formData,
            isSubmitted: true,
        });

        const isEmailValid = formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (isEmailValid
            && formData.firstName.length > 0
            && formData.lastName.length > 0
            && formData.password.length > 0
            && formData.confirmPassword.length > 0
            && formData.password === formData.confirmPassword
        ) {
            reportLoading(true);
            setFormData({
                ...formData,
                isSubmitted: true,
                isErrored: false,
                isPending: true
            });

            const result = await createNewUser(formData.firstName, formData.lastName, formData.email, formData.password);
            if (isMounted.current) {
                if (result) {
                    if (result.status === 400) {
                        showSnackbar('warning', 'This email is already in use');
                        setFormData({
                            ...formData,
                            isErrored: true,
                            isPending: false
                        });
                        reportLoading(false);

                    } else if (result.status === 200) {
                        const authResult = await login(formData.email, formData.password);
                        if (authResult) {
                            const user = initializeLoggedUserContext(authResult);
                            TogetherApi.setup(history);
                            setFormData({
                                ...formData,
                                isPending: false
                            });
                            reportStepComplete(user);
                        } else {
                            reportError();
                        }
                    }
                } else {
                    reportError();
                }
            }
        }
    };

    const isPasswordValid = () => !formData.isSubmitted || (formData.isSubmitted &&
        formData.password !== "" &&
        formData.confirmPassword !== "" &&
        formData.password === formData.confirmPassword);

    if (formData.isPending) {
        return (<NewAccountWaitingContainer text="Creating your account" IconComponent={AddCircleOutlineIcon}/>);
    } else {
        return (
            <form>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <StepTitle title="Welcome !"/>
                    <Grid item sm={12} xs={12}>
                        <Typography color="primary">
                            Please tell us a little bit about yourself
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            label="First name"
                            type="text"
                            name="firstName"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            value={formData.firstName}
                            error={formData.isSubmitted && formData.firstName === ""}
                            onChange={updateField}
                            className={classes.noMargin}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            label="Last name"
                            name="lastName"
                            type="text"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            value={formData.lastName}
                            error={formData.isSubmitted && formData.lastName === ""}
                            onChange={updateField}
                            className={classes.noMargin}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <TextField
                            required
                            id="email"
                            label="Email address"
                            name="email"
                            type="email"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            error={formData.isSubmitted && (formData.email === "" || !formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))}
                            onChange={updateField}
                            className={classes.noMargin}
                            autoComplete="username"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography color="primary">Time to choose a cool password !</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            required
                            id="password"
                            label="password"
                            name="password"
                            type="password"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            value={formData.password}
                            error={!isPasswordValid()}
                            onChange={updateField}
                            className={classes.noMargin}
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            required
                            id="confirmPassword"
                            label="Confirm password"
                            name="confirmPassword"
                            type="password"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            value={formData.confirmPassword}
                            error={!isPasswordValid()}
                            onChange={updateField}
                            className={classes.noMargin}
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {formData.password === formData.confirmPassword &&
                        <PasswordStrength password={formData.password}/>}
                        {formData.password !== formData.confirmPassword &&
                        <div className={classes.errorText}>Passwords differ</div>}
                    </Grid>
                    <FeedbackButton
                        IconComponent={FaceIcon}
                        actionFeedback={formData}
                        handleSubmit={handleSubmit}
                    />
                </Grid>
            </form>
        );
    }
};

export default NewAccountMyInfos;