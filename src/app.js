const express = require('express');
const mongoose = require('mongoose');       
const bodyParser = require('body-parser');
require('dotenv').config();

// App
const app = express();

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

// Load models
const Mentions = require('./models/mentions');

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mentionsRoutes = require('./routes/mentions-routes');
app.use('/mentions', mentionsRoutes);


module.exports = app;