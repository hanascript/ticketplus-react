import { Star } from 'lucide-react';
import { useNavigate } from 'react-router';

import styles from './movies.module.css';

export const MovieItem = ({ movie }) => {
  const navigate = useNavigate();

  const handleFindOutMore = () => {
    navigate(`/movies/123`);
  };

  return (
    <div className={styles.movieItem}>
      <figure className={styles.movieImageWrapper}>
        <img src={movie.Poster} alt='movie-poster' />
        <h3 className={styles.movieInfoTitle}>{movie.Title}</h3>
        <div className={styles.movieInfoList}>
          <Star className={styles.movieInfoStarNoLike} />
          <button className={styles.movieInfoBtn} onClick={handleFindOutMore}>
            Find Out More
          </button>
        </div>
      </figure>
    </div>
  );
};

export const MovieItemLoading = () => {
  return (
    <div className={styles.movieItem}>
      <div className={styles.movieItemLoading} />
    </div>
  );
};
