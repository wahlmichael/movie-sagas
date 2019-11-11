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
    const queryText = 
    `SELECT movies.id,title,poster,description,ARRAY_AGG(name) as genre_array FROM movies_genres
    JOIN movies ON movies.id=movies_genres.movie_id
    JOIN genres ON genres.id=movies_genres.genre_id
    GROUP BY movies.id,title,description,poster
    ORDER BY id asc;`;
    pool.query(queryText)
    .then((result) => {res.send(result.rows)})
    .catch((error) => {
        console.log("Error in get movies", error)
        res.sendStatus(500);
    })
})

app.put('/movies', (req, res) => {
    console.log(req.body)
    const queryText = 
    `UPDATE movies
    SET title= $1,
    description= $2
    WHERE id= $3;`;
    pool.query(queryText, [req.body.title, req.body.description, req.body.id])
    .then(result => {res.sendStatus(200)})
    .catch((error) => {
        console.log("Error in PUT movies")
        res.sendStatus(500);
    })
})


/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});