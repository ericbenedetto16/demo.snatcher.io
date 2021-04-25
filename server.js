require('dotenv').config();
require('colors');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

// Import Routes
const slugs = require('./routes/slugs');
const payments = require('./routes/payments');

// HealthCheck Endpoint
app.get('/ping', (req, res) => res.send('ok'));

// Front-End
const FRONT_END_ROUTES = ['/', '/create', '/track', '/login'];
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')));

    FRONT_END_ROUTES.forEach((route) => {
        app.get(route, (req, res) => {
            res.sendFile(path.join(__dirname, './client/build', 'index.html'));
        });
    });
}

// Gateway Services
app.use('/payments', payments);

app.post('/createLink', slugs);
app.get('/:slugs', slugs);

const server = app.listen(process.env.PORT || 8080, () => {
    // eslint-disable-next-line no-console
    console.log(
        `App Listening at http://${server.address().address}:${
            server.address().port
        }`
    );
});
