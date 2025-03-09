import { Link } from 'react-router-dom';
import MovieCollection from '../components/MovieCollection';
import { useState} from 'react';

function HomePage() {
    const [movies, setMovies] = useState([]);

    return (
        <>
            <h2>List of Movies</h2>
            <MovieCollection movies={movies}></MovieCollection>
            <Link to="/add-movie">Add a movie</Link>
        </>
    );
}

export default HomePage;