import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FeedbackButton from "./FeedbackButton";
import {ticketKeys} from './../../../logic/static.data';

const NewTicket = ({reportSubmit, actionFeedback, users}) => {
    const [ticket, setTicket] = React.useState({
        key: 'WEB',
        number: '',
        userId: ''
    });

    // Changing input...
    const handleChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.name === 'number' ? e.target.value.replace(/\D/, '') : e.target.value
        });
    };

    // submitting a new ticket
    const handleSubmit = () => {
        if (ticket.number !== ''
            && ((users && ticket.userId !== '') || !users)) {
            reportSubmit(ticket);
            setTicket(state => ({
                key: 'WEB',
                number: '',
                userId: ''
            }));
        }
    };

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={5} sm={(!users) ? 5 : 4}>
                    <TextField
                        fullWidth
                        select
                        variant="outlined"
                        label="Key"
                        name="key"
                        margin="dense"
                        value={ticket.key}
                        onChange={handleChange}
                    >
                        {ticketKeys.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={7} sm={(!users) ? 7 : 3}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Number"
                        name="number"
                        margin="dense"
                        // type="number"
                        pattern="[0-9]*" data-numeric-input
                        value={ticket.number}
                        onChange={handleChange}
                    />
                </Grid>
                {
                    users && (<Grid item xs={12} sm={5}>
                        <TextField
                            fullWidth
                            select
                            variant="outlined"
                            label="User"
                            name="userId"
                            margin="dense"
                            value={ticket.userId}
                            onChange={handleChange}
                        >
                            {users.map(user => (
                                <MenuItem key={user._id} value={user._id}>
                                    {`${user.firstName} ${user.lastName}`}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>)
                }
                <Grid item xs={12} sm={12}>
                    <FeedbackButton
                        handleSubmit={handleSubmit}
                        actionFeedback={actionFeedback}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default NewTicket;