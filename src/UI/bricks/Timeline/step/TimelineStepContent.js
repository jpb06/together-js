import React from "react";
import TimeLineStepDivider from "./TimeLineStepDivider";
import {makeStyles} from "@material-ui/core";
import TimelineDaily from "./daily/TimelineDaily";
import TimelineTeamJoinRequest from "./joinrequest/TimelineTeamJoinRequest";
import TimeLineUserInvite from "./teaminvite/TimeLineUserInvite";
import TimeLineTeamInvite from "./teaminvite/TimeLineTeamInvite";
import TimeLineUserJoinRequest from "./joinrequest/TimeLineUserJoinRequest";
import TimeLineTeamMemberJoinNotice from "./joinnotices/TimeLineTeamMemberJoinNotice";

const useStyles = makeStyles({
    content: {
        marginTop: '8px',
        borderLeft: '1px solid #757575',
        marginLeft: '12px',
    },
});

const TimelineStepContent = ({type, data, showSnackbar, reloadTimeline}) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.content}>
                {{
                    1: <TimelineDaily daily={data}/>,
                    2: <TimeLineTeamInvite {...data} />, // = invites sent to current user
                    3: <TimelineTeamJoinRequest {...data} />, // = join requests made by current user
                    4: <TimeLineUserInvite showSnackbar={showSnackbar} reloadTimeline={reloadTimeline} {...data} />, // = invites sent by team members
                    5: <TimeLineUserJoinRequest {...data} />, // = join requests made to a team
                    6: <TimeLineTeamMemberJoinNotice {...data} /> // = team members join notices
                }[type]}
            </div>
            <TimeLineStepDivider/>
        </div>
    );
};

export default TimelineStepContent;