import { Link } from 'react-router-dom';
import { BookOpen, PenLine, TrendingUp, ChevronRight } from 'lucide-react';
import { books, writings } from '../data/books';
import BookCard from '../components/BookCard';
import styles from './Home.module.css';

export default function Home() {
  const reading = books.filter(b => b.status === 'reading');
  const recentWriting = writings[0];
  const totalDone = books.filter(b => b.status === 'done').length;

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.greeting}>
          <p className={styles.date}>
            {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
          </p>
          <h1>오늘도 좋은 하루,<br />어떤 책과 함께하나요?</h1>
          <p className={styles.sub}>나루에서 독서 여정을 기록하고, 생각을 글로 남겨보세요.</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <BookOpen size={20} className={styles.statIcon} />
            <span className={styles.statNum}>{reading.length}</span>
            <span className={styles.statLabel}>읽는 중</span>
          </div>
          <div className={styles.statCard}>
            <TrendingUp size={20} className={styles.statIcon} />
            <span className={styles.statNum}>{totalDone}</span>
            <span className={styles.statLabel}>완독</span>
          </div>
          <div className={styles.statCard}>
            <PenLine size={20} className={styles.statIcon} />
            <span className={styles.statNum}>{writings.length}</span>
            <span className={styles.statLabel}>기록</span>
          </div>
        </div>
      </section>

      {reading.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>지금 읽는 책</h2>
            <Link to="/library" className={styles.more}>
              전체 서재 <ChevronRight size={16} />
            </Link>
          </div>
          <div className={styles.bookList}>
            {reading.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      {recentWriting && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>최근 기록</h2>
            <Link to="/write" className={styles.more}>
              모든 기록 <ChevronRight size={16} />
            </Link>
          </div>
          <Link to={`/write/${recentWriting.id}`} className={styles.writingCard}>
            <div className={styles.writingMeta}>
              <span className={styles.writingBook}>{recentWriting.bookTitle}</span>
              <span className={styles.writingDate}>{recentWriting.updatedAt}</span>
            </div>
            <h3 className={styles.writingTitle}>{recentWriting.title}</h3>
            <p className={styles.writingPreview}>
              {recentWriting.content.slice(0, 120)}...
            </p>
          </Link>
        </section>
      )}
    </main>
  );
}
