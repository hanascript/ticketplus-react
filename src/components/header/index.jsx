import { useState } from 'react';

import styles from './header.module.css';
import { useSearch } from '../../context/search-context';
import { useNavigate } from 'react-router';

export const Header = () => {
  const [inputValue, setInputValue] = useState('');

  const { setSearchQuery } = useSearch();

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setSearchQuery(inputValue);
    navigate('/movies');
  };

  return (
    <>
      <header className={styles.homeWrapper}>
        <figure className={styles.heroWrapper}>
          <img src='/moviebackground.jpg' alt='movie-background' className={styles.heroImage} />
          <div className={styles.ctaSection}>
            <h1 className={styles.ctaTitle}>
              {' '}
              Ticket<span className='text-highlight'>+</span>{' '}
            </h1>
            <h3 className={styles.ctaSubtitle}>
              With over <span className='text-highlight'>3000</span> movies on Ticket
              <span className='text-highlight'>+</span>, the possibilites are endless!
            </h3>
            <form className={styles.ctaSearch} onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Find a movie'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />
            </form>
          </div>
        </figure>
      </header>
    </>
  );
};
