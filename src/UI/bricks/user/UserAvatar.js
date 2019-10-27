import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import clsx from "clsx";

const useStyles = makeStyles({
    avatar: {
        margin: 10,
    },
    big: {
        width: 130,
        height: 130,
    }
});

const UserAvatar = ({user, isBigAvatar}) => {
    const classes = useStyles();

    return (
        <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            src={`/static/images/avatars/${user.avatarName}`}
            className={clsx(classes.avatar, {
                [classes.big]: isBigAvatar,
            })}
        />
    );
};

export default UserAvatar;