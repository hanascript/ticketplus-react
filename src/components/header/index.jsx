import styles from './header.module.css';

export const Header = () => {
  return (
    <>
      <header className={styles.homeWrapper}>
        <figure className={styles.heroWrapper}>
          <img src='/moviebackground.jpg' alt='movie-background' className={styles.heroImage} />
          <div className={styles.ctaSection}>
            <h1 className={styles.ctaTitle}>
              {' '}
              Ticket<span class='text-highlight'>+</span>{' '}
            </h1>
            <h3 className={styles.ctaSubtitle}>
              With over <span class='text-highlight'>3000</span> movies on Ticket<span class='text-highlight'>+</span>,
              the possibilites are endless!
            </h3>
            <div className={styles.ctaSearch}>
              <input type='text' placeholder='Find a movie' />
            </div>
          </div>
        </figure>
      </header>
    </>
  );
};
