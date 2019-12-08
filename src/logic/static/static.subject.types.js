import GroupIcon from '@material-ui/icons/Group';
import ForwardIcon from '@material-ui/icons/Forward';
import CheckIcon from '@material-ui/icons/Check';
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
            return CheckIcon;
        default:
            return undefined;
    }
};

const getSubjectTypeDescription = (value) => {
    const matches = staticSubjectTypes.filter(el => el.value === value);
    if (matches.length === 1) {
        return matches[0].label;
    } else {
        return '';
    }
};

export {
    SubjectTypeIcon,
    staticSubjectTypes,
    getSubjectTypeDescription
};