import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { books } from '../data/books';
import BookCard from '../components/BookCard';
import styles from './Library.module.css';

const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'reading', label: '읽는 중' },
  { key: 'done', label: '읽음' },
  { key: 'want', label: '읽고 싶음' },
];

export default function Library() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = books.filter(b => {
    const matchStatus = filter === 'all' || b.status === filter;
    const matchQuery = !query || b.title.includes(query) || b.author.includes(query);
    return matchStatus && matchQuery;
  });

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>서재</h1>
        <button className={styles.addBtn}>
          <Plus size={18} />
          <span>책 추가</span>
        </button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            className={styles.search}
            type="text"
            placeholder="제목이나 저자로 검색"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`${styles.filter} ${filter === f.key ? styles.filterActive : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              <span className={styles.filterCount}>
                {f.key === 'all' ? books.length : books.filter(b => b.status === f.key).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>해당하는 책이 없습니다.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {filtered.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
