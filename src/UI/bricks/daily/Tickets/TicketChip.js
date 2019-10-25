import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import {makeStyles} from "@material-ui/core";
import BuildIcon from '@material-ui/icons/Build';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from "@material-ui/core/CircularProgress";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(theme => ({
    spacing: {
        marginRight: '4px',
        marginBottom: '4px'
    },
    chipUserAvatar: {
        width: '47px',
        height: '47px',
        marginLeft: '0px'
    },
    chipIcon: {
        width: '32px',
        height: '32px',
        marginLeft: '0px'
    }
}));

const TicketChip = ({reportTicketRemoval, actionFeedback, ticketName, assignee}) => {
    const classes = useStyles();
    const getKey = () => ticketName;
    const handleRemoval = () => reportTicketRemoval(getKey());

    return (
        <Chip
            key={getKey()}
            className={classes.spacing}
            avatar={
                assignee
                    ? <Avatar
                        className={classes.chipUserAvatar}
                        alt={`${assignee.firstName} ${assignee.lastName}`}
                        src={`/static/images/avatars/${assignee.avatarName}`}
                    />
                    :
                    <Avatar className={classes.chipIcon}><BuildIcon/></Avatar>
            }
            label={ticketName}
            deleteIcon={actionFeedback.isPending && actionFeedback.key === ticketName
                ? <CircularProgress color="secondary" size={25}/>
                : actionFeedback.isPending && actionFeedback.key !== ticketName
                    ? <FiberManualRecordIcon/>
                    : <CancelIcon/>}
            onDelete={handleRemoval}
            color="primary"
        />
    );
};

export default TicketChip;