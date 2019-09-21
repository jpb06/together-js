import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    avatar: {
        margin: 10,
    }
});

const ImageAvatar = () => {
    const classes = useStyles();

    return (
        <Avatar alt="Remy Sharp" src="/static/images/avatars/image.jpg" className={classes.avatar}/>
    );
};

export default ImageAvatar;