import { useEffect, useState } from 'react';
import { Play, Star } from 'lucide-react';
import { useMovie } from '../../context/movie-context';

import styles from './movies.module.css';
import { checkIfUserLikedMovie, createNewLike, deleteLike } from '../../firebase/db';

export const MovieInfo = ({ id }) => {
  const { user, refreshLikes } = useMovie();
  const [liked, setLiked] = useState(false);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=18a085e&i=${id}`);
        const data = await response.json();

        if (data.Response === 'False') {
          setError('No movie found. Try another search');
          return [];
        }

        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (user && movie) {
        const hasLiked = await checkIfUserLikedMovie(movie.imdbID, user.uid);
        setLiked(hasLiked);
      }
    };

    checkLikeStatus();
  }, [user, movie]);

  const handleLike = async () => {
    if (liked) {
      await deleteLike(movie.imdbID, user.uid);
      setLiked(false);
    } else {
      await createNewLike(movie.Poster, movie.Title, movie.imdbID, user.uid);
      setLiked(true);
    }

    refreshLikes();
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
              <span>.</span>
              <p>{movie.Runtime}</p>
              <span>.</span>
              <p>{movie.imdbRating}/10</p>
            </div>
            <h3 className={styles.movieOverview}>Overview:</h3>
            <p className={styles.movieInfoText}>{movie.Plot}</p>
            <div className='flex-center gap-4'>
              <button className={styles.movieInfoBtn} disabled>
                <Play className={styles.movieInfoBtnIcon} /> Watch
              </button>

              {user &&
                (liked ? (
                  <Star
                    onClick={handleLike}
                    className={styles.movieItemStarLike}
                    style={{ width: '35px', height: '35px' }}
                  />
                ) : (
                  <Star
                    onClick={handleLike}
                    className={styles.movieItemStarNoLike}
                    style={{ width: '35px', height: '35px' }}
                  />
                ))}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className={styles.movieInfo}>
          <figure className={styles.movieInfoImg}>
            <div className={styles.movieInfoImgLoading} />
          </figure>
          <div>
            <h1 className={styles.movieInfoTitleLoading} />
            <div className={styles.movieInfoDetails}>
              <div className={styles.movieInfoDetailsLoading} />
              <span>.</span>
              <div className={styles.movieInfoDetailsLoading} />
              <span>.</span>
              <div className={styles.movieInfoDetailsLoading} />
            </div>
            <h3 className={styles.movieOverview}>Overview:</h3>
            <p className={styles.movieInfoTextLoading} />
            <p className={styles.movieInfoTextLoading} />
            <p className={styles.movieInfoTextLoading} />
            <p className={styles.movieInfoTextLoading} />
            <button className={styles.movieInfoBtn} disabled>
              <Play className={styles.movieInfoBtnIcon} /> Watch
            </button>
          </div>
        </div>
      )}

      {error && <div className={styles.movieDetailsError}>{error}</div>}
    </div>
  );
};
