import GroupIcon from '@material-ui/icons/Group';
import ForwardIcon from '@material-ui/icons/Forward';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import RowingIcon from '@material-ui/icons/Rowing';
import ErrorIcon from '@material-ui/icons/Error';

const staticSubjectTypes = [
    {
        value: 1,
        label: 'Drive',
        showDivider: false
    },
    {
        value: 2,
        label: 'Restraint',
        showDivider: false
    },
    {
        value: 3,
        label: 'Risk',
        showDivider: true
    },
    {
        value: 4,
        label: 'Team',
        showDivider: false
    },
    {
        value: 5,
        label: 'Goal',
        showDivider: false
    },
];

const SubjectTypeIcon = (typeId) => {
    switch (typeId) {
        case 1:
            return ForwardIcon;
        case 2:
            return RowingIcon;
        case 3:
            return ErrorIcon;
        case 4:
            return GroupIcon;
        case 5:
            return DoneOutlineIcon;
        default:
            return undefined;
    }
};

export {
    SubjectTypeIcon,
    staticSubjectTypes
};