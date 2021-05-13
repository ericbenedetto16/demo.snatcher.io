import { GATEWAY_URL } from './queries';
import { getToken } from '../utils';

export const getSlugs = async () => {
    try {
        const res = await fetch(`${GATEWAY_URL}/getSlugs/`, {
            method: 'POST',
            headers: {
                Authorization: getToken(),
            },
        });
        if (res.status === 401 || res.status === 403) return null;

        const json = await res.json();

        if (json.success === true) {
            console.log(json);
            return json;
        }

        return null;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line no-console
        console.error('Error Sending Token to Auth Server');
        return null;
    }
};
