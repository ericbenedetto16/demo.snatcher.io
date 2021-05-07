import { GATEWAY_URL } from './queries';
import { getToken } from '../utils';

export const userAuthenticated = async () => {
    try {
        const res = await fetch(`${GATEWAY_URL}/users/token`, {
            method: 'POST',
            headers: {
                Authorization: getToken(),
            },
        });

        if (res.status === 401 || res.status === 403) return false;

        const json = await res.json();

        if (json.success === true) {
            return true;
        }

        return false;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line no-console
        console.error('Error Sending Token to Auth Server');
        return false;
    }
};
