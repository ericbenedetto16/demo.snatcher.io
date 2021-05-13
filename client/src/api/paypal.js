import { getToken } from '../utils';
import { GATEWAY_URL } from './queries';

export const instantiateOrder = async (msgBody, recipient, slug) => {
    try {
        let res = await fetch(`${GATEWAY_URL}/payments/create`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getToken(),
            },
            body: JSON.stringify({
                msgBody,
                recipient,
                slug,
            }),
        });

        res = await res.json();
        return res.orderID;
    } catch (err) {
        // eslint-disable-next-line no-alert
        alert('Error Connecting to Paypal Services');
        return null;
    }
};

export const authorizeAndCapturePayment = async (
    data,
    msgBody,
    recipient,
    slug
) => {
    try {
        await fetch(`${GATEWAY_URL}/payments/authorize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getToken(),
            },
            body: JSON.stringify({
                orderID: data.orderID,
                msgBody,
                recipient,
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
