import React, {useEffect} from "react";
import NewTicket from "../generic/NewTicket";
import Grid from "@material-ui/core/Grid";
import AssignmentLateRoundedIcon from '@material-ui/icons/AssignmentLateRounded';
import TicketChipsList from "../generic/TicketChipsList";
import {addUnforeseenTicket, removeUnforeseenTicket} from "../../../logic/api/daily.api";
import {getFromLocalStorage} from "../../../logic/local.store";

const DailyUnforeseenTickets = ({reportValidation, data}) => {

    const [unforeseenTickets, setUnforeseenTickets] = React.useState(data);

    const reportSubmit = async (ticket) => {
        const name = `${ticket.key}-${ticket.number}`;

        if (!unforeseenTickets.find(el => el.name === name)) {
            const user = getFromLocalStorage('user');
            const result = await addUnforeseenTicket(user.teams[0]._id, new Date().toUTCString(), name);

            if (result.status === 201) {
                setUnforeseenTickets(state => state.concat({
                    name: name
                }));
                reportValidation(true);
            } else {
                console.log(result);
            }
        }
    };

    const reportTicketRemoval = async (key) => {
        const user = getFromLocalStorage('user');
        const result = await removeUnforeseenTicket(user.teams[0]._id, new Date().toUTCString(), key);

        if (result.status === 200) {
            setUnforeseenTickets(state => state.filter(el => `${el.name}` !== key));
        } else {
            console.log(result);
        }
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