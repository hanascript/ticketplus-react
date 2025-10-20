import { Star } from 'lucide-react';
import { useNavigate } from 'react-router';

import styles from './movies.module.css';
import { useMovie } from '../../context/movie-context';
import { useEffect, useState } from 'react';
import { checkIfUserLikedMovie, createNewLike, deleteLike } from '../../firebase/db';

export const MovieItem = ({ movie }) => {
  const { user, refreshLikes } = useMovie();
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (user && movie) {
        const hasLiked = await checkIfUserLikedMovie(movie.imdbID, user.uid);
        setLiked(hasLiked);
      }
    };

    checkLikeStatus();
  }, [user, movie]);

  const handleFindOutMore = () => {
    navigate(`/movies/${movie.imdbID}`);
  };

  const handleLike = () => {
    if (liked) {
      deleteLike(movie.imdbID, user.uid);
      setLiked(false);
    } else {
      createNewLike(movie.Poster, movie.Title, movie.imdbID, user.uid);
      setLiked(true);
    }

    refreshLikes();
  };

  return (
    <div className={styles.movieItem}>
      <figure className={styles.movieImageWrapper}>
        <img src={movie.Poster} alt='movie-poster' />
        <h3 className={styles.movieItemTitle}>{movie.Title}</h3>
        <div className={styles.movieItemList}>
          {user ? (
            liked ? (
              <Star onClick={handleLike} className={styles.movieItemStarLike} />
            ) : (
              <Star onClick={handleLike} className={styles.movieItemStarNoLike} />
            )
          ) : null}
          <button className={styles.movieItemBtn} onClick={handleFindOutMore}>
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
