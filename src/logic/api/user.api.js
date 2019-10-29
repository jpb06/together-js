import TogetherApi, {ensureStatus} from "./setup/together.api";

const getUserTeams = async (userId) =>
    ensureStatus(await TogetherApi.Instance.post('user/teams', {
        userId: userId
    }));

export {
    getUserTeams
};