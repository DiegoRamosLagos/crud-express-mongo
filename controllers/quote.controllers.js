const mongoose = require('mongoose');
require('../models/quote')
const Quote = mongoose.model('Quote');

exports.findAllQuotes = async (req, res) => {
  Quote.find((err, quotes) => {
      if (err) res.send(500, err.message)

      console.log('GET /quotes')
      res.status(200).json(quotes)
  });
};

exports.findById = async (req, res) => {
    Quote.findById(req.params.id, (err, quote) => {
        if (err) return res.send(500, err.message)

        console.log('GET /quote/' + req.params.id);
        res.status(200).json(quote);
        // TODO: manage when quote doesn't exist
    });
};

exports.addQuote = async (req, res) => {
    console.log('POST')
    console.log(req.body)

    const quote = new Quote({
        name: req.body.name,
        quote: req.body.quote
    });

    await quote.save((err, quote) => {
        if (err) return res.status(500).send(err.message)
        res.status(200).json(quote)
    });
};

exports.updateQuote = async (req, res) => {
    const quoteUpdate = {
        name: req.body.name,
        quote: req.body.quote
    }
    Quote.findById(req.params.id)
        .then(actualQuote => {
            Quote.updateOne(actualQuote.body._id, quoteUpdate)
                .then(() => res.status(200).json(quoteUpdate))
        })
        .catch(err => {
            res.status(500).json({
                code: 500,
                message: err.message
            })
        });
};

exports.deleteQuote = (req, res) => {
    Quote.findByIdAndDelete(req.params.id)
        .then(deletedQuote => {
            if (!deletedQuote) {
                return res.status(400).json({
                    ok: false,
                    message: 'id not exist'
                })
            }
            return res.status(200).json({
                ok: true,
                quote: deletedQuote
            })
        })
        .catch(err => res.status(500).json({
            ok: false,
            err
        }))
};