import TogetherApi, {ensureStatus} from "./setup/together.api";

const getUserTeams = async (userId, fetchLastActivity) =>
    ensureStatus(await TogetherApi.Instance.post('user/teams', {
        userId: userId,
        fetchLastActivity: fetchLastActivity
    }));

const getTimeline = async (teamId) =>
    ensureStatus(await TogetherApi.Instance.post('user/timeline', {
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

const acceptTeamInvite = async (inviteId) =>
    ensureStatus(await TogetherApi.Instance.post('user/acceptTeamInvite', {
        inviteId: inviteId
    }));

const declineTeamInvite = async (inviteId) =>
    ensureStatus(await TogetherApi.Instance.post('user/declineTeamInvite', {
        inviteId: inviteId
    }));

export {
    getUserTeams,
    getTimeline,
    inviteUser,
    requestToJoinTeam,
    acceptTeamInvite,
    declineTeamInvite
};