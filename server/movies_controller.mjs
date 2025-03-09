import 'dotenv/config';
import * as moviesModel from './movies_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const ERROR_NOT_FOUND = {Error: 'Not found'}

const app = express();

app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})

/**
 * Create a new movie with the title, year and language provided in the body.
 */
app.post('/movies', (req, res) => {
    const movie = moviesModel.createMovie(req.body.title, req.body.year, req.body.language);
        res.status(201).json(movie)
});

/**
 * Retrieve all movies. 
 */
app.get('/movies', (req, res) => {
    const movies = moviesModel.findMovies();
    res.json(movies);
});


/**
 * Retrieve the movie corresponding to the ID provided in the URL.
 */
app.get('/movies/:movie_id', (req, res) => {
    const movie = moviesModel.findMovieById(req.params.movie_id);
    if (movie !== null) {
        res.json(movie);
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
});

/**
 * Update the movie whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put('/movies/:movie_id', (req, res) => {
    const numUpdated = moviesModel.replaceMovie(
                req.params.movie_id, req.body.title, req.body.year, req.body.language)
    if (numUpdated === 1) {
        res.json({ _id: req.params.movie_id, title: req.body.title, year: req.body.year, language: req.body.language })
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
});

/**
 * Delete the movie whose id is provided in the query parameters
 */
app.delete('/movies/:movie_id', (req, res) => {
    const deletedCount = moviesModel.deleteById(req.params.movie_id);
    if (deletedCount === 1) {
        res.status(204).send();
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
});


