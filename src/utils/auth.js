const TOKEN_KEY = 'token';

export const hasToken = function() {
    return getToken() !== 'null';
};

export const getToken = function() {
    return localStorage.getItem(TOKEN_KEY);
};

export const setToken = function(token) {
    return localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = function() {
    return localStorage.removeItem(TOKEN_KEY);
};
