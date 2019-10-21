import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FeedbackButton from "./FeedbackButton";
import MenuItem from "@material-ui/core/MenuItem";
import {subjectTypes} from "./../../../logic/static.data";
import GroupIcon from '@material-ui/icons/Group';
import ForwardIcon from '@material-ui/icons/Forward';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import RowingIcon from '@material-ui/icons/Rowing';
import ErrorIcon from '@material-ui/icons/Error';
import {Typography} from "@material-ui/core";

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

    // submitting a new ticket
    const handleSubmit = () => {
        if (subject.description !== '') {
            reportSubmit(subject);
            setSubject(state => ({
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
                        {subjectTypes.map(type => (
                            <MenuItem key={type.value} divider={type.showDivider} value={type.value}>
                                {type.value === 'team'
                                    ? <GroupIcon style={{verticalAlign: 'middle'}}/>
                                    : type.value === 'drive'
                                        ? <ForwardIcon style={{verticalAlign: 'middle'}}/>
                                        : type.value === 'goal'
                                            ? <DoneOutlineIcon style={{verticalAlign: 'middle'}}/>
                                            : type.value === 'restraint'
                                                ? <RowingIcon style={{verticalAlign: 'middle'}}/>
                                                : type.value === 'risk'
                                                    ? <ErrorIcon style={{verticalAlign: 'middle'}}/>
                                                    : undefined
                                }
                                <Typography variant={'span'} style={{paddingLeft: '10px'}}>{type.label}</Typography>
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