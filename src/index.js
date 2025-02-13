import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';

const app = express();

app.use(morgan('combined'));
app.use(express.static('./src/public'));

// Set Handlebars as the view engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Set the views directory
app.set('views', './src/views');


// Example route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000);