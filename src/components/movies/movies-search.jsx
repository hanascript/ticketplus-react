import { Search } from 'lucide-react';
import { useState } from 'react';
import { useMovie } from '../../context/movie-context';
import styles from './movies.module.css';

export const MoviesSearch = () => {
  const [inputValue, setInputValue] = useState('');

  const { setMovieQuery } = useMovie();

  const handleSubmit = e => {
    e.preventDefault();
    setMovieQuery(inputValue);
  };

  return (
    <form className={styles.moviesSearch} onSubmit={handleSubmit}>
      <div className={styles.movieSearchInputWrapper}>
        <input
          type='text'
          placeholder='Search for a movie'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </div>
      <button type='submit' className={styles.movieSearchBtn}>
        <Search className={styles.movieSearchBtnIcon} />
      </button>
    </form>
  );
};
