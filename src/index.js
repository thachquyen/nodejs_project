import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import route from './routes/index.js';
import db from './config/db/index.js';
import methodOverride from 'method-override';
import moment from 'moment';

const app = express();
//Connect to DB
db.connect();
app.use(morgan('combined'));
app.use(express.static('./src/public'));
app.use('/uploads', express.static('src/public/uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

// Set Handlebars as the view engine
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
        numRow: index => index + 1,
        formatDate: (date) => moment(date).format('YYYY/MM/DD'),
        range: function(start, end, options) {
            let result = '';
            for (let i = start; i <= end; i++) {
                result += options.fn(i);
            }
            return result;
        },
        eq: function(a, b) {
            return a === b;
        },
        addIndex: function (index, currentPage, pageSize) {
            // Ensure default values to prevent NaN
            currentPage = currentPage || 1;
            pageSize = pageSize || 5;
            return (currentPage - 1) * pageSize + index + 1;
        }
    }
}));
app.set('view engine', 'hbs');

// Set the views directory
app.set('views', './src/views');

// route init
route(app);

app.listen(3000);