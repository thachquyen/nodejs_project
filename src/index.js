import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import route from './routes/index.js';

const app = express();

app.use(morgan('combined'));
app.use(express.static('./src/public'));

// Set Handlebars as the view engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Set the views directory
app.set('views', './src/views');

// route init
route(app);

app.listen(3000);