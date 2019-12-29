import HighlightedText from "../../../generic/HighlightedText";
import React from "react";
import {Typography} from "@material-ui/core";

const JoinQuestion = ({teamName}) => {
    return (
        <Typography color="textSecondary">
            You are about to join team <HighlightedText text={teamName}/>.<br/>Are you sure, like really sure?
        </Typography>
    );
};

export default JoinQuestion;