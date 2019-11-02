import {makeStyles, Typography} from "@material-ui/core";
import React from "react";
import {staticSubjectTypes, SubjectTypeIcon} from "../../../../logic/static/static.subject.types";

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

    const IconComponent = SubjectTypeIcon(typeId);

    return (
        <span>
            <IconComponent className={classes.middleVerticalAlign}/>
            <Typography variant={'caption'} className={classes.text}>
                {label ?
                    label :
                    staticSubjectTypes.filter(el => el.value === typeId)[0].label}
            </Typography>
        </span>
    );
};

export default SubjectType;