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

const addDoneTicket = async (teamId, assigneeId, date, ticket) =>
    ensureStatus(await TogetherApi.Instance.post('daily/done/add', {
        teamId: teamId,
        date: date,
        ticket: ticket,
        assigneeId: assigneeId
    }));

const removeDoneTicket = async (teamId, date, ticket) =>
    ensureStatus(await TogetherApi.Instance.post('daily/done/remove', {
        teamId: teamId,
        date: date,
        ticket: ticket
    }));

const addSubject = async (teamId, date, subject) =>
    ensureStatus(await TogetherApi.Instance.post('daily/subjects/add', {
        teamId: teamId,
        date: date,
        type: subject.type,
        description: subject.description
    }));

const removeSubject = async (teamId, date, id) =>
    ensureStatus(await TogetherApi.Instance.post('daily/subjects/remove', {
        teamId: teamId,
        date: date,
        subjectId: id
    }));

export {
    getDaily,
    reportDuration,
    addUnforeseenTicket, removeUnforeseenTicket,
    addDoneTicket, removeDoneTicket,
    addSubject, removeSubject
};