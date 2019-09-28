import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import {makeStyles} from "@material-ui/core";

const ranges = [
    {
        value: '0-15',
        label: 'Less than 15 minutes',
    },
    {
        value: '15-20',
        label: 'Just a bit more than 15 minutes',
    },
    {
        value: '20-30',
        label: 'Less than 30 minutes I swear !',
    },
    {
        value: '20+',
        label: 'Absolute anarchy',
    },
];
const useStyles = makeStyles(theme => ({
    root: {},
    textField: {
        flexBasis: 200,
    },
}));

const DailyDuration = ({reportValidation}) => {
    const classes = useStyles();

    const [duration, setDuration] = React.useState('');

    const handleChange = () => event => {
        setDuration(event.target.value);
        reportValidation(true);
    };

    return (
        <div>
            <TextField
                select
                className={classes.textField}
                variant="outlined"
                label="How long did it last ?"
                value={duration}
                onChange={handleChange()}
                fullWidth
            >
                {ranges.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};

export default DailyDuration;