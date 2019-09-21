import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

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
const users = [
    {
        value: '1',
        label: 'Sarah Tedjani',
    },
    {
        value: '2',
        label: 'Jean-Philippe Bois',
    },
];

const useStyles = makeStyles(theme => ({
    fabButton: {
        minWidth: '100% !important',
        justifyContent: 'left',
        textTransform: 'none',
        marginTop: theme.spacing(1),
        height: '30px !important'
    },
    buttonIcon: {
        justifyContent: 'left',
        paddingTop: '3px',
        marginLeft: '-13px'
    },
    buttonText: {
        justifyContent: 'center',
        width: '100%'
    }
}));

const NewTicket = ({reportSubmit, hasUsers}) => {
    const classes = useStyles();

    const [ticket, setTicket] = React.useState({
        key: 'WEB',
        number: '',
        user: ''
    });

    const handleChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (ticket.number !== ''
            && ((hasUsers && ticket.user !== '') || !hasUsers)) {
            reportSubmit(ticket);
            setTicket(state => ({
                key: 'WEB',
                number: '',
                user: ''
            }));
        }
    };

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={5} sm={(hasUsers) ? 4 : 5}>
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
                <Grid item xs={7} sm={(hasUsers) ? 3 : 7}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Number"
                        name="number"
                        margin="dense"
                        value={ticket.number}
                        onChange={handleChange}
                    />
                </Grid>
                {
                    hasUsers && (<Grid item xs={12} sm={5}>
                        <TextField
                            fullWidth
                            select
                            variant="outlined"
                            label="User"
                            name="user"
                            margin="dense"
                            value={ticket.user}
                            onChange={handleChange}
                        >
                            {users.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>)
                }
                <Grid item xs={12} sm={12}>
                    <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add"
                        className={classes.fabButton}
                        onClick={handleSubmit}
                    >
                        <div className={classes.buttonIcon}>
                            <AddCircleIcon className={classes.extendedIcon}/>
                        </div>
                        <div className={classes.buttonText}>
                            <Typography>Add</Typography>
                        </div>
                    </Fab>
                </Grid>
            </Grid>

        </div>
    );
};

export default NewTicket;