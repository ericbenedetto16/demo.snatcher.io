require('dotenv').config();
require('colors');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

const payments = require('./routes/payments');

app.use('/', payments);

const server = app.listen(process.env.PORT || 8082, () => {
    // eslint-disable-next-line no-console
    console.log(
        `App Listening at http://${server.address().address}:${
            server.address().port
        }`
    );
});
