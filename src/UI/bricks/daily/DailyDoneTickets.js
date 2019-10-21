import React, {useCallback, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import NewTicket from "../generic/NewTicket";
import {addDoneTicket, removeDoneTicket} from "../../../logic/api/daily.api";
import TicketList from "../generic/TicketsList";

const DailyDoneTickets = ({sendToParent, data, showSnackbar, currentTeam}) => {

    const [doneTickets, setDoneTickets] = React.useState(data.doneTickets);
    const teamMembers = React.useState(data.teamMembers)[0];
    // Used to manage the state related with the action of adding a ticket
    const [addActionFeedback, setAddActionFeedback] = React.useState({isPending: false, isErrored: false, text: 'Add'});
    // Used to manage the state related with the action of removing a ticket
    const [removeActionFeedback, setRemoveActionFeedback] = React.useState({isPending: false, key: ''});

    // keep function reference for useEffect (otherwise the function reference would change with each render...)
    const isFilled = useCallback(() => doneTickets.length > 0, [doneTickets]);

    // This will trigger everytime a ticket is added or removed
    useEffect(() => {
        sendToParent({isValidated: isFilled(), isPending: false});
    }, [isFilled, doneTickets, sendToParent]);

    // Adding a ticket
    const reportSubmit = async (ticket) => {
        const hasData = isFilled();
        const name = `${ticket.key}-${ticket.number}`;

        const assignee = teamMembers.filter(u => u._id === ticket.userId);
        if (assignee.length !== 1) {
            showSnackbar('error', `Unable to find ticket ${name}'s assignee`);
            return;
        }

        // Only one ticket creation action at a time
        if (!addActionFeedback.isPending) {
            sendToParent({isValidated: false, isPending: true});
            // Can't add twice the same ticket
            if (!doneTickets.find(el => el.name === name)) {
                setAddActionFeedback({isPending: true, isErrored: false, text: 'Adding ticket...'});
                const result = await addDoneTicket(currentTeam._id, assignee[0]._id, new Date().toUTCString(), name);

                if (result.status === 201) {
                    setDoneTickets(state => state.concat({
                        name: name,
                        assignee: assignee[0]
                    }));
                    setAddActionFeedback({isPending: false, isErrored: false, text: 'Add'});
                    // no need to call actionFeedback because it will be handled by useEffect
                } else if (result.status !== 401) {
                    showSnackbar('error', `Unable to save the ticket ${name}`);
                    setAddActionFeedback({isPending: false, isErrored: true, text: 'Add'});
                    sendToParent({isValidated: hasData, isPending: false});
                }
            } else {
                sendToParent({isValidated: hasData, isPending: false});
                showSnackbar('info', `The ticket ${name} has already been added`);
            }
        }

    };

    // Removing a ticket from the list
    const reportTicketRemoval = async (key) => {
        // Only one ticket deletion action at a time
        if (!removeActionFeedback.isPending) {
            sendToParent({isValidated: false, isPending: true});
            setRemoveActionFeedback({isPending: true, key: key});
            const result = await removeDoneTicket(currentTeam._id, new Date().toUTCString(), key);

            if (result.status === 200) {
                setDoneTickets(state => state.filter(el => el.name !== key));
                setRemoveActionFeedback({isPending: false, key: ''});
                // no need to call actionFeedback because it will be handled by useEffect
            } else if (result.status !== 401) {
                showSnackbar('error', `Unable to remove the ticket ${key}`);
                sendToParent({isValidated: true, isPending: false});
                setRemoveActionFeedback({isPending: false, key: ''});
            }
        }
    };

    return (
        <div>
            <Grid container justify="center">
                <TicketList
                    ticketsList={doneTickets}
                    avatarAsAssignee={true}
                    reportTicketRemoval={reportTicketRemoval}
                    actionFeedback={removeActionFeedback}
                    NoDataIconComponent={AssignmentTurnedInIcon}
                />
            </Grid>

            <NewTicket
                reportSubmit={reportSubmit}
                actionFeedback={addActionFeedback}
                users={teamMembers}
            />
        </div>
    );
};

export default DailyDoneTickets;