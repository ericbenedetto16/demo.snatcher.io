const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const exphbs = require('express-handlebars');

require('colors');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(express.json());

// Setup Handlebars for Static Pages (404, etc.)
app.engine('hbs', exphbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

const slugs = require('./routes/slugs');

app.use('/', slugs);

const server = app.listen(process.env.PORT || 8081, () => {
    // eslint-disable-next-line no-console
    console.log(
        `App Listening at http://${server.address().address}:${
            server.address().port
        }`
    );
});
