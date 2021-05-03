require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));

// Route to Inject Runtime Environment Variables into Client
app.get('/clientData.json', (req, res) => {
    res.jsonp({
        REACT_APP_GATEWAY_URL: 'https://gateway.snatcher.link',
        PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    });
});

// Serve the Front-End
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const server = app.listen(process.env.PORT || 3000, () => {
    // eslint-disable-next-line no-console
    console.log(
        `App Listening at http://${server.address().address}:${
            server.address().port
        }`
    );
});
