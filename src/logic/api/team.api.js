import TogetherApi, {ensureStatus} from './setup/together.api';

const getTeamMembers = async (teamId) =>
    ensureStatus(await TogetherApi.Instance.post('team/members', {
        teamId: teamId
    }));

export {getTeamMembers};