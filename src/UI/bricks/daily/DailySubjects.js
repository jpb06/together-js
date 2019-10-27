import React, {useCallback, useEffect} from "react";
import NewSubject from "./Subjects/NewSubject";
import SubjectsList from "./Subjects/SubjectsList";
import ForumIcon from '@material-ui/icons/Forum';
import {addSubject, removeSubject} from "../../../logic/api/daily.api";
import Grid from "@material-ui/core/Grid";
import {getFromLocalStorage} from "../../../logic/local.store";

const DailySubjects = ({sendToParent, data, showSnackbar, currentTeam}) => {
    const [subjects, setSubjects] = React.useState(data);
    // Used to manage the state related with the action of adding a subject
    const [addActionFeedback, setAddActionFeedback] = React.useState({isPending: false, isErrored: false, text: 'Add'});
    // Used to manage the state related with the action of removing a subject
    const [removeActionFeedback, setRemoveActionFeedback] = React.useState({isPending: false, id: ''});

    // keep function reference for useEffect (otherwise the function reference would change with each render...)
    const isFilled = useCallback(() => subjects.length > 0, [subjects]);

    // This will trigger everytime a subject is added or removed
    useEffect(() => {
        sendToParent({isValidated: isFilled(), isPending: false});
    }, [isFilled, subjects, sendToParent]);

    const reportSubmit = async (subject) => {
        const hasData = isFilled();

        // Only one subject creation action at a time
        if (!addActionFeedback.isPending) {
            sendToParent({isValidated: false, isPending: true});
            setAddActionFeedback({isPending: true, isErrored: false, text: 'Adding subject...'});
            const result = await addSubject(currentTeam._id, new Date().toUTCString(), subject);

            if (result.status === 201) {
                const user = getFromLocalStorage('user');
                setSubjects(state => state.concat({
                    id: result.message,
                    type: subject.type,
                    description: subject.description,
                    creator: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatarName: user.avatarName
                    }
                }));
                setAddActionFeedback({isPending: false, isErrored: false, text: 'Add'});
                // no need to call actionFeedback because it will be handled by useEffect
            } else if (result.status !== 401) {
                showSnackbar('error', 'Unable to save subject');
                setAddActionFeedback({isPending: false, isErrored: true, text: 'Add'});
                sendToParent({isValidated: hasData, isPending: false});
            }
        }
    };

    // Removing a subject from the list
    const reportSubjectRemoval = async (id) => {
        // Only one subject deletion action at a time
        if (!removeActionFeedback.isPending) {
            sendToParent({isValidated: false, isPending: true});
            setRemoveActionFeedback({isPending: true, id: id});
            const result = await removeSubject(currentTeam._id, new Date().toUTCString(), id);

            if (result.status === 200) {
                setSubjects(state => state.filter(el => el.id !== id));
                setRemoveActionFeedback({isPending: false, id: ''});
                // no need to call actionFeedback because it will be handled by useEffect
            } else if (result.status !== 401) {
                showSnackbar('error', `Unable to remove the subject ${id}`);
                sendToParent({isValidated: true, isPending: false});
                setRemoveActionFeedback({isPending: false, id: ''});
            }
        }
    };

    return (
        <div>
            <Grid container justify="center">
                <SubjectsList
                    subjects={subjects}
                    actionFeedback={removeActionFeedback}
                    NoDataIconComponent={ForumIcon}
                    reportSubjectRemoval={reportSubjectRemoval}
                />
            </Grid>

            <NewSubject
                actionFeedback={addActionFeedback}
                reportSubmit={reportSubmit}
            />
        </div>
    );
};

export default DailySubjects;