import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles, useTheme} from "@material-ui/core";
import {deepOrange} from "@material-ui/core/colors";
import FeedbackButton from "../../generic/buttons/FeedbackButton";
import {stringToColor} from "./../../../../logic/colors.util";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import Typography from "@material-ui/core/Typography";
import StepTitle from "../StepTitle";

const useStyles = makeStyles(theme => ({
    centered: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
    },
    avatar: {
        width: '100px',
        height: '100px',
        backgroundColor: deepOrange[500],
        color: 'white',
        marginTop: '25px'
    },
    fullName: {
        marginBottom: '25px'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const NewAccountMyAvatar = ({fullName, initials, reportStepComplete}) => {
    const classes = useStyles();
    const theme = useTheme();

    const [formData] = useState({
        isPending: false,
        isErrored: false,
        isSubmitted: false,
        text: 'My teams',
        avatarName: ''
    });

    const [avatarColor] = useState(stringToColor(fullName));
    const [avatarTextColor] = useState(theme.palette.getContrastText(stringToColor(fullName)));

    const handleSubmit = () => reportStepComplete();

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
        >
            <StepTitle title="Avatar selection"/>
            <Grid item xs={12} sm={12} className={classes.centered}>
                <Typography color="primary">
                    We have generated a default avatar for you<br/>You will soon be able to customize it or use a
                    picture instead!
                </Typography>
            </Grid>
            {/*
            <Grid item xs={12} sm={12} className={classes.centered}>
                <Fab variant="extended" size="medium" color="primary" aria-label="add">
                    <CloudUploadIcon className={classes.extendedIcon} />
                    Upload a picture
                </Fab>
            </Grid>
            */}
            <Grid item xs={12} sm={12} className={classes.centered}>
                <Avatar
                    className={classes.avatar}
                    style={{backgroundColor: avatarColor, color: avatarTextColor}}
                >
                    {initials}
                </Avatar>

            </Grid>
            <Grid item xs={12} sm={12} className={classes.centered}>
                <Typography className={classes.fullName}>
                    {fullName}
                </Typography>
            </Grid>
            <FeedbackButton
                IconComponent={GroupWorkIcon}
                actionFeedback={formData}
                handleSubmit={handleSubmit}
            />
        </Grid>
    );
};

export default NewAccountMyAvatar;