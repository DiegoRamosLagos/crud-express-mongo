const express = require('express');
const quoteControllers = require('../controllers/quote.controllers');
const router = express.Router();

router.route('/quotes')
    .get(quoteControllers.findAllQuotes)
    .post(quoteControllers.addQuote);

router.route('/quotes/:id')
    .get(quoteControllers.findById)
    .put(quoteControllers.updateQuote)
    .delete(quoteControllers.deleteQuote);

module.exports = router;