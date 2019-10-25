import React from "react";
import {makeStyles} from "@material-ui/core";
import List from "@material-ui/core/List";
import Feeling from "./Feeling";


const useStyles = makeStyles(theme => ({
    noDataIcon: {
        fontSize: '50px'
    },
    fullWidth: {
        width: '100%'
    },
}));

const FeelingsList = ({feelings, reportFeelingRemoval, actionFeedback, NoDataIconComponent, ...rest}) => {
    const classes = useStyles();

    return (
        (feelings.length === 0)
            ? <NoDataIconComponent
                fontSize="large"
                color="primary"
                className={classes.noDataIcon}
            />
            : <List dense={true} className={classes.fullWidth}>
                {feelings.map((feeling, index) => (
                    <Feeling
                        key={feeling.id}
                        feeling={feeling}
                        reportFeelingRemoval={reportFeelingRemoval}
                        actionFeedback={actionFeedback}
                        showDivider={index !== feelings.length - 1}
                        {...rest}
                    />
                ))}
            </List>
    );
};

export default FeelingsList;