import { SidebarBottom } from './sidebar-bottom';
import { SidebarTop } from './sidebar-top';

import styles from './sidebar.module.css';

export const SideBar = () => {
  return (
    <nav className={styles.sidebar}>
      <h4>Menu</h4>
      <SidebarTop />
      <SidebarBottom />
    </nav>
  );
};
