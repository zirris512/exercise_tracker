import MovieItem from './MovieItem';

function MovieCollection({ movies}) {
    return (
        <div className="collection-container">
            {movies.map((movie, i) => <MovieItem movie={movie} 
                    key={i} />)}
        </div>

    );
}

export default MovieCollection;