import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Add this import
import { listBookmarks, deleteBookmark } from '../services/bookmarkService';
import styles from './bookmark.css';

export default function Bookmarks({ user }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // <-- Add this

  const load = async () => {
    setLoading(true);
    const res = await listBookmarks();
    setBookmarks(Array.isArray(res) ? res : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm('Delete this bookmark?')) return;
    await deleteBookmark(id);
    load();
  };

  // Handler for Add Bookmark button
  const handleAddBookmark = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/add');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Bookmarks</h2>

      {loading && <div>Loading...</div>}

      {!loading && bookmarks.length === 0 && (
        <div className={styles.empty}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔖</div>
          <div>No bookmarks yet. Add one to get started.</div>
          <div style={{ marginTop: 16 }}>
            <button
              onClick={handleAddBookmark}
              className={styles.addBtn}
              style={{
                display: 'inline-block',
                padding: '10px 24px',
                background: '#ff8888',
                color: '#fff',
                borderRadius: 6,
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: 16,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              + Add Bookmark
            </button>
          </div>
        </div>
      )}

      <div className={styles.list}>
        {bookmarks.map((b) => (
          <div key={b._id} className={styles.card}>
            <div className={styles.cardHeader}>
              <img
                src={b.favicon || '/favicon-fallback.png'}
                alt=""
                className={styles.favicon}
              />
              <a
                href={b.url}
                target="_blank"
                rel="noreferrer"
                className={styles.title}
              >
                {b.title || b.url}
              </a>
            </div>
            <div className={styles.summaryCard}>
              {b.summary
                ? b.summary.slice(0, 250) + (b.summary.length > 250 ? '...' : '')
                : 'No summary'}
            </div>
            <button
              onClick={() => onDelete(b._id)}
              className={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
