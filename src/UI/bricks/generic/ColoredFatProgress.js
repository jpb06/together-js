import {withStyles} from "@material-ui/core";
import {lighten} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

// High order component
const ColoredFatProgress = (color) => () => withStyles({
    root: {
        height: 10,
        backgroundColor: lighten(color, 0.7),
    },
    bar: {
        backgroundColor: color
    },
})(LinearProgress);

export default ColoredFatProgress;