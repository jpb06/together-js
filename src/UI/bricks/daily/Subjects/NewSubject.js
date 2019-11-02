import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FeedbackButton from "../../generic/buttons/FeedbackButton";
import MenuItem from "@material-ui/core/MenuItem";
import {staticSubjectTypes} from "../../../../logic/static/static.subject.types";
import SubjectType from "./SubjectType";

const NewSubject = ({reportSubmit, actionFeedback}) => {

    const [subject, setSubject] = React.useState({
        type: '',
        description: '',
    });

    // Changing input...
    const handleChange = (e) => {
        setSubject({
            ...subject,
            [e.target.name]: e.target.value
        });
    };

    // submitting a new subject
    const handleSubmit = () => {
        if (subject.description !== '') {
            reportSubmit(subject);
            setSubject(state => ({
                type: '',
                description: ''
            }));
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
                        value={subject.type}
                        onChange={handleChange}
                    >
                        {staticSubjectTypes.map(type => (
                            <MenuItem key={type.value} divider={type.showDivider} value={type.value}>
                                <SubjectType typeId={type.value} label={type.label}/>
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
                        label="Description"
                        name="description"
                        margin="dense"
                        value={subject.description}
                        onChange={handleChange}
                    />
                </Grid>
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

export default NewSubject;