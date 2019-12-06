import React, {useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import clsx from "clsx";
import {stringToColor} from "../../../logic/colors.util";
import {getInitials} from "../../../logic/user.util";

const useStyles = makeStyles({
    small: {
        width: 35,
        height: 35,
    },
    big: {
        width: 130,
        height: 130,
    },
    smallFont: {
        fontSize: '15px'
    }
});

const UserAvatar = ({user, isBigAvatar}) => {
    const classes = useStyles();
    const theme = useTheme();

    const fullName = user.fullName ? user.fullName : `${user.firstName} ${user.lastName}`;
    const initials = user.initials ? user.initials : getInitials(fullName);

    const [avatarColor] = useState(stringToColor(fullName));
    const [avatarTextColor] = useState(theme.palette.getContrastText(stringToColor(fullName)));

    if (user.avatarName && user.avatarName.length !== 0) {
        return (
            <Avatar
                alt={`${user.firstName} ${user.lastName}`}
                src={`/static/images/avatars/${user.avatarName}`}
                className={clsx({
                    [classes.big]: isBigAvatar,
                    [classes.small]: !isBigAvatar,
                })}
            />);
    } else {
        return (
            <Avatar
                style={{backgroundColor: avatarColor, color: avatarTextColor}}
                className={clsx(classes.smallFont, {
                    [classes.big]: isBigAvatar,
                    [classes.small]: !isBigAvatar,
                })}
            >
                {initials}
            </Avatar>);
    }
};

export default UserAvatar;