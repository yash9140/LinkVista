import React, { useState } from 'react';
import { createBookmark } from '../services/bookmarkService';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css'; // Reuse the auth styles for consistency

export default function AddBookmark({ onAdd }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('Saving...');
    const data = { url, title, summary };
    const res = await createBookmark(data);
    if (res && res._id) {
      setMsg('Saved!');
      if (onAdd) onAdd();
      navigate('/');
    } else {
      setMsg(res?.error || 'Failed to save');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authTitle}>Add Bookmark</div>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <input
          className={styles.authInput}
          type="url"
          placeholder="Bookmark URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
        />
        <input
          className={styles.authInput}
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className={styles.authInput}
          placeholder="Summary (optional)"
          value={summary}
          onChange={e => setSummary(e.target.value)}
          rows={3}
        />
        {error && <div style={{ color: '#ff4444', marginBottom: 10 }}>{error}</div>}
        <button className={styles.authBtn} type="submit">Add</button>
      </form>
      {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
    </div>
  );
}
