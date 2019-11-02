import React from "react";
import TimelineStepContent from "./TimelineStepContent";
import TimelineStepTitle from "./TimelineStepTitle";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

const TimeLineStep = ({type, title, data}) => {

    const getTypeIcon = () => {
        switch (type) {
            case 1:
                return DirectionsRunIcon;
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