import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const staticFeelingTypes = [
    {
        value: 1,
        label: 'Thumbs up',
        showDivider: false
    },
    {
        value: 2,
        label: 'Thumb down',
        showDivider: true
    },
    {
        value: 3,
        label: 'Satisfaction',
        showDivider: false
    },
    {
        value: 4,
        label: 'Dying inside',
        showDivider: false
    },
];

const FeelingTypeIcon = (typeId) => {
    switch (typeId) {
        case 1:
            return ThumbUpIcon;
        case 2:
            return ThumbDownIcon;
        case 3:
            return SentimentSatisfiedIcon;
        case 4:
            return SentimentVeryDissatisfiedOutlinedIcon;
        default:
            return undefined;
    }
};

export {
    staticFeelingTypes,
    FeelingTypeIcon
};