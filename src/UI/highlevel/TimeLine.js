import React from "react";
//import {makeStyles} from "@material-ui/core";
import ContentBox from "../bricks/generic/containers/ContentBox";

//const useStyles = makeStyles(theme => ({}));

const TimeLine = (props) => {
    //const classes = useStyles();

    return (
        <div>
            <h1>Timeline</h1>
            <ContentBox content={<p>Timeline</p>}/>
        </div>
    );
};

export default TimeLine;