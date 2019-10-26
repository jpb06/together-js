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

const UserAvatar = ({data, isBigAvatar}) => {
    const classes = useStyles();

    return (
        <Avatar
            alt={`${data.firstName} ${data.lastName}`}
            src={`/static/images/avatars/${data.avatar}`}
            className={clsx(classes.avatar, {
                [classes.big]: isBigAvatar,
            })}
        />
    );
};

export default UserAvatar;