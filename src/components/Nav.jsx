import { NavLink } from 'react-router-dom';
import { BookOpen, PenLine, Home, Library } from 'lucide-react';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
        <Home size={20} />
        <span>홈</span>
      </NavLink>
      <NavLink to="/library" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
        <Library size={20} />
        <span>서재</span>
      </NavLink>
      <NavLink to="/write" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
        <PenLine size={20} />
        <span>글쓰기</span>
      </NavLink>
    </nav>
  );
}
