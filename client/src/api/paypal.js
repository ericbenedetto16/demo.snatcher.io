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
    // eslint-disable-next-line consistent-return
) => {
    try {
        const res = await fetch(`${GATEWAY_URL}/payments/authorize`, {
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

        const json = await res.json();
        if (res.status === 400) {
            alert(json.msg);
        }

        if (res.status === 500) {
            alert(
                'There Was an Error Processing Your Transaction. Please Try Again Later'
            );
        }

        if (res.status === 200) {
            alert('SMS Sent Successfully');
            return true;
        }

        return false;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line no-alert
        alert('Error Connecting to Paypal Services');
    }
};
