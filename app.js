const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
require('dotenv').config();
const quotesRouter = require('./routes/quote.routes');

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err
    console.log('Connected to database');
})

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

mongoose.Promise = global.Promise;

app.use('/api', quotesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(err.status || 404).json({
        message: "No such route exists"
    })
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: "Error Message"
    })
});

app.listen(3000, () => {
    console.log("Node server running on http://localhost:3000");
});

module.exports = app;
