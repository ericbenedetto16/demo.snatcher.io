import jwt from 'jsonwebtoken';

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    if (localStorage.getItem('token') !== null) {
        return `Bearer ${localStorage.getItem('token')}`;
    }

    return false;
};

export const getName = (token) => {
    const header = jwt.decode(token);
    if (header.sub) {
        console.log(`Signed in as ${header.sub}.`);
    }
};

export const deleteToken = () => localStorage.removeItem('token');
