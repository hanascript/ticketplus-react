import { MovieItem } from './movie-item';

import styles from './movies.module.css';

const movie = {
  Title: 'The Dark Knight',
  Poster: '/sample-poster.jpg',
};

export const MovieList = () => {


  return (
    <div className={styles.moviesContent}>
      <div className={styles.moviesList}>
        <MovieItem movie={movie} />
        <MovieItem movie={movie} />
        <MovieItem movie={movie} />
        <MovieItem movie={movie} />
        <MovieItem movie={movie} />
        <MovieItem movie={movie} />
      </div>
    </div>
  );
};
