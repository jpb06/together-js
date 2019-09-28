const setInLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
const existsInLocalStorage = (key) => localStorage.getItem(key) !== null;
const clearLocalStorage = () => localStorage.clear();

export {setInLocalStorage, getFromLocalStorage, existsInLocalStorage, clearLocalStorage};