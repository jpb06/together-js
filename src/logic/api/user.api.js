import TogetherApi, {ensureStatus} from "./setup/together.api";

const getUserTeams = async (userId) =>
    ensureStatus(await TogetherApi.Instance.post('user/teams', {
        userId: userId
    }));

const getTimeline = async (userId) =>
    ensureStatus(await TogetherApi.Instance.post('user/timeline', {
        userId: userId
    }));

const inviteUser = async (teamId, email) =>
    ensureStatus(await TogetherApi.Instance.post('user/inviteUser', {
        teamId: teamId,
        userEmail: email
    }));

const requestMembership = async (teamName) =>
    ensureStatus(await TogetherApi.Instance.post('user/requestMembership', {
        teamName: teamName
    }));

export {
    getUserTeams,
    getTimeline,
    inviteUser,
    requestMembership
};