import { useEffect, useState } from 'react';
import { MovieItem, MovieItemLoading } from './movie-item';

import styles from './movies.module.css';

export const MovieList = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMovies(searchQuery)
      .then(setMovies)
      .finally(() => setLoading(false));
  }, [searchQuery]);

  const fetchMovies = async (searchTerm = 'spider') => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=18a085e&s=${searchTerm}`);
    const data = await response.json();

    if (data.Response === 'False') {
      return [];
    }

    console.log(data);

    return data.Search.slice(0, 6);
  };

  return (
    <div className={styles.moviesContent}>
      {loading ? (
        <MovieListLoading />
      ) : (
        <div className={styles.moviesList}>
          {movies.map((movie, idx) => {
            const key = `${movie.Title}-${idx}`;
            return <MovieItem key={key} movie={movie} />;
          })}
        </div>
      )}
    </div>
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
