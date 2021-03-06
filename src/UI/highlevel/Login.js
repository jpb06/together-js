import {makeStyles, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React from "react";
import {Link as RouterLink, useHistory} from 'react-router-dom';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Logo from "../bricks/menu/Logo";
import LinearProgress from "@material-ui/core/LinearProgress";
import {LocalStorageKeys, setInLocalStorage} from "../../logic/local.store";
import {login} from "../../logic/api/security.api";
import {fade} from "@material-ui/core/styles";
import FeedbackButton from "../bricks/generic/buttons/FeedbackButton";
import Link from "@material-ui/core/Link";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {initializeLoggedUserContext} from "../../logic/user.util";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        backgroundImage: 'url("/static/images/background/background14.jpg")',
        backgroundSize: 'cover'
    },
    form: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    card: {
        width: '100%',
        maxWidth: 350,
        paddingBottom: theme.spacing(2),
        backgroundColor: fade(theme.palette.background.default, 0.83)
    },
    media: {
        height: 160,
    },
    actions: {
        paddingTop: 0,
        justifyContent: 'center'
    },
    newAccount: {
        paddingTop: '10px',
        textAlign: 'center',
        color: theme.palette.primary.main
    }
}));

const Login = () => {
    let history = useHistory();
    const classes = useStyles();

    const [loginState, setLoginState] = React.useState({
        isPending: false,
        isErrored: false,
        isSubmitted: false,
        text: 'Login',
        email: '',
        password: ''
    });

    // Whenever form data changes...
    const updateField = e => setLoginState({
        ...loginState,
        [e.target.name]: e.target.value
    });

    // Logging in...
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginState(prevState => ({
            ...prevState,
            text: 'Login',
            isSubmitted: true,
            isErrored: false
        }));

        if (loginState.email === '' || loginState.password === '') return;

        setLoginState(prevState => ({
            ...prevState,
            text: 'Logging in ...',
            isPending: true
        }));

        const isEmailValid = loginState.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (!isEmailValid) {
            setLoginState(prevState => ({
                ...prevState,
                text: 'Not a valid email',
                isPending: false,
                isErrored: true
            }));
        } else {
            const authResult = await login(loginState.email, loginState.password);
            if (authResult) {
                initializeLoggedUserContext(authResult);
                if (authResult.user.teams.length > 0) {
                    setInLocalStorage(LocalStorageKeys.currentTeam, authResult.user.teams[0]);
                } else {
                    console.log('no team!');
                }

                history.push({
                    pathname: '/main'
                });
            } else {
                setLoginState(prevState => ({
                    ...prevState,
                    text: 'Failure && Try again ?',
                    isPending: false,
                    isErrored: true
                }));
            }
        }
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
            <form onSubmit={handleSubmit} className={classes.form}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image="/static/images/Agile_2.jpg"
                        title="Agile"
                    />
                    <CardContent>
                        {loginState.isPending && <LinearProgress/>}
                        <Logo color="primary"
                              shouldBeCentered
                              shouldBeLargeFont
                              showDescriptionText
                              disableLink
                        />
                        <TextField
                            value={loginState.email}
                            onChange={updateField}
                            error={loginState.isSubmitted && loginState.email === ""}
                            required
                            id="email"
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                        <br/>
                        <TextField
                            value={loginState.password}
                            onChange={updateField}
                            error={loginState.isSubmitted && loginState.password === ""}
                            required
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <FeedbackButton
                            IconComponent={AddCircleIcon}
                            handleSubmit={handleSubmit}
                            actionFeedback={loginState}
                        />
                    </CardActions>
                    <div className={classes.newAccount}>
                        <Link component={RouterLink} to="/newaccount" color="primary">
                            <Typography>I don't have an account</Typography>
                        </Link>
                    </div>
                </Card>
            </form>
        </Grid>
    );
};

export default Login;