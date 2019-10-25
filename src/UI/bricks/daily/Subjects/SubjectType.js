import {makeStyles, Typography} from "@material-ui/core";
import React from "react";
import GroupIcon from '@material-ui/icons/Group';
import ForwardIcon from '@material-ui/icons/Forward';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import RowingIcon from '@material-ui/icons/Rowing';
import ErrorIcon from '@material-ui/icons/Error';
import staticSubjectTypes from "../../../../logic/static/static.subject.types";

const useStyles = makeStyles(theme => ({
    middleVerticalAlign: {
        verticalAlign: 'middle'
    },
    text: {
        paddingLeft: '10px'
    },
}));

const SubjectType = ({typeId, label}) => {
    const classes = useStyles();

    return (
        <span>
            {typeId === 1
                ? <ForwardIcon className={classes.middleVerticalAlign}/>
                : typeId === 2
                    ? <RowingIcon className={classes.middleVerticalAlign}/>
                    : typeId === 3
                        ? <ErrorIcon className={classes.middleVerticalAlign}/>
                        : typeId === 4
                            ? <GroupIcon className={classes.middleVerticalAlign}/>
                            : typeId === 5
                                ? <DoneOutlineIcon className={classes.middleVerticalAlign}/>
                                : undefined
            }
            <Typography variant={'caption'} className={classes.text}>
                {label ?
                    label :
                    staticSubjectTypes.filter(el => el.value === typeId)[0].label}
            </Typography>
        </span>
    );
};

export default SubjectType;