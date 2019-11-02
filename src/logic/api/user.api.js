import TogetherApi, {ensureStatus} from "./setup/together.api";

const getUserTeams = async (userId) =>
    ensureStatus(await TogetherApi.Instance.post('user/teams', {
        userId: userId
    }));

const getTimeline = async (userId) =>
    ensureStatus(await TogetherApi.Instance.post('user/timeline', {
        userId: userId
    }));

export {
    getUserTeams,
    getTimeline
};