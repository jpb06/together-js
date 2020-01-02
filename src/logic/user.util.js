import {LocalStorageKeys, setInLocalStorage} from "./local.store";

const getInitials = (string) => {
    const initials = string.replace(/[^a-zA-Z- 0-9]/g, "").match(/\b\w/g);
    return initials.join('').toUpperCase();
};

const initializeLoggedUserContext = (authResult) => {
    const fullName = `${authResult.user.firstName} ${authResult.user.lastName}`;
    const initials = getInitials(fullName);

    const user = {
        ...authResult.user,
        fullName,
        initials
    };

    setInLocalStorage(LocalStorageKeys.token, authResult.token);
    setInLocalStorage(LocalStorageKeys.expiration, authResult.expirationDate);
    setInLocalStorage(LocalStorageKeys.user, user);

    return user;
};

export {
    getInitials,
    initializeLoggedUserContext
};