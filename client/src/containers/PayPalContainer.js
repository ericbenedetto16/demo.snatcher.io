import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PayPalIntegration } from '../components/PayPal';

export const PayPalContainer = () => (
    <PayPalScriptProvider
        options={{
            'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
            currency: 'USD',
            intent: 'authorize',
        }}
    >
        <PayPalIntegration
            msgBody=''
            slug=''
            recipient='' // FIXME: Remove Phone Number
        />
    </PayPalScriptProvider>
);
