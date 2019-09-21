import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import {makeStyles} from "@material-ui/core";
import BuildIcon from '@material-ui/icons/Build';

const useStyles = makeStyles(theme => ({
    spacing: {
        marginRight: '4px',
        marginBottom: '4px'
    },
}));

const TicketChip = ({reportTicketRemoval, ticketName, user}) => {
    const classes = useStyles();

    const getKey = () => user ? `${user.id}${ticketName}` : ticketName;
    const handleRemoval = () => reportTicketRemoval(getKey());

    return (
        <Chip
            key={getKey()}
            className={classes.spacing}
            avatar={
                user
                    ? <Avatar alt={user.firstName} src={user.avatarPath}/>
                    : <Avatar><BuildIcon/></Avatar>
            }
            label={ticketName}
            onDelete={handleRemoval}
            color="primary"
        />
    );
};

export default TicketChip;