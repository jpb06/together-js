import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import TicketChipsList from "../generic/TicketChipsList";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import NewTicket from "../generic/NewTicket";


const DailyDoneTickets = ({reportValidation}) => {
    const [doneTickets, setDoneTickets] = React.useState([]);

    const reportSubmit = (ticket) => {
        const name = `${ticket.key}-${ticket.number}`;

        if (!doneTickets.find(el => el.name === name)) {

            setDoneTickets(state => state.concat({
                name: name,
                user: {
                    id: state.length,
                    firstName: 'Sarah',
                    avatarPath: '/static/images/avatars/6SLWt.gif'
                }
            }));
            reportValidation(true);
        }
    };
    const reportTicketRemoval = (key) => {
        setDoneTickets(state => state.filter(el => `${el.user.id}${el.name}` !== key));
    };

    useEffect(() => {
        if (doneTickets.length === 0) {
            reportValidation(false);
        }
    });

    return (
        <div>
            <Grid container justify="center">
                <TicketChipsList
                    ticketsList={doneTickets}
                    reportTicketRemoval={reportTicketRemoval}
                    NoDataIconComponent={AssignmentTurnedInIcon}
                />
            </Grid>

            <NewTicket
                reportSubmit={reportSubmit}
                hasUsers={true}
            />
        </div>
    );
};

export default DailyDoneTickets;