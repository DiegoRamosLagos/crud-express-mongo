const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

username = 'root'
password = 'root'
connectionString = `mongodb+srv://${username}:${password}@cluster0.lhms6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client =>{
        console.log('Connected to the database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')

        app.use(bodyParser.urlencoded({ extended: true }))

        app.listen(3000, () => {
            console.log('listening on port 3000')
        })

        app.get('/', ((req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    console.log(results)
                })
                .catch(error => console.error(error))
            res.sendFile(__dirname + '/index.html')
        }))

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(() => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
    })
