import React from "react";
import {makeStyles} from "@material-ui/core";
import ContentBox from "../bricks/ContentBox";

const useStyles = makeStyles(theme => ({}));

const Daily = () => {
    const classes = useStyles();

    return (
        <div>
            <h1>Daily</h1>
            <ContentBox content={<p>Daily</p>}/>
        </div>
    );
};

export default Daily;