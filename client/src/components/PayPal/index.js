import React from 'react';
import PropTypes from 'prop-types';
import {
    PayPalButtons,
    FUNDING,
    PayPalScriptProvider,
} from '@paypal/react-paypal-js';
import { authorizeAndCapturePayment, instantiateOrder } from '../../api/paypal';

export const PayPalIntegration = ({ msgBody, recipient, slug }) => {
    // eslint-disable-next-line consistent-return
    const createOrder = async () => instantiateOrder(msgBody, recipient, slug);

    const onApprove = async (data) => {
        await authorizeAndCapturePayment(data, msgBody, recipient, slug);
    };

    return (
        <>
            <PayPalScriptProvider
                options={{
                    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
                    currency: 'USD',
                    intent: 'authorize',
                }}
            >
                <PayPalButtons
                    fundingSource={FUNDING.PAYPAL}
                    createOrder={() => createOrder()}
                    onApprove={(data, actions) => onApprove(data, actions)}
                />

                <PayPalButtons
                    fundingSource={FUNDING.CARD}
                    createOrder={() => createOrder()}
                    onApprove={(data) => onApprove(data)}
                />
            </PayPalScriptProvider>
        </>
    );
};

PayPalIntegration.propTypes = {
    msgBody: PropTypes.string.isRequired,
    recipient: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};
