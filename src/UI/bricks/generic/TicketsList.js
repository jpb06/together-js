import React from "react";
import {makeStyles} from "@material-ui/core";
import List from "@material-ui/core/List";
import Ticket from "./Ticket";

const useStyles = makeStyles(theme => ({
    noDataIcon: {
        fontSize: '50px'
    },
    fullWidth: {
        width: '100%'
    }
}));

const TicketList = ({ticketsList, reportTicketRemoval, actionFeedback, NoDataIconComponent, avatarAsAssignee, ...rest}) => {
    const classes = useStyles();

    return (
        (ticketsList.length === 0)
            ? <NoDataIconComponent
                fontSize="large"
                color="primary"
                className={classes.noDataIcon}
            />
            : <List dense={true} className={classes.fullWidth}>
                {ticketsList.map((ticket, index) => (
                    <Ticket key={ticket.name}
                            reportTicketRemoval={reportTicketRemoval}
                            ticketName={ticket.name}
                            user={avatarAsAssignee ? ticket.assignee : ticket.creator}
                            actionFeedback={actionFeedback}
                            showDivider={index !== ticketsList.length - 1}
                            {...rest}
                    />
                ))}
            </List>
    );
};

export default TicketList;