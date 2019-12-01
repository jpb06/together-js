import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import React from "react";
import {makeStyles} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: grey[900]
    }
}));

const BlackCard = React.forwardRef((props, ref) => {
    const classes = useStyles();

    return (
        <Card ref={ref} className={classes.root}>
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    );
});

export default BlackCard;