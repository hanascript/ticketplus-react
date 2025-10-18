import { Search } from 'lucide-react';
import styles from './movies.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearch } from '../../context/search-context';

export const MoviesSearch = () => {
  const [inputValue, setInputValue] = useState('');

  const { setSearchQuery } = useSearch();

  const handleSubmit = e => {
    e.preventDefault();
    setSearchQuery(inputValue);
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
