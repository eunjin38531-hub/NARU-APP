import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, ChevronLeft, Tag } from 'lucide-react';
import { writings } from '../data/books';
import styles from './Write.module.css';

function WritingList({ writings, onSelect }) {
  return (
    <div className={styles.list}>
      <div className={styles.listHeader}>
        <h1>기록</h1>
        <button className={styles.newBtn} onClick={() => onSelect(null)}>
          <Plus size={18} />
          <span>새 글</span>
        </button>
      </div>
      <div className={styles.items}>
        {writings.map(w => (
          <button key={w.id} className={styles.item} onClick={() => onSelect(w)}>
            <div className={styles.itemMeta}>
              <span className={styles.itemBook}>{w.bookTitle}</span>
              <span className={styles.itemDate}>{w.updatedAt}</span>
            </div>
            <h3 className={styles.itemTitle}>{w.title}</h3>
            <p className={styles.itemPreview}>{w.content.slice(0, 80)}...</p>
            <div className={styles.itemTags}>
              {w.tags.map(tag => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function WritingEditor({ writing, onBack }) {
  const [title, setTitle] = useState(writing?.title || '');
  const [content, setContent] = useState(writing?.content || '');
  const isNew = !writing;

  return (
    <div className={styles.editor}>
      <div className={styles.editorToolbar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={18} />
          목록
        </button>
        <div className={styles.editorActions}>
          {!isNew && (
            <span className={styles.savedAt}>저장됨 · {writing.updatedAt}</span>
          )}
          <button className={styles.saveBtn}>저장</button>
        </div>
      </div>
      <div className={styles.editorBody}>
        <input
          className={styles.titleInput}
          placeholder="제목을 입력하세요"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {!isNew && writing.bookTitle && (
          <div className={styles.linkedBook}>
            <Tag size={14} />
            <span>{writing.bookTitle}</span>
          </div>
        )}
        <textarea
          className={styles.contentInput}
          placeholder="오늘의 생각을 자유롭게 기록해보세요..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default function Write() {
  const [selected, setSelected] = useState(undefined);

  if (selected !== undefined) {
    return <WritingEditor writing={selected} onBack={() => setSelected(undefined)} />;
  }

  return <WritingList writings={writings} onSelect={setSelected} />;
}
