import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import React, {useState} from "react";
import {stringToColor} from "../../../logic/colors.util";
import {makeStyles, useTheme} from "@material-ui/core";
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

const TeamAvatar = ({team, isBigAvatar}) => {
    const classes = useStyles();
    const theme = useTheme();

    const [avatarColor] = useState(stringToColor(team.name));
    const [avatarTextColor] = useState(theme.palette.getContrastText(stringToColor(team.name)));

    return (
        <Avatar
            style={{backgroundColor: avatarColor, color: avatarTextColor}}
            className={clsx(classes.smallFont, {
                [classes.big]: isBigAvatar,
                [classes.small]: !isBigAvatar,
            })}
        >
            {getInitials(team.name)}
        </Avatar>
    );
};

export default TeamAvatar;