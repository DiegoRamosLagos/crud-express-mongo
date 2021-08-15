const mongoose = require('mongoose');
const Quote = mongoose.model('Quote')

exports.findAllQuotes = (req, res) => {
  Quote.find((err, quotes) => {
      if (err) res.send(500, err.message)

      console.log('GET /quotes')
      res.status(200).json(quotes)
  })
}

exports.findById = (req, res) => {
    Quote.findById(req.params.id, (err, quote) => {
        if (err) return res.send(500, err.message)

        console.log('GET /quote/' + req.params.id);
        res.status(200).json(quote);
        // TODO: manage when quote doesn't exist
    })
}

exports.addQuote = (req, res) => {
    console.log('POST')
    console.log(req.body)

    const quote = new Quote({
        name: req.body.name,
        quote: req.body.quote
    })

    quote.save((err, quote) => {
        if (err) return res.status(500).send(err.message)
        res.status(200).json(quote)
    })
}

exports.updateQuote = (req, res) => {
    Quote.findById(req.params.id, (err, quote) => {
        quote.name = req.body.name
        quote.quote = req.body.quote

        quote.save((err, quote) => {
            if (err) return res.status(500).send(err.message)
            res.status(200).json(quote)
            // TODO: manage when quote doesn't exist
        })
    })
}

exports.deleteQuote = (req, res) => {
  Quote.findById(req.params.id, (err, quote) => {
      quote.remove(err => {
          if (err) return res.status(500).send(err.message)
          res.status(200).send()
          // TODO: return response when delete quote
      })
  })
}