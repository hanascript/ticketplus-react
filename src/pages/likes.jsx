import { useEffect, useState } from 'react';
import { MovieItem } from '../components/movies/movie-item';

import styles from '../components/movies/movies.module.css';
import { getAllLikesForUser } from '../firebase/db';
import { Frown, Loader2 } from 'lucide-react';
import { useMovie } from '../context/movie-context';
import { Navigate } from 'react-router';

export default function Likes() {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, likesRefresh } = useMovie();

  useEffect(() => {
    fetchLikes();
  }, [user, likesRefresh]);

  const fetchLikes = async () => {
    setLoading(true);
    if (user) {
      const data = await getAllLikesForUser();
      setLikes(
        data.map(like => {
          return {
            Title: like.title,
            Poster: like.poster,
            imdbID: like.imdbID,
          };
        })
      );
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className='likes-page-wrapper'>
        <div className={styles.movieListLoadingSpinner}>
          <Loader2 className='spin-animation' style={{ width: '64px', height: '64px', stroke: 'crimson' }} />
        </div>
      </div>
    );
  }

  if (likes === undefined || likes.length === 0) {
    return (
      <div className='likes-page-no-likes-wrapper'>
        <p className='likes-page-no-likes-text'>You have no likes yet</p>
        <Frown className='text-highlight' />
      </div>
    );
  }

  return (
    <div className='likes-page-container'>
      <h1>Your Likes</h1>
      <div className={styles.moviesList}>
        {likes.map((like, idx) => {
          const key = `${like.Title}-${idx}`;
          return <MovieItem key={key} movie={like} />;
        })}
      </div>
    </div>
  );
}
