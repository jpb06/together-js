import React from "react";
import Slide from "@material-ui/core/Slide";

const DownTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default DownTransition;