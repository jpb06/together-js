import {makeStyles, Typography} from "@material-ui/core";
import React from "react";
import GroupIcon from '@material-ui/icons/Group';
import ForwardIcon from '@material-ui/icons/Forward';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import RowingIcon from '@material-ui/icons/Rowing';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles(theme => ({
    middleVerticalAlign: {
        verticalAlign: 'middle'
    },
    text: {
        paddingLeft: '10px'
    },
}));

const SubjectType = ({type, label}) => {
    const classes = useStyles();

    return (
        <span>
            {type === 'team'
                ? <GroupIcon className={classes.middleVerticalAlign}/>
                : type === 'drive'
                    ? <ForwardIcon className={classes.middleVerticalAlign}/>
                    : type === 'goal'
                        ? <DoneOutlineIcon className={classes.middleVerticalAlign}/>
                        : type === 'restraint'
                            ? <RowingIcon className={classes.middleVerticalAlign}/>
                            : type === 'risk'
                                ? <ErrorIcon className={classes.middleVerticalAlign}/>
                                : undefined
            }
            <Typography variant={'caption'} className={classes.text}>
                {label}
            </Typography>
        </span>
    );
};

export default SubjectType;