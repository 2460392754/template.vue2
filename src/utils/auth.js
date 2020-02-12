/** token 键名 */
const TOKEN_KEY = 'TOKEN';

/** localStorage是否有token */
export const hasToken = function() {
    return getToken() !== 'null';
};

/** 获取 token */
export const getToken = function() {
    return localStorage.getItem(TOKEN_KEY);
};

/** 设置 token */
export const setToken = function(value) {
    return localStorage.setItem(TOKEN_KEY, value);
};

/** 删除 token */
export const removeToken = function() {
    return localStorage.removeItem(TOKEN_KEY);
};
