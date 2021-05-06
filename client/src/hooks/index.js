import { useState, useEffect } from 'react';
import { getToken } from '../utils';

export const useAuthentication = () => {
    const [auth, setAuth] = useState(null);
    useEffect(() => {
        let cancelled = false;
        const f = () => {
            const d = getToken();
            if (!cancelled) setAuth(d);
        };
        f();
        // eslint-disable-next-line no-return-assign
        return () => (cancelled = true);
    });
    return auth;
};
