require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

const sms = require('./routes/sms');

app.use('/', sms);

const server = app.listen(process.env.PORT || 8083, () => {
    // eslint-disable-next-line no-console
    console.log(
        `Twilio Service Running at ${server.address().address}:${
            server.address().port
        }`
    );
});
