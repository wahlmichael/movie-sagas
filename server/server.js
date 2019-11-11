const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./modules/pool');
const port = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.get('/movies', (req,res) => {
    const queryText = 'SELECT * FROM "movies"';
    pool.query(queryText)
    .then((result) => {res.send(result.rows)})
    .catch((error) => {
        console.log("Error in get movies", error)
        res.sendStatus(500);
    })
})


/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});