import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import SimpleButton from "../buttons/SimpleButton";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import {amber} from "@material-ui/core/colors";
import {makeStyles} from "@material-ui/core";
import Waiting from "../Waiting";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DownTransition from "../transitions/DownTransition";

const useStyles = makeStyles({
    title: {
        color: amber[300]
    }
});

const BasicChoiceModal = ({state, closeAction, confirmAction}) => {
    const classes = useStyles();

    const handleClose = () => closeAction();
    const handleConfirm = () => confirmAction();

    return (
        <Dialog
            open={state.isOpened}
            TransitionComponent={DownTransition}
            transitionDuration={500}
            maxWidth={'xs'}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
                {state.title}
            </DialogTitle>
            <DialogContent>
                {state.isLoading &&
                <Waiting
                    style={{marginBottom: 30}}
                    addTopPadding={false}
                    IconComponent={AddCircleOutlineIcon}
                    color="white"
                    text={'Please hold while our hamsters handle the request in our secret basement'}
                />
                }
                {!state.isLoading &&
                <DialogContentText id="alert-dialog-slide-description">
                    {state.questionText}
                </DialogContentText>
                }
            </DialogContent>
            {!state.isLoading &&
            <DialogActions>
                <SimpleButton text={state.yesAnswerText} onClick={handleConfirm}/>
                <SimpleButton text={state.noAnswerText} onClick={handleClose}/>
            </DialogActions>
            }
        </Dialog>
    );
};

export default BasicChoiceModal;