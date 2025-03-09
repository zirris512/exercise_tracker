import '../App.css';

function MovieItem({ movie}) {
    return (
        <div className="collection-item">
            <h3>{movie.title}</h3>
            <p>{movie.year}, {movie.language}</p>
            <p>
                <a href="/" onClick={e => e.preventDefault()}>Edit</a>&nbsp;
                <a href="/" onClick={e => e.preventDefault()}>Delete </a>
            </p>
        </div>
    );
}

export default MovieItem;