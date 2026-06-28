import { BookOpen } from 'lucide-react';
import styles from './BookCard.module.css';

const STATUS_LABEL = {
  reading: '읽는 중',
  done: '읽음',
  want: '읽고 싶음',
};

const GENRE_COLORS = {
  소설: '#c4783a',
  에세이: '#5a8a5a',
  인문: '#6b4f3a',
  과학: '#3a6b8a',
};

export default function BookCard({ book, onClick }) {
  const genreColor = GENRE_COLORS[book.genre] || '#7a6f65';

  return (
    <button className={styles.card} onClick={() => onClick?.(book)}>
      <div className={styles.cover}>
        <BookOpen size={32} color="#a89e94" />
      </div>
      <div className={styles.info}>
        <div className={styles.meta}>
          <span className={styles.genre} style={{ color: genreColor }}>{book.genre}</span>
          <span className={`${styles.status} ${styles[book.status]}`}>{STATUS_LABEL[book.status]}</span>
        </div>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
        {book.status === 'reading' && (
          <div className={styles.progressWrap}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${book.progress}%` }} />
            </div>
            <span className={styles.progressText}>{book.progress}%</span>
          </div>
        )}
        {book.status === 'done' && book.rating && (
          <div className={styles.rating}>
            {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
          </div>
        )}
      </div>
    </button>
  );
}
