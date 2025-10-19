import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

import styles from './movies.module.css';

export const MovieInfo = ({ id }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchMovie(id)
      .then(setMovie)
      .finally(() => setLoading(false));
  }, [id]);

  const fetchMovie = async () => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=18a085e&i=${id}`);
    const data = await response.json();

    console.log(data);

    if (data.Response === 'False') {
      setError('No movie found. Try another search');
      return [];
    }

    return data;
  };

  return (
    <div className={styles.movieInfoRow}>
      {movie && (
        <div className={styles.movieInfo}>
          <figure className={styles.movieInfoImg}>
            <img src={movie.Poster} alt='movie-poster' />
          </figure>
          <div>
            <h1 className={styles.movieInfoTitle}>{movie.Title}</h1>
            <div className={styles.movieInfoDetails}>
              <p>{movie.Released}</p>
              <p>.</p>
              <p>{movie.Runtime}</p>
              <p>.</p>
              <p>{movie.imdbRating}/10</p>
            </div>
            <h3 className={styles.movieOverview}>Overview:</h3>
            <p className={styles.movieInfoText}>{movie.Plot}</p>
            <button className={styles.movieInfoBtn} disabled>
              <Play className={styles.movieInfoBtnIcon} /> Watch
            </button>
          </div>
        </div>
      )}

      {
        loading && (
          <div>asd</div>
        )
      }
    </div>
  );
};
