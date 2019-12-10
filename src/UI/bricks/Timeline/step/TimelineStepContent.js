import React from "react";
import TimeLineStepDivider from "./TimeLineStepDivider";
import {makeStyles} from "@material-ui/core";
import TimelineDaily from "./daily/TimelineDaily";
import TimelineTeamJoinRequest from "./joinrequest/TimelineTeamJoinRequest";
import TimeLineTeamInvite from "./teaminvite/TimeLineTeamInvite";

const useStyles = makeStyles(theme => ({
    content: {
        marginTop: '8px',
        borderLeft: '1px solid #757575',
        marginLeft: '12px',
    },
}));

const TimelineStepContent = ({type, data}) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.content}>
                {{
                    1: <TimelineDaily daily={data}/>,
                    2: <TimeLineTeamInvite {...data} />,
                    3: <TimelineTeamJoinRequest {...data} />,
                    4: <TimeLineTeamInvite {...data} />,
                    5: <TimelineTeamJoinRequest {...data} />
                }[type]}
            </div>
            <TimeLineStepDivider/>
        </div>
    );
};

export default TimelineStepContent;