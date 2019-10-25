import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core";
import staticDurations from "../../../logic/static/static.durations";
import {reportDuration} from "../../../logic/api/daily.api";

const useStyles = makeStyles(theme => ({
    textField: {
        flexBasis: 200,
    },
}));

const DailyDuration = ({sendToParent, data, showSnackbar, currentTeam}) => {
    const classes = useStyles();

    const [duration, setDuration] = React.useState(data);

    // This will trigger at component first render (once)
    useEffect(() => {
        if (data === '') {
            setDuration(staticDurations[0].value);
        } else {
            sendToParent({isValidated: true, isPending: false});
        }
    }, [sendToParent, data, setDuration]);

    // Changing duration
    const handleChange = () => async (event) => {
        sendToParent({isValidated: false, isPending: true});
        setDuration(event.target.value);

        const result = await reportDuration(currentTeam._id, new Date().toUTCString(), event.target.value);
        if (result.status === 200) {
            sendToParent({isValidated: true, isPending: false});
        } else if (result.status !== 401) {
            sendToParent({isValidated: false, isPending: false});
            showSnackbar('error', 'Unable to save the daily duration');
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
                {staticDurations.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};

export default DailyDuration;