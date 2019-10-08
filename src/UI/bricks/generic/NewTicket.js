import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FeedbackButton from "./FeedbackButton";

const keys = [
    {
        value: 'WEB',
        label: 'WEB',
    },
    {
        value: 'WHOOG',
        label: 'WHOOG',
    },
    {
        value: 'WRS',
        label: 'WRS',
    },
    {
        value: 'APP',
        label: 'APP',
    },
];

const useStyles = makeStyles(theme => ({}));

const NewTicket = ({reportSubmit, actionFeedback, users}) => {
    const classes = useStyles();

    const [ticket, setTicket] = React.useState({
        key: 'WEB',
        number: '',
        userId: ''
    });

    const handleChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.name === 'number' ? e.target.value.replace(/\D/, '') : e.target.value
        });
    };

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
                        className={classes.textField}
                        variant="outlined"
                        label="Key"
                        name="key"
                        margin="dense"
                        value={ticket.key}
                        onChange={handleChange}
                    >
                        {keys.map(option => (
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