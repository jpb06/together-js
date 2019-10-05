import TogetherApi, {ensureStatus} from './setup/together.api';

const getDaily = async (teamId, date) =>
    ensureStatus(await TogetherApi.Instance.post('daily', {
        teamId: teamId,
        date: date
    }));

const reportDuration = async (teamId, date, durationIndicator) =>
    ensureStatus(await TogetherApi.Instance.post('daily/setDuration', {
        teamId: teamId,
        date: date,
        durationIndicator: durationIndicator
    }));

const addUnforeseenTicket = async (teamId, date, ticket) =>
    ensureStatus(await TogetherApi.Instance.post('daily/unforeseen/add', {
        teamId: teamId,
        date: date,
        ticket: ticket
    }));

const removeUnforeseenTicket = async (teamId, date, ticket) =>
    ensureStatus(await TogetherApi.Instance.post('daily/unforeseen/remove', {
        teamId: teamId,
        date: date,
        ticket: ticket
    }));

export {
    getDaily,
    reportDuration,
    addUnforeseenTicket,
    removeUnforeseenTicket
};