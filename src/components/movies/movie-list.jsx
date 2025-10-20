import { useEffect, useState } from 'react';
import { MovieItem, MovieItemLoading } from './movie-item';

import styles from './movies.module.css';
import { Loader2 } from 'lucide-react';

export const MovieList = ({ movieQuery, spinner = false }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchMovies(movieQuery)
      .then(setMovies)
      .finally(() => setLoading(false));
  }, [movieQuery]);

  const fetchMovies = async (searchTerm = pickRandomMovies()) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=18a085e&s=${searchTerm}`);
    const data = await response.json();

    if (data.Response === 'False') {
      setError('No movies found. Try another search');
      return [];
    }

    return data.Search.slice(0, 6);
  };

  const pickRandomMovies = () => {
    const randomSearch = [
      'spider',
      'batman',
      'pokemon',
      'harry potter',
      'lord of the rings',
      'alien',
      'witch',
      'scary',
    ];

    const randomIndex = Math.floor(Math.random() * randomSearch.length);

    return randomSearch[randomIndex];
  };

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.moviesContent}>
        {loading ? (
          spinner ? (
            <MovieListLoadingSpinner />
          ) : (
            <MovieListLoading />
          )
        ) : (
          <div className={styles.moviesList}>
            {movies.map((movie, idx) => {
              const key = `${movie.Title}-${idx}`;
              return <MovieItem key={key} movie={movie} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

const MovieListLoading = () => {
  return (
    <div className={styles.moviesList}>
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
    </div>
  );
};

const MovieListLoadingSpinner = () => {
  return (
    <div className={styles.movieListLoadingSpinner}>
      <Loader2 className='spin-animation' style={{ width: '64px', height: '64px', stroke: 'crimson' }} />
    </div>
  );
};
