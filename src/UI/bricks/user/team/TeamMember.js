import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {stringToColor} from "../../../../logic/colors.util";
import {useTheme} from "@material-ui/core";
import {getInitials} from "../../../../logic/user.util";
import {amber} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    padding: {
        padding: '10px',
        textAlign: 'center'
    },
    centered: {
        alignSelf: 'center'
    },
    userName: {
        color: amber[500],
        marginTop: theme.spacing(1)
    }
}));

const TeamMember = ({user}) => {
    const classes = useStyles();
    const theme = useTheme();

    const fullName = user.fullName ? user.fullName : `${user.firstName} ${user.lastName}`;
    const initials = user.initials ? user.initials : getInitials(fullName);

    const [avatarColor] = useState(stringToColor(fullName));
    const [avatarTextColor] = useState(theme.palette.getContrastText(stringToColor(fullName)));

    return (
        <Grid
            item
            md={3}
            xs={6}
            className={classes.padding}
        >
            <Grid
                container
                justify="center"
            >
                {user.avatarName.length === 0 &&
                <Avatar style={{backgroundColor: avatarColor, color: avatarTextColor}}>{initials}</Avatar>}
                {user.avatarName.length > 0 && <Avatar src={`/static/images/avatars/${user.avatarName}`}/>}
            </Grid>
            <div className={classes.userName}>
                {`${user.firstName} ${user.lastName}`}
            </div>
            {user.status && <div>{user.status}</div>}
        </Grid>
    );
};

export default TeamMember;