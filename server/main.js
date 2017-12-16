const express = require('express');
const path = require('path');

const morgan = require('morgan'); // HTTP REQUEST LOGGER
const bodyParser = require('body-parser'); // HTTP REQUEST LOGGER

const mongoose = require('mongoose'); // HTTP REQUEST LOGGER
const session = require('express-session'); // HTTP REQUEST LOGGER

const api = require('./routes/index');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/codelab');


const app = express();
const port = 3000;




app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));


app.use('/', express.static(path.join(__dirname, './../public')));
app.use('/api', api);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});
app.get('/hello', (req, res) => {
    return res.send('Hello CodeLab');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});