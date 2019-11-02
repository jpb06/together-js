import React, {useCallback, useEffect} from "react";
import NewTicket from "./Tickets/NewTicket";
import Grid from "@material-ui/core/Grid";
import AssignmentLateRoundedIcon from '@material-ui/icons/AssignmentLateRounded';
import {addUnforeseenTicket, removeUnforeseenTicket} from "../../../logic/api/daily.api";
import TicketList from "./Tickets/TicketsList";
import {getFromLocalStorage, LocalStorageKeys} from "../../../logic/local.store";

const DailyUnforeseenTickets = ({sendToParent, data, showSnackbar, currentTeam}) => {

    const [unforeseenTickets, setUnforeseenTickets] = React.useState(data);
    // Used to manage the state related with the action of adding a ticket
    const [addActionFeedback, setAddActionFeedback] = React.useState({isPending: false, isErrored: false, text: 'Add'});
    // Used to manage the state related with the action of removing a ticket
    const [removeActionFeedback, setRemoveActionFeedback] = React.useState({isPending: false, key: ''});

    // keep function reference for useEffect (otherwise the function reference would change with each render...)
    const isFilled = useCallback(() => unforeseenTickets.length > 0, [unforeseenTickets]);

    // This will trigger everytime a ticket is added or removed
    useEffect(() => {
        sendToParent({isValidated: isFilled(), isPending: false});
    }, [isFilled, unforeseenTickets, sendToParent]);

    // Adding a ticket
    const reportSubmit = async (ticket) => {
        const hasData = isFilled();
        const name = `${ticket.key}-${ticket.number}`;

        // Only one ticket creation action at a time
        if (!addActionFeedback.isPending) {
            sendToParent({isValidated: false, isPending: true});
            // Can't add twice the same ticket
            if (!unforeseenTickets.find(el => el.name === name)) {
                setAddActionFeedback({isPending: true, isErrored: false, text: 'Adding ticket...'});
                const result = await addUnforeseenTicket(currentTeam._id, new Date().toUTCString(), name);

                if (result.status === 201) {
                    const user = getFromLocalStorage(LocalStorageKeys.user);
                    setUnforeseenTickets(state => state.concat({
                        name: name,
                        creator: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            avatarName: user.avatarName
                        }
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
            const result = await removeUnforeseenTicket(currentTeam._id, new Date().toUTCString(), key);

            if (result.status === 200) {
                setUnforeseenTickets(state => state.filter(el => `${el.name}` !== key));
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
                    ticketsList={unforeseenTickets}
                    avatarAsAssignee={false}
                    reportTicketRemoval={reportTicketRemoval}
                    actionFeedback={{...removeActionFeedback}}
                    NoDataIconComponent={AssignmentLateRoundedIcon}
                />
            </Grid>

            <NewTicket
                reportSubmit={reportSubmit}
                actionFeedback={{...addActionFeedback}}
                hasUsers={false}
            />
        </div>
    );
};

export default DailyUnforeseenTickets;