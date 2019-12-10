import TogetherApi, {ensureStatus} from "./setup/together.api";

const getUserTeams = async (userId) =>
    ensureStatus(await TogetherApi.Instance.post('user/teams', {
        userId: userId
    }));

const getTimeline = async (userId, teamId) =>
    ensureStatus(await TogetherApi.Instance.post('user/timeline', {
        userId: userId,
        teamId: teamId
    }));

const inviteUser = async (teamId, email) =>
    ensureStatus(await TogetherApi.Instance.post('user/inviteUser', {
        teamId: teamId,
        userEmail: email
    }));

const requestToJoinTeam = async (teamName) =>
    ensureStatus(await TogetherApi.Instance.post('user/requestToJoinTeam', {
        teamName: teamName
    }));

export {
    getUserTeams,
    getTimeline,
    inviteUser,
    requestToJoinTeam
};