import {Enum} from 'enumify';

class LocalStorageKeys extends Enum {
}

LocalStorageKeys.initEnum(['currentTeam', 'expiration', 'token', 'user']);

const setInLocalStorage = (key, value) => localStorage.setItem(key.name, JSON.stringify(value));
const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key.name));
const existsInLocalStorage = (key) => localStorage.getItem(key.name) !== null;
const clearLocalStorage = () => localStorage.clear();

export {
    LocalStorageKeys,

    setInLocalStorage,
    getFromLocalStorage,
    existsInLocalStorage,
    clearLocalStorage
};