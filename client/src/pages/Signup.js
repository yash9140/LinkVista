import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/authService'; // Make sure this exists
import styles from './Auth.module.css';

export default function Signup({ onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await signup({ email, password });
    if (res && res.token) {
      localStorage.setItem('token', res.token);
      if (onSignup) onSignup();
      navigate('/');
    } else {
      setError(res?.error || 'Signup failed');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div style={{ width: '100%', marginBottom: 16, textAlign: 'left' }}>
        <Link to="/" className={styles.authLink}>← Home</Link>
      </div>
      <div className={styles.authTitle}>Sign Up</div>
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
        <button className={styles.authBtn} type="submit">Sign Up</button>
      </form>
      <div>
        Already have an account?{' '}
        <Link className={styles.authLink} to="/login">Login here</Link>
      </div>
    </div>
  );
}
