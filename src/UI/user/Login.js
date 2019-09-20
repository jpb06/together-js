import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import ErrorIcon from "@material-ui/icons/Error";
import Logo from "../menu/Logo";
import LinearIndeterminate from "../demo/LinearUndeterminate";
import CircularProgress from "@material-ui/core/CircularProgress";
import {setInLocalStorage} from "../../logic/local.store";

const useStyles = makeStyles(theme => ({
    root:{
        minHeight: '100vh',
        backgroundImage:'url("/static/images/background/background14.jpg")',
        backgroundSize:'cover'
    },
    card: {
        width: 350,
        paddingBottom: theme.spacing(2)
    },
    media: {
        height: 160,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fabButton: {
        minWidth: '95% !important',
        justifyContent: 'left',
        textTransform:'none'
    },
    actions: {
        paddingTop: 0,
        justifyContent: 'center'
    },
    buttonIcon:{
        justifyContent:'left',
        paddingTop: '7px',
        marginLeft:'-7px'
    },
    buttonText:{
        justifyContent:'center',
        width: '100%'
    }
}));

const Login = ({ history }) => {
    const classes = useStyles();

    const [loginState, setLoginState] = React.useState({
        isLoading: false,
        isErrored: false,
        isSubmitted: false,
        feedback: 'Login',
        email: '',
        password: ''
    });

    const updateField = e => {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoginState(prevState => ({
            ...prevState,
            feedback:'Login',
            isSubmitted: true,
            isErrored: false
        }));

        if(loginState.email === '' || loginState.password === '') return;

        setLoginState(prevState => ({
            ...prevState,
            feedback:'Logging in ...',
            isLoading: true
        }));

        setTimeout(() => {
            const isEmailValid = loginState.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            if(!isEmailValid) {
                setLoginState(prevState => ({
                    ...prevState,
                    feedback:'Not a valid email',
                    isLoading: false,
                    isErrored: true
                }));
            } else {

                if(true) {
                    const user = {
                        team:'whoog'
                    };

                    setInLocalStorage('user', user);

                    history.push({
                        pathname: '/main'
                    });
                } else {
                    setLoginState(prevState => ({
                        ...prevState,
                        feedback:'Failure && Try again ?',
                        isLoading: false,
                        isErrored: true
                    }));
                }
            }
        }, 3000);
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
            <form onSubmit={handleSubmit}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image="/static/images/Agile_2.jpg"
                        title="Agile"
                    />
                    <CardContent>
                        { loginState.isLoading && <LinearIndeterminate  /> }
                        <Logo color="primary"
                              shouldBeCentered
                              shouldBeLargeFont
                              showDescriptionText
                        />

                        <TextField
                            value={loginState.email}
                            onChange={updateField}
                            error={loginState.isSubmitted && loginState.email === ""}
                            required
                            id="email"
                            label="Email"
                            className={classes.textField}
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
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                    </CardContent>
                    <CardActions className={classes.actions}>

                        <Fab
                            variant="extended"
                            size="medium"
                            color="secondary"
                            aria-label="add"
                            className={classes.fabButton}
                            onClick={handleSubmit}
                        >
                            <div className={classes.buttonIcon}>
                                {(loginState.isLoading)
                                    ? <CircularProgress size={25} />
                                    : (loginState.isErrored)
                                        ? <ErrorIcon className={classes.extendedIcon} />
                                        : <PlayCircleFilledIcon className={classes.extendedIcon} />
                                }
                            </div>
                            <div className={classes.buttonText}>
                                <Typography>{loginState.feedback}</Typography>
                            </div>
                        </Fab>
                    </CardActions>
                </Card>
            </form>
        </Grid>
    );
};

export default Login;