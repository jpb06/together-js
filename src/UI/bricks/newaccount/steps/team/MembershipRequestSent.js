import React from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";
import TelegramIcon from '@material-ui/icons/Telegram';
import {amber} from "@material-ui/core/colors";
import SimpleButton from "../../../generic/buttons/SimpleButton";
import {useHistory} from "react-router";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
    root: {
        height: '290px'
    },
    container: {
        textAlign: 'center',
        color: amber[500]
    },
    icon: {
        height: '70px',
        width: '70px'
    }
}));

const MembershipRequestSent = ({teamName}) => {
    const classes = useStyles();
    const history = useHistory();

    const goToTimeline = () => {
        history.push({
            pathname: '/main'
        });
    };

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <Slide direction="up" timeout={700} in mountOnEnter unmountOnExit>
                <div className={classes.container}>
                    <TelegramIcon className={classes.icon}/>
                    <br/>
                    {`Your request to join ${teamName} has been sent`}
                    <br/>
                    <SimpleButton
                        fullWidth={false}
                        hasTopMargin={true}
                        text={
                            <div>
                                Great!
                                <br/>
                                Now bring me to my timeline already!
                            </div>
                        }
                        onClick={goToTimeline}
                    />
                </div>
            </Slide>
        </Grid>
    );
};

export default MembershipRequestSent;