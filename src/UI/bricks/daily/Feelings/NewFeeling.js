import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {staticFeelingTypes} from "../../../../logic/static/static.feelings.types";
import MenuItem from "@material-ui/core/MenuItem";
import FeedbackButton from "../../generic/buttons/FeedbackButton";
import FeelingType from "./FeelingType";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const NewFeeling = ({reportSubmit, actionFeedback}) => {
    const [feeling, setFeeling] = React.useState({
        type: '',
        comment: '',
    });

    // Changing input...
    const handleChange = (e) => {
        setFeeling({
            ...feeling,
            [e.target.name]: e.target.value
        });
    };

    // submitting a new subject
    const handleSubmit = () => {
        if (feeling.comment !== '') {
            reportSubmit(feeling);
            setFeeling({
                type: '',
                comment: ''
            });
        }
    };

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        fullWidth
                        select
                        variant="outlined"
                        label="Type"
                        name="type"
                        margin="dense"
                        value={feeling.type}
                        onChange={handleChange}
                    >
                        {staticFeelingTypes.map(type => (
                            <MenuItem key={type.value} divider={type.showDivider} value={type.value}>
                                <FeelingType typeId={type.value} label={type.label}/>
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        fullWidth
                        multiline
                        rowsMax="4"
                        variant="outlined"
                        label="Comment"
                        name="comment"
                        margin="dense"
                        value={feeling.comment}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FeedbackButton
                        IconComponent={AddCircleIcon}
                        handleSubmit={handleSubmit}
                        actionFeedback={actionFeedback}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default NewFeeling;