import Nav from './Nav';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <span className={styles.logoMark}>나루</span>
      </a>
      <Nav />
    </header>
  );
}
