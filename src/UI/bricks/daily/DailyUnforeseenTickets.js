import React, {useEffect} from "react";
import NewTicket from "../generic/NewTicket";
import Grid from "@material-ui/core/Grid";
import AssignmentLateRoundedIcon from '@material-ui/icons/AssignmentLateRounded';
import TicketChipsList from "../generic/TicketChipsList";

const DailyUnforeseenTickets = ({reportValidation}) => {

    const [unforeseenTickets, setUnforeseenTickets] = React.useState([]);

    const reportSubmit = (ticket) => {
        setUnforeseenTickets(state => state.concat({
            name: `${ticket.key}-${ticket.number}`,
            user: {
                id: state.length,
                firstName: 'Sarah',
                avatarPath: '/static/images/avatars/6SLWt.gif'
            }
        }));
        reportValidation(true);
    };
    const reportTicketRemoval = (key) => {
        setUnforeseenTickets(state => state.filter(el => `${el.user.id}${el.name}` !== key));
    };

    useEffect(() => {
        if (unforeseenTickets.length === 0) {
            reportValidation(false);
        }
    });

    return (
        <div>
            <Grid container justify="center">
                <TicketChipsList
                    ticketsList={unforeseenTickets}
                    reportTicketRemoval={reportTicketRemoval}
                    NoDataIconComponent={AssignmentLateRoundedIcon}
                />
            </Grid>

            <NewTicket
                reportSubmit={reportSubmit}
                hasUsers={false}
            />
        </div>
    );
};

export default DailyUnforeseenTickets;