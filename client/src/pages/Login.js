import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService'; // Make sure this exists
import styles from './Auth.module.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login({ email, password });
    if (res && res.token) {
      localStorage.setItem('token', res.token);
      if (onLogin) onLogin();
      navigate('/');
    } else {
      setError(res?.error || 'Invalid credentials');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div style={{ width: '100%', marginBottom: 16, textAlign: 'left' }}>
        <Link to="/" className={styles.authLink}>← Home</Link>
      </div>
      <div className={styles.authTitle}>Login</div>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <input
          className={styles.authInput}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.authInput}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div style={{ color: '#ff4444', marginBottom: 10 }}>{error}</div>}
        <button className={styles.authBtn} type="submit">Login</button>
      </form>
      <div>
        Don't have an account?{' '}
        <Link className={styles.authLink} to="/signup">Sign up here</Link>
      </div>
    </div>
  );
}
