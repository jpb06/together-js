import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import {makeStyles} from "@material-ui/core";
import {durationRanges} from './../../../logic/static.data';
import {reportDuration} from "../../../logic/api/daily.api";
import {getFromLocalStorage} from "../../../logic/local.store";

const useStyles = makeStyles(theme => ({
    textField: {
        flexBasis: 200,
    },
}));

const DailyDuration = ({reportValidation, data, reportError}) => {
    const classes = useStyles();

    if (data === '') {
        data = durationRanges[0].value;
    } else {
        reportValidation(true);
    }

    const [duration, setDuration] = React.useState(data);

    const handleChange = () => async (event) => {
        setDuration(event.target.value);

        const user = getFromLocalStorage('user');
        const result = await reportDuration(user.teams[0]._id, new Date().toUTCString(), event.target.value);
        if (result.status === 200) {
            reportValidation(true);
        } else {
            console.log(result);
            reportError('error', 'Unable to save the daily duration');
        }
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
                {durationRanges.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};

export default DailyDuration;