import jwt from 'jsonwebtoken';

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const getName = (token) => {
    const header = jwt.decode(token);
    if (header.sub) {
        console.log(`Signed in as ${header.sub}.`);
    }
};

export const deleteToken = () => localStorage.removeItem('token');

// export const isTokenExpired = (token) => {
//     try {
//         const decoded = jwt.decode(token);
//         if (decoded.exp < Date.now() / 1000) {
//             // Checking if token is expired.
//             return true;
//         }
//         return false;
//     } catch (err) {
//         return false;
//     }
// };

// export const isLoggedIn = () => {

// };
