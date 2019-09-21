import React from "react";
import Grid from "@material-ui/core/Grid";
import TicketChip from "./TicketChip";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    noDataIcon: {
        fontSize: '50px'
    }
}));

const TicketChipsList = ({ticketsList, reportTicketRemoval, NoDataIconComponent}) => {
    const classes = useStyles();

    return (
        (ticketsList.length === 0)
            ? <NoDataIconComponent
                fontSize="large"
                color="primary"
                className={classes.noDataIcon}
            />
            : ticketsList.map((ticket, index) => (
                <Grid item key={index}>
                    <TicketChip
                        reportTicketRemoval={reportTicketRemoval}
                        ticketName={ticket.name}
                        user={ticket.user}
                    />
                </Grid>
            ))
    );
};

export default TicketChipsList;