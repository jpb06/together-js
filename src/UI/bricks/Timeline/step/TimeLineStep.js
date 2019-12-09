import React from "react";
import TimelineStepContent from "./TimelineStepContent";
import TimelineStepTitle from "./TimelineStepTitle";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const TimeLineStep = ({type, title, data}) => {

    const getTypeIcon = () => {
        switch (type) {
            case 1: // daily
                return DirectionsRunIcon;
            case 2: // team invite
            case 4: // current user invite
                return GroupAddIcon;
            case 3: // team join request
            case 5: // current user join request
                return CallMergeIcon;
            default:
                return undefined;
        }
    };

    return (
        <div>
            <TimelineStepTitle
                IconComponent={getTypeIcon(type)}
                text={title}
            />
            <TimelineStepContent
                type={type}
                data={data}
            />
        </div>);
};

export default TimeLineStep;