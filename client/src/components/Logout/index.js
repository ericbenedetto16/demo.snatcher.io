import React from 'react';
import { Redirect } from 'react-router-dom';
import { deleteToken } from '../../utils';

export const Logout = () => {
    deleteToken();
    return <Redirect to='/login' />;
};
