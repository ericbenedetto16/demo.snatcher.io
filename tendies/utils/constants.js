exports.PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID;
exports.PAYPAL_SECRET = process.env.PAYPAL_SECRET;
exports.PAYPAL_OAUTH_API = 'https://api-m.sandbox.paypal.com/v1/oauth2/token/';
// eslint-disable-next-line operator-linebreak
exports.PAYPAL_ORDER_API =
    'https://api-m.sandbox.paypal.com/v2/checkout/orders/';
// eslint-disable-next-line operator-linebreak
exports.PAYPAL_AUTHORIZATION_API =
    'https://api-m.sandbox.paypal.com/v2/payments/authorizations/';
