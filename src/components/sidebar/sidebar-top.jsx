import { NavLink } from 'react-router';

import styles from './sidebar.module.css';

export const SidebarTop = () => {
  return (
    <div className={styles.sidebarTop}>
      <NavLink
        to='/'
        end
        className={({ isActive }) => (isActive ? `${styles.sidebarOption} ${styles.active}` : styles.sidebarOption)}
      >
        <svg
          className={styles.sidebarOptionIcon}
          focusable='false'
          aria-hidden='true'
          viewBox='0 0 24 24'
          data-testid='HomeRoundedIcon'
        >
          <path d='M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z'></path>
        </svg>
        <p>Home</p>
      </NavLink>

      <NavLink
        to='/movies'
        className={({ isActive }) => (isActive ? `${styles.sidebarOption} ${styles.active}` : styles.sidebarOption)}
        end
      >
        <svg
          className={styles.sidebarOptionIcon}
          focusable='false'
          aria-hidden='true'
          viewBox='0 0 24 24'
          data-testid='LocalMoviesRoundedIcon'
        >
          <path d='M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z'></path>
        </svg>
        <p>Movies</p>
      </NavLink>
    </div>
  );
};
