import TogetherApi from './setup/together.api';

const addUnforeseenTicket = async (teamId, date, ticket) =>
    await TogetherApi.Instance.post('daily/unforeseen/add', {
        teamId: teamId,
        date: date,
        ticket: ticket
    });

const removeUnforeseenTicket = async (teamId, date, ticket) =>
    await TogetherApi.Instance.post('daily/unforeseen/remove', {
        teamId: teamId,
        date: date,
        ticket: ticket
    });

const getDaily = async (teamId, date) =>
    await TogetherApi.Instance.post('daily', {
        teamId: teamId,
        date: date
    });

export {addUnforeseenTicket, removeUnforeseenTicket, getDaily};