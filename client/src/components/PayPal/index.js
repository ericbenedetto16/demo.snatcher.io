import React from 'react';
import PropTypes from 'prop-types';
import {
    PayPalButtons,
    FUNDING,
    PayPalScriptProvider,
} from '@paypal/react-paypal-js';
import { authorizeAndCapturePayment, instantiateOrder } from '../../api/paypal';

// eslint-disable-next-line object-curly-newline
export const PayPalIntegration = ({ msgBody, recipient, slug, dismiss }) => {
    // eslint-disable-next-line consistent-return
    const createOrder = async () => instantiateOrder(msgBody, recipient, slug);

    const onApprove = async (data) => {
        const succ = await authorizeAndCapturePayment(
            data,
            msgBody,
            recipient,
            slug
        );
        if (succ) {
            dismiss();
        }
    };

    return (
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
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
        </div>
    );
};

PayPalIntegration.propTypes = {
    msgBody: PropTypes.string.isRequired,
    recipient: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    dismiss: PropTypes.func.isRequired,
};
