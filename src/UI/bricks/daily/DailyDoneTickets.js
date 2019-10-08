import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import TicketChipsList from "../generic/TicketChipsList";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import NewTicket from "../generic/NewTicket";
import {addDoneTicket, removeDoneTicket} from "../../../logic/api/daily.api";


const DailyDoneTickets = ({reportValidation, data, sendFeedback, currentTeam}) => {
    const [doneTickets, setDoneTickets] = React.useState(data.doneTickets);
    const [actionFeedback, setActionFeedback] = React.useState({isPending: false, isErrored: false});
    const teamMembers = React.useState(data.teamMembers)[0];

    const reportSubmit = async (ticket) => {
        const name = `${ticket.key}-${ticket.number}`;

        if (!doneTickets.find(el => el.name === name)) {
            setActionFeedback({isPending: true, isErrored: false});
            const assignee = teamMembers.filter(u => u._id === ticket.userId);
            if (assignee.length > 0) {

                const result = await addDoneTicket(currentTeam._id, assignee[0]._id, new Date().toUTCString(), name);

                if (result.status === 201) {
                    setDoneTickets(state => state.concat({
                        name: name,
                        assignee: assignee[0]
                    }));
                    setActionFeedback({isPending: false, isErrored: false});
                    reportValidation(true);
                } else {
                    console.log(result);
                    sendFeedback('error', `Unable to save the ticket ${name}`);
                    if (result.status !== 401) {
                        setActionFeedback({isPending: false, isErrored: true});
                    }
                }
            }
        }
    };
    const reportTicketRemoval = async (key) => {
        setActionFeedback({isPending: true, isErrored: false});
        const result = await removeDoneTicket(currentTeam._id, new Date().toUTCString(), key);

        if (result.status === 200) {
            setDoneTickets(state => state.filter(el => el.name !== key));
            setActionFeedback({isPending: false, isErrored: false});
        } else {
            console.log(result);
            sendFeedback('error', `Unable to remove the ticket ${key}`);
            if (result.status !== 401) {
                setActionFeedback({isPending: false, isErrored: true});
            }
        }
    };

    useEffect(() => {
        if (doneTickets.length === 0) {
            reportValidation(false);
        } else {
            reportValidation(true);
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
                actionFeedback={actionFeedback}
                users={teamMembers}
            />
        </div>
    );
};

export default DailyDoneTickets;