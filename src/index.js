const path = require('path');
const express = require('express');
const methodOverride = require('method-override')
const morgan = require('morgan');
const { engine } = require('express-handlebars'); // Update import
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

db.connect();
app.use(express.static(path.join(__dirname, 'public')));
//middleweare
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'))

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a,b) => a + b,
        }
    }),
); // Update setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

route(app);

// Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
