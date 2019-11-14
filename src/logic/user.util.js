const getInitials = (string) => {
    const initials = string.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
    return initials.join('').toUpperCase();
};

export {getInitials};