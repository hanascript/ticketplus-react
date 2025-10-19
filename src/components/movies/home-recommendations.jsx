import { MovieList } from './movie-list';

import styles from './movies.module.css';

export const HomeRecommendations = () => {
  return (
    <div className={styles.homeRecommendations}>
      <MovieList />
    </div>
  );
};
