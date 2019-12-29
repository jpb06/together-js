import HighlightedText from "../../../generic/HighlightedText";
import React from "react";

const DeclineQuestion = ({teamName}) => {
    return (
        <span>
            You are about to decline the invite to join team <HighlightedText text={teamName}/>.<br/>Do you really want to?
        </span>
    );
};

export default DeclineQuestion;