import {makeStyles, Typography} from "@material-ui/core";
import {FeelingTypeIcon, staticFeelingTypes} from "../../../../logic/static/static.feelings.types";
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

    const IconComponent = FeelingTypeIcon(typeId);

    return (
        <span>
            <IconComponent className={classes.middleVerticalAlign}/>
            <Typography variant={'caption'} className={classes.text}>
                {label
                    ? label
                    : staticFeelingTypes.filter(el => el.value === typeId)[0].label}
            </Typography>
        </span>
    );
};

export default FeelingType;