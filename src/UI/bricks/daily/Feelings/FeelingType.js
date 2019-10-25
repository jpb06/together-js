import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {makeStyles, Typography} from "@material-ui/core";
import staticFeelingTypes from "../../../../logic/static/static.feelings.types";
import React from "react";

const useStyles = makeStyles(theme => ({
    middleVerticalAlign: {
        verticalAlign: 'middle'
    },
    text: {
        paddingLeft: '10px'
    },
}));

const FeelingType = ({typeId, label}) => {
    const classes = useStyles();

    return (
        <span>
            {typeId === 1
                ? <ThumbUpIcon className={classes.middleVerticalAlign}/>
                : typeId === 2
                    ? <ThumbDownIcon className={classes.middleVerticalAlign}/>
                    : typeId === 3
                        ? <SentimentSatisfiedIcon className={classes.middleVerticalAlign}/>
                        : typeId === 4
                            ? <SentimentVeryDissatisfiedOutlinedIcon className={classes.middleVerticalAlign}/>
                            : null
            }
            <Typography variant={'caption'} className={classes.text}>
                {label
                    ? label
                    : staticFeelingTypes.filter(el => el.value === typeId)[0].label}
            </Typography>
        </span>
    );
};

export default FeelingType;