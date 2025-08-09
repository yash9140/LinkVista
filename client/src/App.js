import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Bookmarks from './pages/Bookmarks';
import AddBookmark from './pages/AddBookmark';
import { getMe } from './services/authService';
import styles from './App.module.css'; // <-- Import CSS module

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) { setUser(null); return; }
    const resp = await getMe(token);
    if (resp && resp.user) setUser(resp.user);
    else {
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  useEffect(()=>{ loadUser(); }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: 20 }}>
      <header className={styles.navbar}>
        <h2>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Link Saver
          </Link>
        </h2>
        <nav className={styles.navLinks}>
          {user ? (
            <>
              <span style={{ marginRight: 12 }}>{user.email}</span>
              <Link to="/add" style={{ marginRight: 12 }}>Add</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </header>

      <main style={{ marginTop: 20 }}>
        <Routes>
          <Route path="/" element={<Bookmarks user={user} />} />
          <Route path="/login" element={<Login onLogin={loadUser} />} />
          <Route path="/signup" element={<Signup onSignup={loadUser} />} />
          <Route path="/add" element={<AddBookmark onAdd={() => navigate('/')} />} />
        </Routes>
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Link Saver. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
