const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(express.json());

app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// HealthCheck Endpoint
app.get('/ping', (req, res) => res.send('ok'));

const server = app.listen(process.env.PORT || 8080, () => {
    // eslint-disable-next-line no-console
    console.log(
        `App Listening at http://${server.address().address}:${
            server.address().port
        }`
    );
});
