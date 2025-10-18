import styles from './movies.module.css';

export const MovieItem = ({ movie }) => {
  return (
    <div className={styles.movieItem}>
      <figure className={styles.movieImageWrapper}>
        <img src={movie.Poster} alt='movie-poster' />
        <h3 className={styles.movieInfoTitle}>${movie.Title}</h3>
        <div className={styles.movieInfoList}>
          <div className={styles.movieInfo}>
            <p>136m</p>
          </div>
          <div className={styles.movieInfo}>
            <p>4.5</p>
          </div>
          <div className={styles.movieInfo}>
            <p>English</p>
          </div>
        </div>
      </figure>
      <h4 className={styles.movieTitle}>${movie.Title}</h4>
    </div>
  );
};
