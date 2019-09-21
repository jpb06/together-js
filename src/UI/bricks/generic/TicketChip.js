import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    spacing: {
        marginRight: '4px',
        marginBottom: '4px'
    },
}));

const TicketChip = ({reportTicketRemoval, ticketName, user}) => {
    const classes = useStyles();

    const handleRemoval = () => reportTicketRemoval(`${user.id}${ticketName}`);

    return (
        <Chip
            key={`${user.id}${ticketName}`}
            className={classes.spacing}
            avatar={<Avatar alt={user.firstName} src={user.avatarPath}/>}
            label={ticketName}
            onDelete={handleRemoval}
            color="primary"
        />
    );
};

export default TicketChip;