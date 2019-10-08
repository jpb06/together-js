import React, {useEffect} from "react";
import NewTicket from "../generic/NewTicket";
import Grid from "@material-ui/core/Grid";
import AssignmentLateRoundedIcon from '@material-ui/icons/AssignmentLateRounded';
import TicketChipsList from "../generic/TicketChipsList";
import {addUnforeseenTicket, removeUnforeseenTicket} from "../../../logic/api/daily.api";

const DailyUnforeseenTickets = ({reportValidation, data, sendFeedback, currentTeam}) => {

    const [unforeseenTickets, setUnforeseenTickets] = React.useState(data);
    const [addActionFeedback, setAddActionFeedback] = React.useState({isPending: false, isErrored: false, text: 'Add'});
    const [removeActionFeedback, setRemoveActionFeedback] = React.useState({isPending: false, key: ''});

    const reportSubmit = async (ticket) => {
        if (!addActionFeedback.isPending) {
            const name = `${ticket.key}-${ticket.number}`;

            if (!unforeseenTickets.find(el => el.name === name)) {
                setAddActionFeedback({isPending: true, isErrored: false, text: 'Adding ticket...'});
                const result = await addUnforeseenTicket(currentTeam._id, new Date().toUTCString(), name);

                if (result.status === 201) {
                    setUnforeseenTickets(state => state.concat({
                        name: name
                    }));
                    reportValidation(true);
                    setAddActionFeedback({isPending: false, isErrored: false, text: 'Add'});
                } else {
                    console.log(result);
                    sendFeedback('error', `Unable to save the ticket ${name}`);
                    if (result.status !== 401) {
                        setAddActionFeedback({isPending: false, isErrored: true, text: 'Add'});
                    }
                }
            }
        }
    };

    const reportTicketRemoval = async (key) => {
        if (!removeActionFeedback.isPending) {
            setRemoveActionFeedback({isPending: true, key: key});
            const result = await removeUnforeseenTicket(currentTeam._id, new Date().toUTCString(), key);

            if (result.status === 200) {
                setUnforeseenTickets(state => state.filter(el => `${el.name}` !== key));
                setRemoveActionFeedback({isPending: false, key: ''});
            } else {
                console.log(result);
                sendFeedback('error', `Unable to remove the ticket ${key}`);
                if (result.status !== 401) {
                    setRemoveActionFeedback({isPending: false, key: ''});
                }
            }
        }
    };

    useEffect(() => {
        if (unforeseenTickets.length === 0) {
            reportValidation(false);
        } else {
            reportValidation(true);
        }
    });

    return (
        <div>
            <Grid container justify="center">
                <TicketChipsList
                    ticketsList={unforeseenTickets}
                    reportTicketRemoval={reportTicketRemoval}
                    actionFeedback={removeActionFeedback}
                    NoDataIconComponent={AssignmentLateRoundedIcon}
                />
            </Grid>

            <NewTicket
                reportSubmit={reportSubmit}
                actionFeedback={addActionFeedback}
                hasUsers={false}
            />
        </div>
    );
};

export default DailyUnforeseenTickets;