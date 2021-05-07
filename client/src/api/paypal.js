import { getToken } from '../utils';
import { GATEWAY_URL } from './queries';

export const instantiateOrder = async () => {
    try {
        let res = await fetch(`${GATEWAY_URL}/payments/create`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getToken(),
            },
        });

        res = await res.json();
        return res.orderID;
    } catch (err) {
        // eslint-disable-next-line no-alert
        alert('Error Connecting to Paypal Services');
        return null;
    }
};

export const capturePayment = async (data, msgBody, slug) => {
    try {
        await fetch(`${GATEWAY_URL}/payments/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getToken(),
            },
            body: JSON.stringify({
                orderID: data.orderID,
                msgBody,
                slug,
            }),
        });

        return;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line no-alert
        alert('Error Connecting to Paypal Services');
    }
};
