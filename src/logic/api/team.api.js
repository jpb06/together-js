import TogetherApi, {ensureStatus} from './setup/together.api';

const getTeamMembers = async (teamId) =>
    ensureStatus(await TogetherApi.Instance.post('team/members', {
        teamId: teamId
    }));

const createTeam = async (teamName) =>
    ensureStatus(await TogetherApi.Instance.post('team/create', {
        teamName: teamName
    }));

export {
    createTeam,
    getTeamMembers
};