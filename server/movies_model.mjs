import movies from './data/movies.mjs';
import Movie from './movie.mjs';

/**
 * Create a movie
 * @param {String} title 
 * @param {Number} year 
 * @param {String} language 
 * @returns
 */
const createMovie = (title, year, language) => {
    const movie = new Movie(title, year, language);
    movies.push(movie)
    return movie;
}

/**
 * Retrieve all movies
 * @returns 
 */
const findMovies = () => {
    return movies;
}

/**
 * Retrieve movies based on the ID
 * @param {Object} movie_id
 * @returns 
 */
const findMovieById = (movie_id) => {
    const result = movies.filter( (movie) => movie_id === movie._id)
    return result.length === 0 ? null : result[0]
}

/**
 * Replace the title, year, language properties of the movie with the id value provided
 * @param {String} _id 
 * @param {String} title 
 * @param {Number} year 
 * @param {String} language 
 * @returns Number of documents modified
 */
const replaceMovie = (_id, title, year, language) => {
    const result = movies.filter( (movie) => _id === movie._id)
    if(result.length === 0) {
        return 0;
    } else{
        const movie = result[0];
        movie.title = title;
        movie.year = year;
        movie.language = language;
        return 1;
    }
}


/**
 * Delete the movie with provided id value
 * @param {String} _id 
 * @returns Count of deleted documents
 */
const deleteById = (_id) => {
    for(let i = 0; i < movies.length; i++){
        if(movies[i]._id === _id){
            movies.splice(i, 1)
            return 1;
        }
    }
    return 0;
}

export { createMovie, findMovies, findMovieById, replaceMovie, deleteById };
