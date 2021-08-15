const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

username = 'root'
password = 'root'
db = 'star-wars-quotes'
collection = 'quotes'
connectionString = `mongodb+srv://${username}:${password}@cluster0.lhms6.mongodb.net/${db}?retryWrites=true&w=majority`

mongoose.connect(connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
    if (err) throw err
    console.log('Connected to database')
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

const models = require('./models/quotes')
const quotesController = require('./controllers/quotes')

const router = express.Router()


router.get("/", function (req, res) {
    res.send("Hello World!");
});

app.use(router)

const quotes = express.Router()

quotes.route('/quotes')
    .get(quotesController.findAllQuotes)
    .post(quotesController.addQuote)

quotes.route('/quotes/:id')
    .get(quotesController.findById)
    .put(quotesController.updateQuote)
    .delete(quotesController.deleteQuote)

app.use('/api', quotes)

app.listen(3000, () => {
    console.log("Node server running on http://localhost:3000");
})
