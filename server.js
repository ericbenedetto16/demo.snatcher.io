require('dotenv').config();
require('./config/db.js').config();
require('colors');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');

const app = express();

require('./config/auth')(passport);

app.use(passport.initialize());

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.ALLOWED_HOST || 'https://snatcher.link' }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

// HealthCheck Endpoint
app.get('/ping', (req, res) => res.send('ok'));

const prodRouter = require('./routes/prodRouter');
const defaultRouter = require('./routes');

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // Trust the NGINX Controller
    app.use(prodRouter);
} else {
    app.use(defaultRouter);
}

app.get('*', (req, res) => res.sendStatus(404));

const server = app.listen(process.env.PORT || 8080, () => {
    // eslint-disable-next-line no-console
    console.log(
        `App Listening at http://${server.address().address}:${
            server.address().port
        }`
    );
});
