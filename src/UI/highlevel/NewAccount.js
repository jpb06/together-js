import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Logo from "../bricks/menu/Logo";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import NewAccountMyInfos from "../bricks/newaccount/steps/NewAccountMyInfos";
import NewAccountMyAvatar from "../bricks/newaccount/steps/NewAccountMyAvatar";
import NewAccountMyTeams from "../bricks/newaccount/steps/NewAccountMyTeams";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FaceIcon from '@material-ui/icons/Face';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import clsx from 'clsx';
import {amber} from "@material-ui/core/colors";
import ColoredFatProgress from "../bricks/generic/ColoredFatProgress";
import FeedbackSnackbar from "../bricks/generic/errors/FeedbackSnackbar";
import NewAccountAddTeamMembers from "../bricks/newaccount/steps/NewAccountAddTeamMembers";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        backgroundImage: 'url("/static/images/background/background1.jpg")',
        backgroundSize: 'cover'
    },
    fixedWidth: {
        maxWidth: '700px',
        padding: theme.spacing(1),
    },
    stepper: {
        padding: 0,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2)
    },
    stepCompleted: {
        color: amber[500] + ' !important'
    },
    alternativeLabel: {
        marginTop: '0 !important'
    },
    card: {
        opacity: 0.89,
        minWidth: '100%'
    },
    cardMedia: {
        height: 70,
    },
    cardContent: {
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(2)
    }
}));

const FatLoader = ColoredFatProgress(amber[500])();
const NewAccount = () => {
    const classes = useStyles();

    const [newUser, setNewUser] = useState({
        fullName: '',
        initials: '',
    });

    const [step, setStep] = useState(0);
    const [userHasTeam, setUserHasTeam] = React.useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const feedbackQueue = React.useRef([]);
    const [feedbackSnackbarInfo, setFeedbackSnackbarInfo] = React.useState({key: '', variant: 'error', message: ''});
    const [isFeedbackSnackbarOpen, setIsFeedbackSnackbarOpen] = React.useState(undefined);

    // unstacking one message to display and displaying the taskbar
    const processFeedbackQueue = () => {
        if (feedbackQueue.current.length > 0) {
            setFeedbackSnackbarInfo(feedbackQueue.current.shift());
            setIsFeedbackSnackbarOpen(true);
        }
    };

    // Dispatch from a child stating there is a message to display
    const messageRequestedFromChild = (variant, message) => {
        feedbackQueue.current.push({
            variant,
            message,
            key: new Date().getTime(),
        });

        if (isFeedbackSnackbarOpen) {
            // immediately begin dismissing current message
            // to start showing new one
            setIsFeedbackSnackbarOpen(false);
        } else {
            processFeedbackQueue();
        }
    };

    const closeFeedbackSnackbar = () => setIsFeedbackSnackbarOpen(false);
    const exitFeedbackSnackbar = () => processFeedbackQueue();

    const reportLoading = (value) => setIsLoading(value);

    const reportMyInfosStepComplete = (user) => {
        setNewUser({...newUser, ...user});
        setIsLoading(false);
        setStep(1);
    };

    const reportMyAvatarStepComplete = () => {
        setIsLoading(false);
        setStep(2);
    };

    const reportMyTeamsStepComplete = () => {
        setUserHasTeam(true);
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.root}
        >
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.fixedWidth}
            >
                <Card className={classes.card}>
                    <CardHeader
                        title={
                            <Logo
                                shouldBeCentered={true}
                                disableLink={true}
                                shouldBeLargeFont={true}
                                showDescriptionText={true}
                                isTitle={false}
                                color={'primary'}
                            />
                        }
                    />
                    <CardMedia
                        className={classes.cardMedia}
                        image="/static/images/Agile_2.jpg"
                        title="Agile"
                    />
                    {isLoading && <FatLoader variant="query"/>}
                    <CardContent className={classes.cardContent}>
                        <Stepper
                            alternativeLabel
                            orientation="horizontal"
                            activeStep={step}
                            className={classes.stepper}
                        >
                            <Step>
                                <StepLabel
                                    completed={step > 0}
                                    active={step === 0}
                                    icon={<PersonAddIcon/>}
                                    className={clsx({
                                        [classes.stepCompleted]: step >= 0
                                    })}
                                    classes={{
                                        alternativeLabel: clsx(classes.alternativeLabel, {
                                            [classes.stepCompleted]: step >= 0
                                        })
                                    }}
                                >
                                    Infos
                                </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel
                                    completed={step > 1}
                                    active={step === 1}
                                    icon={<FaceIcon/>}
                                    className={clsx({
                                        [classes.stepCompleted]: step >= 1
                                    })}
                                    classes={{
                                        alternativeLabel: clsx(classes.alternativeLabel, {
                                            [classes.stepCompleted]: step >= 1
                                        })
                                    }}
                                >
                                    Avatar
                                </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel
                                    completed={step > 2}
                                    active={step === 2}
                                    icon={<GroupWorkIcon/>}
                                    className={clsx({
                                        [classes.stepCompleted]: step >= 2
                                    })}
                                    classes={{
                                        alternativeLabel: clsx(classes.alternativeLabel, {
                                            [classes.stepCompleted]: step >= 2
                                        })
                                    }}
                                >
                                    Teams
                                </StepLabel>
                            </Step>
                        </Stepper>
                        {step === 0 && <NewAccountMyInfos
                            reportStepComplete={reportMyInfosStepComplete}
                            reportLoading={reportLoading}
                            showSnackbar={messageRequestedFromChild}
                        />}
                        {step === 1 && <NewAccountMyAvatar
                            fullName={newUser.fullName}
                            initials={newUser.initials}
                            reportStepComplete={reportMyAvatarStepComplete}
                            reportLoading={reportLoading}
                            showSnackbar={messageRequestedFromChild}
                        />}
                        {step === 2 && !userHasTeam && <NewAccountMyTeams
                            reportLoading={reportLoading}
                            showSnackbar={messageRequestedFromChild}
                            reportStepComplete={reportMyTeamsStepComplete}
                        />}
                        {step === 2 && userHasTeam && <NewAccountAddTeamMembers
                            reportLoading={reportLoading}
                            showSnackbar={messageRequestedFromChild}
                        />}
                        <FeedbackSnackbar
                            closeFeedbackSnackbar={closeFeedbackSnackbar}
                            exitFeedbackSnackbar={exitFeedbackSnackbar}
                            isOpen={isFeedbackSnackbarOpen}
                            feedbackSnackbarInfo={feedbackSnackbarInfo}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default NewAccount;