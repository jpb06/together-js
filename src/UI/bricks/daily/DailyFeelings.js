import React, {useCallback, useEffect} from "react";
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import Grid from "@material-ui/core/Grid";
import FeelingsList from "./Feelings/FeelingsList";
import NewFeeling from "./Feelings/NewFeeling";
import {addFeeling, removeFeeling} from "../../../logic/api/daily.api";
import {getFromLocalStorage, LocalStorageKeys} from "../../../logic/local.store";

const DailyFeelings = ({sendToParent, data, showSnackbar, currentTeam}) => {

    const [feelings, setFeelings] = React.useState(data);
    // Used to manage the state related with the action of adding a feeling
    const [addActionFeedback, setAddActionFeedback] = React.useState({isPending: false, isErrored: false, text: 'Add'});
    // Used to manage the state related with the action of removing a feeling
    const [removeActionFeedback, setRemoveActionFeedback] = React.useState({isPending: false, id: ''});

    // keep function reference for useEffect (otherwise the function reference would change with each render...)
    const isFilled = useCallback(() => feelings.length > 0, [feelings]);

    // This will trigger everytime a feeling is added or removed
    useEffect(() => {
        sendToParent({isValidated: isFilled(), isPending: false});
    }, [isFilled, feelings, sendToParent]);

    const reportSubmit = async (feeling) => {
        const hasData = isFilled();

        // Only one feeling creation action at a time
        if (!addActionFeedback.isPending) {
            sendToParent({isValidated: false, isPending: true});
            setAddActionFeedback({isPending: true, isErrored: false, text: 'Adding feeling...'});
            const result = await addFeeling(currentTeam._id, new Date().toUTCString(), feeling);

            if (result.status === 201) {
                const user = getFromLocalStorage(LocalStorageKeys.user);
                setFeelings(state => state.concat({
                    id: result.message,
                    type: feeling.type,
                    comment: feeling.comment,
                    creator: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatarName: user.avatarName
                    }
                }));
                setAddActionFeedback({isPending: false, isErrored: false, text: 'Add'});
                // no need to call actionFeedback because it will be handled by useEffect
            } else if (result.status !== 401) {
                showSnackbar('error', 'Unable to save feeling');
                setAddActionFeedback({isPending: false, isErrored: true, text: 'Add'});
                sendToParent({isValidated: hasData, isPending: false});
            }
        }
    };

    // Removing a feeling from the list
    const reportFeelingRemoval = async (id) => {
        // Only one feeling deletion action at a time
        if (!removeActionFeedback.isPending) {
            sendToParent({isValidated: false, isPending: true});
            setRemoveActionFeedback({isPending: true, id: id});
            const result = await removeFeeling(currentTeam._id, new Date().toUTCString(), id);

            if (result.status === 200) {
                setFeelings(state => state.filter(el => el.id !== id));
                setRemoveActionFeedback({isPending: false, id: ''});
                // no need to call actionFeedback because it will be handled by useEffect
            } else if (result.status !== 401) {
                showSnackbar('error', `Unable to remove the feeling ${id}`);
                sendToParent({isValidated: true, isPending: false});
                setRemoveActionFeedback({isPending: false, id: ''});
            }
        }
    };

    return (
        <div>
            <Grid container justify="center">
                <FeelingsList
                    feelings={feelings}
                    actionFeedback={removeActionFeedback}
                    NoDataIconComponent={EmojiEmotionsOutlinedIcon}
                    reportFeelingRemoval={reportFeelingRemoval}
                />
            </Grid>

            <NewFeeling
                actionFeedback={addActionFeedback}
                reportSubmit={reportSubmit}
            />
        </div>
    );
};

export default DailyFeelings;