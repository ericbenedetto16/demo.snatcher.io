import { useState, useEffect } from 'react';
import { userAuthenticated } from '../api/auth';

export const useAuthentication = () => {
    const [auth, setAuth] = useState(null);
    useEffect(() => {
        let cancelled = false;
        const f = async () => {
            const d = await userAuthenticated();
            if (!cancelled) setAuth(d);
        };
        f();
        // eslint-disable-next-line no-return-assign
        return () => (cancelled = true);
    });
    return auth;
};
