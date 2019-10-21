const durationRanges = [
    {
        value: '0-15',
        label: 'Less than 15 minutes',
    },
    {
        value: '15-20',
        label: 'Just a bit more than 15 minutes',
    },
    {
        value: '20-30',
        label: 'Less than 30 minutes I swear !',
    },
    {
        value: '20+',
        label: 'Absolute anarchy',
    },
];

const subjectTypes = [
    {
        value: 'drive',
        label: 'Drive',
        showDivider: false
    },
    {
        value: 'restraint',
        label: 'Restraint',
        showDivider: false
    },
    {
        value: 'risk',
        label: 'Risk',
        showDivider: true
    },
    {
        value: 'team',
        label: 'Team',
        showDivider: false
    },
    {
        value: 'goal',
        label: 'Goal',
        showDivider: false
    },
];

const ticketKeys = [
    {
        value: 'WEB',
        label: 'WEB',
    },
    {
        value: 'WHOOG',
        label: 'WHOOG',
    },
    {
        value: 'WRS',
        label: 'WRS',
    },
    {
        value: 'APP',
        label: 'APP',
    },
];

export {
    durationRanges,
    subjectTypes,
    ticketKeys
};